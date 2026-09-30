import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { checkout } from "@/lib/checkout";
import { channels } from "@/utils/channels";
import { useCart } from "@/context/CartContext";

import useConfirmModal from "../Modal/ConfirmModal/useConfirmModal";

function useCartDrawer() {
  const { lines, total, isOpen, closeCart, setQty, remove, clear } = useCart();

  const lenis = useLenis();

  const [note, setNote] = useState("");

  const {
    pendingChannel,
    pendingCopies,
    isConfirming,
    request: requestCheckout,
    cancel: cancelCheckout,
    confirm: confirmCheckout,
  } = useConfirmModal((channel) => checkout(channel, lines, note));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (pendingChannel) return;
      closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart, pendingChannel]);

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  return {
    // cart state
    lines,
    total,
    isOpen,
    closeCart,
    setQty,
    remove,
    clear,
    // drawer state
    note,
    setNote,
    channels,
    requestCheckout,
    // confirm modal state
    pendingChannel,
    pendingCopies,
    cancelCheckout,
    confirmCheckout,
    isConfirming
  };
}

export default useCartDrawer;
