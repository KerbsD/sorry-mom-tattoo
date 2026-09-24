"use client";

import { CHANNELS } from "@/utils/Channels";
import { ConfirmRedirectModalProps } from "@/types/modal";

function ConfirmRedirectModal({
  channel,
  willCopy,
  onConfirm,
  onCancel,
}: ConfirmRedirectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="redirect-modal-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161616] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="redirect-modal-title"
          className="text-base font-semibold text-white"
        >
          Leave this site for {CHANNELS[channel].label}?
        </h2>

        <p className="mt-2 text-sm text-white/70">
          Your booking details will be sent to {CHANNELS[channel].label}.
          {willCopy
            ? " That app doesn't pre-fill messages, so the details will be copied — paste them in if the message box is empty."
            : " The message box will already have your details filled in."}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRedirectModal;
