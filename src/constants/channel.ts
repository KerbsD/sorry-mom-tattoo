import type { Channel } from "@/utils/channels";

const CHANNEL_STYLES: Partial<Record<Channel, string>> = {
  whatsapp: "bg-[#25D366] text-black hover:bg-[#1ebe5b]",
  messenger: "bg-[#0084ff] text-white hover:bg-[#0073e6]",
  telegram: "bg-[#27a7e7] text-white hover:bg-[#1d96d3]",
};

const DEFAULT_CHANNEL_STYLE = "bg-teal-300 text-black hover:bg-teal-200";

// NEXT_PUBLIC_* variables must be read with this exact static syntax,
// otherwise Next.js won't inline them into the client bundle.
const CHANNELS: Record<Channel, { label: string; target?: string }> = {
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


export { CHANNEL_STYLES, DEFAULT_CHANNEL_STYLE, CHANNELS };
