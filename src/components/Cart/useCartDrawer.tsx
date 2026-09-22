import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  CHANNELS,
  availableChannels,
  checkout,
  type Channel,
} from "@/lib/checkout";

function useCartDrawer() {
  const { lines, total, isOpen, closeCart, setQty, remove, clear } = useCart();
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const channels = availableChannels();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  function handleCheckout(channel: Channel) {
    const { copied } = checkout(channel, lines, note);
    setNotice(
      copied
        ? `Your order was copied. Paste it into the ${CHANNELS[channel].label} chat if the message box is empty.`
        : `Opening ${CHANNELS[channel].label} with your order.`,
    );
  }

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
    notice,
    channels,
    handleCheckout,
  };
}

export default useCartDrawer;
