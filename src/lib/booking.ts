import { sendToChat } from "@/utils/chatSend";
import { CHANNELS, availableChannels, type Channel } from "@/utils/Channels";

interface BookingValues {
  fullName: string;
  email: string;
  date: Date | undefined;
}

export function buildBookingMessage(values: BookingValues): string {
  const ref = Date.now().toString(36).toUpperCase();
  const dateText = values.date
    ? values.date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "No date selected";

  return [
    `Hi! I'd like to book an appointment (Ref ${ref}):`,
    "",
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Date: ${dateText}`,
  ].join("\n");
}

export function sendBooking(channel: Channel, values: BookingValues) {
  return sendToChat(channel, buildBookingMessage(values));
}

export { availableChannels, CHANNELS };
export type { Channel };
