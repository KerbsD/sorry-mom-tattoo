export type Channel = "whatsapp" | "telegram" | "messenger";

// NEXT_PUBLIC_* variables must be read with this exact static syntax,
// otherwise Next.js won't inline them into the client bundle.
export const CHANNELS: Record<Channel, { label: string; target?: string }> = {
  whatsapp: {
    label: "WhatsApp",
    target: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
  telegram: {
    label: "Telegram",
    target: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME,
  },
  messenger: {
    label: "Messenger",
    target: process.env.NEXT_PUBLIC_MESSENGER_PAGE,
  },
};

/** Only channels that have a number / username / page set in .env.local */
export function availableChannels(): Channel[] {
    return (Object.keys(CHANNELS) as Channel[]).filter((c) =>
      Boolean(CHANNELS[c].target),
    );
  }