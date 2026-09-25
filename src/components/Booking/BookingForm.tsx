// components/Form/Booking/BookingForm.tsx
"use client";

import { FormikProvider } from "formik";
import type { BookingFormProps } from "@/types/booking";

import {
  CHANNEL_STYLES,
  DEFAULT_CHANNEL_STYLE,
  CHANNELS,
} from "@/constants/channel";

import useHomeBooking from "@/components/Booking/useHomeBooking";
import FormInput from "@/components/Form/FormInput";
import BookingCalendar from "@/components/Booking/BookingCalendar";
import BookingFormButton from "@/components/Booking/BookingFormButton";
import ConfirmRedirectModal from "@/components/Modal/ConfirmModal/ConfirmRedirectModal";
import Modal from "@/components/Modal/CommonModal/Modal";

function BookingForm({ className = "" }: BookingFormProps) {
  const {
    formik,
    formattedDate,
    channels,
    requestSend,
    cancelSend,
    confirmSend,
    pendingChannel,
    pendingCopies,
    isConfirmed,
    closeConfirmation,
  } = useHomeBooking();

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className={`max-h-full overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#161616] p-6 ${className}`}
      >
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <FormInput
            name="fullName"
            placeholder="Full Name"
            className="flex-1"
          />
        </div>

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          className="mb-4"
        />

        <p className="mb-4 text-sm text-white/70">Pick a Date:</p>
        <BookingCalendar />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white/90">
            Date: {formattedDate}
          </p>
          <BookingFormButton />
        </div>
      </form>

      <Modal
        isOpen={isConfirmed}
        onClose={closeConfirmation}
        title="Send your booking request"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161616] p-6 text-white shadow-2xl"
      >
        <h3 className="mb-1 text-base font-semibold text-white">
          Booking confirmed
        </h3>
        <p className="mb-4 text-sm text-white/60">Date: {formattedDate}</p>

        {channels.length === 0 ? (
          <p className="text-sm text-amber-400">
            No chat app is set up yet. Add one in your environment settings.
          </p>
        ) : (
          <>
            <p className="mb-3 text-sm text-white/70">
              Send your booking request via:
            </p>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => requestSend(c)}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                    CHANNEL_STYLES[c] ?? DEFAULT_CHANNEL_STYLE
                  }`}
                >
                  {CHANNELS[c].label}
                </button>
              ))}
            </div>
          </>
        )}
      </Modal>

      {pendingChannel && (
        <ConfirmRedirectModal
          channel={pendingChannel}
          willCopy={pendingCopies}
          onConfirm={confirmSend}
          onCancel={cancelSend}
        />
      )}
    </FormikProvider>
  );
}

export default BookingForm;
