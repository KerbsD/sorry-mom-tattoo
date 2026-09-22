"use client";

import useCartDrawer from "./useCartDrawer";
import CartDrawerContent from "./CartDrawerContent";
import useAnimateCart from "./useAnimateCart";

import { X } from "lucide-react";

export function CartDrawer() {
  const {
    lines,
    total,
    isOpen,
    closeCart,
    setQty,
    remove,
    clear,
    note,
    setNote,
    notice,
    channels,
    handleCheckout,
  } = useCartDrawer();

  const { visible, overlayRef, panelRef } = useAnimateCart({ isOpen });

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-end bg-black/60"
      onClick={closeCart}
    >
      <aside
        ref={panelRef}
        className="flex h-full w-full max-w-md flex-col gap-5 overflow-y-auto bg-[#1c1c1c] p-5 text-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold">Your cart</h2>
          <button
            className="rounded-full px-1.5 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
            onClick={closeCart}
          >
            <X />
          </button>
        </header>

        <CartDrawerContent
          closeCart={closeCart}
          lines={lines}
          setQty={setQty}
          remove={remove}
          note={note}
          setNote={setNote}
          total={total}
          channels={channels}
          handleCheckout={handleCheckout}
          notice={notice}
          clear={clear}
        />
      </aside>
    </div>
  );
}
