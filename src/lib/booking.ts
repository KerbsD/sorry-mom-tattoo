// lib/booking.ts
import { sendToChat } from "@/utils/chatSend";
import { CHANNELS, availableChannels, type Channel } from "@/utils/Channels";
import { formatDateRange, getNextAvailableDate } from "@/utils/dates";
import type { BookingValues } from "@/types/booking";

export function buildBookingMessage(values: BookingValues): string {
  const ref = Date.now().toString(36).toUpperCase();
  const dateText = formatDateRange(values.date) ?? "No date selected";

  return [
    `Hi! I'd like to book an appointment (Ref ${ref}):`,
    "",
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Date: ${dateText.split(" - ")}`,
  ].join("\n");
}

export function sendBooking(channel: Channel, values: BookingValues) {
  return sendToChat(channel, buildBookingMessage(values));
}

const getInitialValues = (): BookingValues => ({
  fullName: "",
  email: "",
  date: { from: getNextAvailableDate(new Date()), to: undefined },
});

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const channels = availableChannels();

export { availableChannels, CHANNELS, getInitialValues, formatDate, channels };
