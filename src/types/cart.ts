import { CartLine } from "@/context/CartContext";
import type { Channel } from "@/utils/Channels";

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
  requestCheckout: (c: Channel) => void; // was handleCheckout
  clear: () => void;
  closeCart: () => void;
}

export type { AnimateCartProps, CartDrawerContentProps };
