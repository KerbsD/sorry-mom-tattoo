"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      className="relative inline-flex"
      onClick={openCart}
      aria-label={`Open cart, ${count} items`}
    >
      <ShoppingBag
        size={28}
        className="transition-colors hover:text-teal-400 active:text-teal-300"
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-300 px-1 text-xs font-semibold text-black">
          {count}
        </span>
      )}
    </button>
  );
}
