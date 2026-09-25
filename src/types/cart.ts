import { Channel } from "@/utils/channels";

type ItemKind = "merch" | "design";

type CartLine = {
  key: string; // `${kind}:${id}`, unique across both sources
  id: string;
  kind: ItemKind;
  name: string;
  price: number;
  qty: number;
};

interface AnimateCartProps {
  isOpen: boolean;
}

interface CartDrawerContentProps {
  lines: CartLine[];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
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
  total: number;
  isOpen: boolean;
  add: (item: CartItemInput) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

type CartItemInput = Omit<CartLine, "key" | "qty">;

export type {
  AnimateCartProps,
  CartDrawerContentProps,
  CartLine,
  CartItemInput,
  CartContextValue,
};
