import type { Channel } from "@/utils/Channels";

const CHANNEL_STYLES: Partial<Record<Channel, string>> = {
  whatsapp: "bg-[#25D366] text-black hover:bg-[#1ebe5b]",
  messenger: "bg-[#0084ff] text-white hover:bg-[#0073e6]",
  telegram: "bg-[#27a7e7] text-white hover:bg-[#1d96d3]",
};

const DEFAULT_CHANNEL_STYLE = "bg-teal-300 text-black hover:bg-teal-200";

export { CHANNEL_STYLES, DEFAULT_CHANNEL_STYLE };
