import { Channel } from "@/utils/channels";

type ItemKind = "merch" | "design";

/** What actually goes into localStorage */
type StoredCartLine = {
  kind: ItemKind;
  id: string;
  qty: number;
};

/** Stored line + data looked up from PRODUCTS / DESIGN */
type CartLine = StoredCartLine & {
  key: string; // `${kind}:${id}`
  name: string;
  price: number | null; // null = price on request
  preorder: boolean;
};

type CartItemInput = Pick<StoredCartLine, "kind" | "id">;

interface AnimateCartProps {
  isOpen: boolean;
}

interface CartDrawerContentProps {
  lines: CartLine[];
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  note: string;
  setNote: (value: string) => void;
  total: number;
  channels: Channel[];
  requestCheckout: (c: Channel) => void;
  clear: () => void;
  closeCart: () => void;
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number; // subtotal of priced items only
  isOpen: boolean;
  add: (item: CartItemInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export type {
  ItemKind,
  StoredCartLine,
  AnimateCartProps,
  CartDrawerContentProps,
  CartLine,
  CartItemInput,
  CartContextValue,
};
