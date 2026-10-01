import type { Product } from "@/types/merch";
import type { Design } from "@/types/design";
import type { CartItemInput, CartLine } from "@/types/cart";

const toCartItem = {
  merch: (p: Product): CartItemInput => ({ kind: "merch", id: p.id }),
  design: (d: Design): CartItemInput => ({ kind: "design", id: d.id }),
};

function makeKey(item: Pick<CartLine, "kind" | "id">) {
  return `${item.kind}:${item.id}`;
}

export { toCartItem, makeKey };
