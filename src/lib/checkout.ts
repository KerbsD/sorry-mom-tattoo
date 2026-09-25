import type { CartLine } from "@/context/CartContext";
import { formatPHP } from "@/utils/formatPhp";
import { sendToChat } from "@/utils/chat";
import { type Channel } from "@/utils/channels";

export function buildOrderMessage(lines: CartLine[], note?: string): string {
  const ref = Date.now().toString(36).toUpperCase();
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const items = lines.map(
    (l) => `• ${l.qty} x ${l.name} - ${formatPHP(l.price * l.qty)}`,
  );

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

export function checkout(channel: Channel, lines: CartLine[], note?: string) {
  return sendToChat(channel, buildOrderMessage(lines, note));
}
