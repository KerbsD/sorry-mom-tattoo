import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CHANNELS, availableChannels, type Channel } from "@/utils/Channels";
import { checkout } from "@/lib/checkout";
import { willCopyToClipboard } from "@/utils/chatSend";

function useCartDrawer() {
  const { lines, total, isOpen, closeCart, setQty, remove, clear } = useCart();

  const [note, setNote] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingChannel, setPendingChannel] = useState<Channel | null>(null);

  const channels = availableChannels();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  function requestCheckout(channel: Channel) {
    setPendingChannel(channel);
  }

  function cancelCheckout() {
    setPendingChannel(null);
  }

  function confirmCheckout() {
    if (!pendingChannel) return;
    const { copied } = checkout(pendingChannel, lines, note);
    setNotice(
      copied
        ? `Your order was copied. Paste it into the ${CHANNELS[pendingChannel].label} chat if the message box is empty.`
        : `Opening ${CHANNELS[pendingChannel].label} with your order.`,
    );
    setPendingChannel(null);
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
    requestCheckout,
    // confirm modal state
    pendingChannel,
    pendingCopies: pendingChannel ? willCopyToClipboard(pendingChannel) : false,
    cancelCheckout,
    confirmCheckout,
  };
}

export default useCartDrawer;
