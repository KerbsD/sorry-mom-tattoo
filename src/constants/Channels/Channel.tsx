import { type Channel } from "@/lib/booking";

export const CHANNEL_STYLES: Partial<Record<Channel, string>> = {
  whatsapp: "bg-[#25D366] text-black hover:bg-[#1ebe5b]",
  messenger: "bg-[#0084ff] text-white hover:bg-[#0073e6]",
  telegram: "bg-[#27a7e7] text-white hover:bg-[#1d96d3]",
};

export const DEFAULT_CHANNEL_STYLE = "bg-teal-300 text-black hover:bg-teal-200";
