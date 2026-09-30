import { useState } from "react";
import { type Channel } from "@/utils/channels";
import { willCopyToClipboard } from "@/utils/chat";
import type { SendResult } from "@/types/modal";

const CONFIRM_DELAY_MS = 1500;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  async function confirm(): Promise<T | undefined> {
    if (!pendingChannel || isConfirming) return undefined;

    setIsConfirming(true);
    try {
      await wait(CONFIRM_DELAY_MS);
      return send(pendingChannel);
    } finally {
      setIsConfirming(false);
      setPendingChannel(null);
    }
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
