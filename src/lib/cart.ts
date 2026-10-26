import { makeKey } from "@/constants/cart";
import type { Design } from "@/types/design";
import type { Product } from "@/types/merch";
import type { CartLine, StoredCartLine } from "@/types/cart";

export const MIN_QTY = 1;
export const MAX_QTY = 99;

export const clampQty = (qty: number) =>
  Math.min(MAX_QTY, Math.max(MIN_QTY, Math.floor(qty)));

export interface CartCatalog {
  products: Product[];
  designs: Design[];
}

/**
 * Look up the current name/price from the server-provided catalog.
 * Returns null when the item is no longer published or has been removed.
 */
export function resolveLine(
  item: StoredCartLine,
  catalog: CartCatalog,
): CartLine | null {
  const key = makeKey(item);

  if (item.kind === "merch") {
    const product = catalog.products.find((x) => x.id === item.id);
    if (!product) return null;
    return {
      ...item,
      key,
      name: product.name,
      price: product.price,
      preorder: Boolean(product.preorder),
    };
  }

  const design = catalog.designs.find((x) => x.id === item.id);
  if (!design) return null;
  return { ...item, key, name: design.title, price: null, preorder: false };
}

/**
 * Drop stored lines that no longer resolve against the catalog, so unpublishing
 * or deleting an item does not leave dead entries in localStorage.
 *
 * An empty list means that catalog request failed (see `safeLoad`), not that
 * every item was removed, so lines of that kind are kept to avoid wiping a
 * cart during an API outage.
 */
export function pruneUnavailable(
  items: StoredCartLine[],
  catalog: CartCatalog,
): StoredCartLine[] {
  const kept = items.filter((item) => {
    const source = item.kind === "merch" ? catalog.products : catalog.designs;
    return (
      source.length === 0 || source.some((entry) => entry.id === item.id)
    );
  });

  // Preserve identity when nothing changed so the persist effect stays quiet.
  return kept.length === items.length ? items : kept;
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
    const key = makeKey(item);
    const existing = merged.get(key);
    merged.set(
      key,
      existing ? { ...existing, qty: clampQty(existing.qty + item.qty) } : item,
    );
  }

  return [...merged.values()];
}
