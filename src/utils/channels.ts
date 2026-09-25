import { CHANNELS } from "@/constants/channel";

type Channel = "whatsapp" | "telegram" | "messenger";

/** Only channels that have a number / username / page set in .env.local */
function availableChannels(): Channel[] {
  return (Object.keys(CHANNELS) as Channel[]).filter((c) =>
    Boolean(CHANNELS[c].target),
  );
}

const channels = availableChannels();

export { channels };
export type { Channel };
