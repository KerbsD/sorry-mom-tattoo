import type { CartLine } from "@/types/cart";
import { formatPHP } from "@/utils/formatPhp";
import { sendToChat } from "@/utils/chat";
import { type Channel } from "@/utils/channels";

export function buildOrderMessage(lines: CartLine[], note?: string): string {
  const ref = Date.now().toString(36).toUpperCase();

  const hasDesign = lines.some((l) => l.price === null);
  const hasPriced = lines.some((l) => l.price !== null);
  const subtotal = lines.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0);

  const safeNote = note?.trim().slice(0, 500);

  const items = lines.map((l) => {
    if (l.price === null)
      return `• ${l.qty} x ${l.name} (design) - price on request`;
    const tag = l.preorder ? " (pre-order)" : "";
    return `• ${l.qty} x ${l.name}${tag} - ${formatPHP(l.price * l.qty)}`;
  });

  const parts = [
    `Hello, SMT! I'd like to place an order (Ref ${ref}):`,
    "",
    ...items,
    "",
  ];

  if (hasPriced) {
    parts.push(
      `${hasDesign ? "Merch subtotal" : "Total"}: ${formatPHP(subtotal)}`,
    );
  }
  if (hasDesign) {
    parts.push("Design prices to be confirmed.");
  }
  if (safeNote?.trim()) {
    parts.push("", `Note: ${safeNote.trim()}`);
  }
  parts.push("", "Final prices are confirmed by the seller.");

  return parts.join("\n");
}

export function checkout(channel: Channel, lines: CartLine[], safeNote?: string) {
  return sendToChat(channel, buildOrderMessage(lines, safeNote));
}
