// lib/booking.ts
import { sendToChat } from "@/utils/chat";
import { type Channel,  } from "@/utils/channels";
import { formatDates } from "@/utils/dates";
import type { BookingValues } from "@/types/booking";

function buildBookingMessage(values: BookingValues): string {
  const ref = Date.now().toString(36).toUpperCase();
  const dateText = formatDates(values.date) ?? "No date selected";
  const label = (values.date?.length ?? 0) > 1 ? "Dates" : "Date";

  return [
    `Hello, SMT! I'd like to book an appointment (Ref ${ref}):`,
    "",
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `${label}: ${dateText}`,
  ].join("\n");
}

function sendBooking(channel: Channel, values: BookingValues) {
  return sendToChat(channel, buildBookingMessage(values));
}

const getInitialValues = (): BookingValues => ({
  fullName: "",
  email: "",
  date: [],
});

export { getInitialValues, sendBooking };