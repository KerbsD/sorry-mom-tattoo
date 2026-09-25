import type { Product } from "@/types/merch";
import type { Design } from "@/types/design";

import { CartItemInput, CartLine } from "@/types/cart";

const toCartItem = {
  merch: (p: Product): CartItemInput => ({
    kind: "merch",
    id: String(p.id),
    name: p.name,
    price: p.price,
  }),
  design: (d: Design): CartItemInput => ({
    kind: "design",
    id: String(d.id),
    name: d.title, // <- whichever field holds the design's name
    price: d.price,
  }),
};


function makeKey(item: Pick<CartLine, "kind" | "id">) {
  return `${item.kind}:${item.id}`;
}

export { toCartItem, makeKey };
