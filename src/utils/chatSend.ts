import { CHANNELS, type Channel } from "@/utils/Channels";

export function buildChatLink(channel: Channel, message: string): string {
  const target = CHANNELS[channel].target ?? "";
  const text = encodeURIComponent(message);

  switch (channel) {
    case "whatsapp":
      return `https://wa.me/${target.replace(/\D/g, "")}?text=${text}`;
    case "telegram":
      return `https://t.me/${target.replace(/^@/, "")}?text=${text}`;
    case "messenger":
      return `https://m.me/${target}`;
  }
}

export function willCopyToClipboard(channel: Channel): boolean {
  return channel === "messenger" || channel === "telegram";
}

export function sendToChat(channel: Channel, message: string) {
  const copied = willCopyToClipboard(channel);
  if (copied) void navigator.clipboard?.writeText(message).catch(() => {});

  window.open(buildChatLink(channel, message), "_blank", "noopener,noreferrer");
  return { copied };
}
