import { sendToChat } from "@/utils/chat";
import type { Channel } from "@/utils/channels";
import { formatDates, toDateKey, toScheduledAt } from "@/utils/dates";
import type {
  BookingPayload,
  BookingValues,
  CreatedBooking,
  SubmittedBooking,
} from "@/types/booking";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

interface BookingApiBody {
  success?: boolean;
  message?: string;
  data?: CreatedBooking | { takenDates?: string[] };
  errors?: { field?: string; message?: string }[];
  takenDates?: string[];
}

class BookingApiError extends Error {
  readonly status: number;
  readonly takenDateKeys: string[];
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    takenDateKeys: string[] = [],
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "BookingApiError";
    this.status = status;
    this.takenDateKeys = takenDateKeys;
    this.fieldErrors = fieldErrors;
  }
}

function buildBookingMessage(values: SubmittedBooking): string {
  const dateText = formatDates(values.date) ?? "No date selected";
  const label = values.date.length > 1 ? "Dates" : "Date";

  const lines = [
    `Hello, SMT! I just booked a session (Booking #${values.bookingId}):`,
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
  ];

  if (values.phone) lines.push(`Phone: ${values.phone}`);
  lines.push(`${label}: ${dateText}`);
  if (values.message) lines.push(`Message: ${values.message}`);

  return lines.join("\n");
}

function sendBooking(channel: Channel, values: SubmittedBooking) {
  return sendToChat(channel, buildBookingMessage(values));
}

const getInitialValues = (): BookingValues => ({
  name: "",
  email: "",
  phone: "",
  message: "",
  date: [],
});

function toBookingPayload(values: BookingValues): BookingPayload {
  const dates = [...(values.date ?? [])];

  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    message: values.message.trim(),
    scheduledAt: dates.map(toScheduledAt),
  };
}

async function readJson(response: Response): Promise<BookingApiBody | null> {
  try {
    return (await response.json()) as BookingApiBody;
  } catch {
    return null;
  }
}

function fieldErrorsFrom(
  errors: BookingApiBody["errors"],
): Record<string, string> {
  const mapped: Record<string, string> = {};

  for (const error of errors ?? []) {
    if (!error.field || !error.message) continue;
    // The API calls the date field "scheduledAt"; the form calls it "date".
    const field = error.field.startsWith("scheduledAt") ? "date" : error.field;
    if (!mapped[field]) mapped[field] = error.message;
  }

  return mapped;
}

async function createBooking(values: BookingValues): Promise<CreatedBooking> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toBookingPayload(values)),
    });
  } catch {
    throw new BookingApiError(
      "Could not reach the booking service. Please try again.",
      0,
    );
  }

  const body = await readJson(response);

  if (!response.ok || body?.success !== true) {
    const takenDateKeys = (body?.takenDates ?? [])
      .map((value) => toDateKey(new Date(value)))
      .filter(Boolean);

    throw new BookingApiError(
      body?.message ?? "Could not send your booking. Please try again.",
      response.status,
      takenDateKeys,
      fieldErrorsFrom(body?.errors),
    );
  }

  const created = body.data;

  if (
    !created ||
    typeof created !== "object" ||
    !("id" in created) ||
    typeof created.id !== "number"
  ) {
    throw new BookingApiError(
      "The booking service returned an unexpected response.",
      response.status,
    );
  }

  return created;
}

async function getTakenBookingDates(signal?: AbortSignal): Promise<string[]> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/bookings/availability`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal,
    });
  } catch {
    throw new Error("Could not load availability.");
  }

  const body = await readJson(response);

  if (!response.ok || body?.success !== true) {
    throw new Error(body?.message ?? "Could not load availability.");
  }

  const data = body.data;
  const takenDates = data && "takenDates" in data ? data.takenDates : undefined;

  return Array.isArray(takenDates)
    ? takenDates.filter((value): value is string => typeof value === "string")
    : [];
}

export {
  BookingApiError,
  buildBookingMessage,
  createBooking,
  getInitialValues,
  getTakenBookingDates,
  sendBooking,
};
