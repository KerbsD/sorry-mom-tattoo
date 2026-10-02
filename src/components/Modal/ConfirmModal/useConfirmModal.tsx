import { useState } from "react";
import { type Channel } from "@/utils/channels";
import { willCopyToClipboard } from "@/utils/chat";
import type { SendResult } from "@/types/modal";

const OPENING_FEEDBACK_MS = 800;

function useConfirmModal<T extends SendResult>(send: (channel: Channel) => T) {
  const [pendingChannel, setPendingChannel] = useState<Channel | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  function request(channel: Channel) {
    setPendingChannel(channel);
  }

  function cancel() {
    if (isConfirming) return;
    setPendingChannel(null);
  }

  function confirm(): T | undefined {
    if (!pendingChannel || isConfirming) return undefined;

    const result = send(pendingChannel); // runs inside the click, so the gesture is intact

    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setPendingChannel(null);
    }, OPENING_FEEDBACK_MS);

    return result;
  }

  return {
    pendingChannel,
    pendingCopies: pendingChannel ? willCopyToClipboard(pendingChannel) : false,
    isConfirming,
    request,
    cancel,
    confirm,
  };
}

export default useConfirmModal;
