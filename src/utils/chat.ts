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
    default:
      return "";
  }
}

function willCopyToClipboard(channel: Channel): boolean {
  return channel === "messenger" || channel === "telegram";
}

// Must be called synchronously from a click handler.
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length); // iOS
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const IN_APP_RE = /FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly/i;

function openChat(url: string) {
  if (!url) return;

  // In-app browsers often mishandle new tabs; same-tab navigation is reliable.
  if (IN_APP_RE.test(navigator.userAgent)) {
    window.location.assign(url);
    return;
  }

  const w = window.open(url, "_blank");
  if (w) {
    w.opener = null; // replaces "noopener" so a null return still means "blocked"
  } else {
    window.location.assign(url); // popup blocked: navigate instead
  }
}

function sendToChat(channel: Channel, message: string) {
  const copied = willCopyToClipboard(channel);

  // Start the copy first, without awaiting, so the gesture carries into openChat.
  const copyResult = copied ? copyText(message) : Promise.resolve(false);

  openChat(buildChatLink(channel, message));

  return { copied, copyResult };
}

export { buildChatLink, willCopyToClipboard, sendToChat, copyText };