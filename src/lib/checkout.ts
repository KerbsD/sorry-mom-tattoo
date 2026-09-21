import type { CartLine } from "@/context/CartContext";
import { formatPHP } from "@/constants/Merch/Products";

export type Channel = "whatsapp" | "telegram" | "messenger";

// NEXT_PUBLIC_* variables must be read with this exact static syntax,
// otherwise Next.js won't inline them into the client bundle.
export const CHANNELS: Record<Channel, { label: string; target?: string }> = {
  whatsapp: { label: "WhatsApp", target: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER },
  telegram: { label: "Telegram", target: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME },
  messenger: { label: "Messenger", target: process.env.NEXT_PUBLIC_MESSENGER_PAGE },
};

/** Only channels that have a number / username / page set in .env.local */
export function availableChannels(): Channel[] {
  return (Object.keys(CHANNELS) as Channel[]).filter((c) => Boolean(CHANNELS[c].target));
}

export function buildOrderMessage(lines: CartLine[], note?: string): string {
  const ref = Date.now().toString(36).toUpperCase();
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  const items = lines.map((l) => `• ${l.qty} x ${l.name} - ${formatPHP(l.price * l.qty)}`);

  return [
    `Hi! I'd like to place an order (Ref ${ref}):`,
    "",
    ...items,
    "",
    `Total: ${formatPHP(total)}`,
    note?.trim() ? `\nNote: ${note.trim()}` : "",
  ]
    .join("\n")
    .trim();
}

export function buildLink(channel: Channel, message: string): string {
  const target = CHANNELS[channel].target ?? "";
  const text = encodeURIComponent(message);

  switch (channel) {
    case "whatsapp":
      // International format, digits only, no "+"
      return `https://wa.me/${target.replace(/\D/g, "")}?text=${text}`;
    case "telegram":
      return `https://t.me/${target.replace(/^@/, "")}?text=${text}`;
    case "messenger":
      // Messenger ignores pre-filled text, so we copy the order instead
      return `https://m.me/${target}`;
  }
}

/**
 * Must be called directly from a click handler so browsers
 * don't block the new tab as a popup.
 */
export function checkout(channel: Channel, lines: CartLine[], note?: string) {
  const message = buildOrderMessage(lines, note);

  // Messenger never pre-fills; Telegram sometimes doesn't on desktop.
  // Copy to the clipboard as a safety net.
  const copied = channel === "messenger" || channel === "telegram";
  if (copied) void navigator.clipboard?.writeText(message).catch(() => {});

  window.open(buildLink(channel, message), "_blank", "noopener,noreferrer");
  return { copied };
}
