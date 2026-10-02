"use client";

import { CHANNELS } from "@/constants/channel";
import type { ConfirmRedirectModalProps } from "@/types/modal";
import useConfirmModalDelayButton from "./useConfirmModalDelayButton";

function ConfirmRedirectModal(props: ConfirmRedirectModalProps) {
  const { channel, willCopy, isLoading = false, onConfirm, onCancel } = props;
  const { isConfirmDisabled, isWaiting, secondsLeft } =
    useConfirmModalDelayButton({ isLoading, channel });

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
            ? " That app doesn't pre-fill messages, so we'll try to copy your details. If the message box is empty, paste them in."
            : " The message box will already have your details filled in."}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className="flex min-w-27.5 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10"
          >
            {isLoading ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden="true"
                />
                Opening…
              </>
            ) : isWaiting ? (
              `Continue (${secondsLeft})`
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRedirectModal;
