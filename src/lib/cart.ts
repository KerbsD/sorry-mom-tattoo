import { PRODUCTS } from "@/constants/merch";
import { DESIGN } from "@/constants/design";
import { makeKey } from "@/constants/cart";
import type { CartLine, StoredCartLine } from "@/types/cart";

export const MIN_QTY = 1;
export const MAX_QTY = 99;

export const clampQty = (qty: number) =>
  Math.min(MAX_QTY, Math.max(MIN_QTY, Math.floor(qty)));

/** Look up current name/price. Returns null if the item no longer exists. */
export function resolveLine(item: StoredCartLine): CartLine | null {
  const key = makeKey(item);

  if (item.kind === "merch") {
    const p = PRODUCTS.find((x) => x.id === item.id);
    if (!p) return null;
    return {
      ...item,
      key,
      name: p.name,
      price: p.price,
      preorder: Boolean(p.preorder),
    };
  }

  const d = DESIGN.find((x) => x.id === item.id);
  if (!d) return null;
  return { ...item, key, name: d.title, price: null, preorder: false };
}

/** Turn untrusted JSON into a clean StoredCartLine[] */
export function sanitizeStored(raw: unknown): StoredCartLine[] {
  if (!Array.isArray(raw)) return [];

  const merged = new Map<string, StoredCartLine>();

  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const { kind, id, qty } = entry as Record<string, unknown>;

    if (kind !== "merch" && kind !== "design") continue;
    if (typeof id !== "string") continue;
    if (typeof qty !== "number" || !Number.isFinite(qty)) continue;

    const item: StoredCartLine = { kind, id, qty: clampQty(qty) };
    if (!resolveLine(item)) continue; // unknown/removed product

    const key = makeKey(item);
    const existing = merged.get(key);
    merged.set(
      key,
      existing ? { ...existing, qty: clampQty(existing.qty + item.qty) } : item,
    );
  }

  return [...merged.values()];
}
