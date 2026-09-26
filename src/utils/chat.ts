import { Channel } from "./channels";
import { CHANNELS } from "@/constants/channel";

function buildChatLink(channel: Channel, message: string): string {
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

function willCopyToClipboard(channel: Channel): boolean {
  return channel === "messenger" || channel === "telegram";
}

function sendToChat(channel: Channel, message: string) {
  const copied = willCopyToClipboard(channel);
  const url = buildChatLink(channel, message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Do the gesture-gated navigation FIRST, synchronously, so it still
  // has user-activation. Clipboard write happens after, fire-and-forget.
  if (isMobile) {
    // location.href is far more reliable than window.open for app handoff on mobile
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (copied) {
    if (!navigator.clipboard) {
      console.warn("Clipboard API unavailable — insecure context?");
      // maybe surface a toast to the user here
    } else {
      void navigator.clipboard.writeText(message).catch((err) => {
        console.warn("Clipboard write failed:", err);
      });
    }
  }

  return { copied };
}

export { buildChatLink, willCopyToClipboard, sendToChat };
