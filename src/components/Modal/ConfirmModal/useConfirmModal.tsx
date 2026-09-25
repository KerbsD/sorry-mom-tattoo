// hooks/useChannelSend.ts
import { useState } from "react";
import { type Channel } from "@/utils/channels"; // adjust if your canonical Channel type lives elsewhere
import { willCopyToClipboard } from "@/utils/chat";
import type { SendResult } from "@/types/modal";

/**
 * Shared "pick a channel -> confirm -> send -> notice" flow used by both
 * the cart checkout and the home booking form. Each caller supplies its own
 * `send` function (the actual side effect) and message copy; this hook only
 * owns the pending/notice state machine that was previously duplicated.
 */
function useConfirmModal<T extends SendResult>(send: (channel: Channel) => T) {
  const [pendingChannel, setPendingChannel] = useState<Channel | null>(null);

  function request(channel: Channel) {
    setPendingChannel(channel);
  }

  function cancel() {
    setPendingChannel(null);
  }

  // Returns the send() result so the caller can run its own follow-up side
  // effect (e.g. formik.resetForm()) only when a send actually happened.
  function confirm(): T | undefined {
    if (!pendingChannel) return undefined;
    const result = send(pendingChannel);
    setPendingChannel(null);
    return result;
  }

  return {
    pendingChannel,
    pendingCopies: pendingChannel ? willCopyToClipboard(pendingChannel) : false,
    request,
    cancel,
    confirm,
  };
}

export default useConfirmModal;
