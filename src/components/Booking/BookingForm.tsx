"use client";

import { FormikProvider } from "formik";
import type { BookingFormProps } from "@/types/booking";

import {
  CHANNEL_STYLES,
  DEFAULT_CHANNEL_STYLE,
  CHANNELS,
} from "@/constants/channel";

import { channels } from "@/utils/channels";

import useHomeBooking from "@/components/Booking/useHomeBooking";
import FormInput from "@/components/Form/FormInput";
import FormTextarea from "@/components/Form/FormTextarea";
import BookingCalendar from "@/components/Booking/BookingCalendar";
import BookingFormButton from "@/components/Booking/BookingFormButton";
import ConfirmRedirectModal from "@/components/Modal/ConfirmModal/ConfirmRedirectModal";
import Modal from "@/components/Modal/CommonModal/Modal";

function BookingForm({ className = "" }: BookingFormProps) {
  const {
    formik,
    formattedDate,
    submittedDateText,
    submitted,
    submitError,
    takenDates,
    isAvailabilityLoading,
    availabilityError,
    requestSend,
    cancelSend,
    confirmSend,
    pendingChannel,
    pendingCopies,
    isConfirmed,
    closeConfirmation,
    isConfirming,
  } = useHomeBooking();

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className={`rounded-2xl border border-white/10 bg-[#161616] p-6 ${className}`}
      >
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <FormInput
            name="name"
            placeholder="Full Name"
            aria-label="Full name"
            autoComplete="name"
            className="flex-1"
          />
          <FormInput
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="Phone (optional)"
            aria-label="Phone number (optional)"
            autoComplete="tel"
            className="flex-1"
          />
        </div>

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          className="mb-4"
        />

        <FormTextarea
          name="message"
          placeholder="Tell us about your tattoo idea (optional)"
          aria-label="Tattoo idea (optional)"
          rows={3}
          maxLength={2000}
          className="mb-4"
        />

        <p className="mb-2 text-sm text-white/70">Pick up to 3 dates:</p>
        <BookingCalendar
          takenDates={takenDates}
          isLoading={isAvailabilityLoading}
        />
        <p className="mt-2 text-xs text-white/50">
          We&apos;ll confirm the exact time with you by email.
        </p>

        {availabilityError && (
          <p className="mt-2 text-xs text-amber-400" role="status">
            {availabilityError} You can still request a date; we&apos;ll verify
            it for you.
          </p>
        )}

        {formik.touched.date && formik.errors.date && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {formik.errors.date}
          </p>
        )}

        {submitError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300"
          >
            {submitError}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-white/90">
            Date:{" "}
            {!formattedDate ? (
              <span className="font-light text-red-400">Select Date/s</span>
            ) : (
              formattedDate
            )}
          </p>
          <BookingFormButton />
        </div>
      </form>

      <Modal
        isOpen={isConfirmed}
        onClose={closeConfirmation}
        title="Booking received"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161616] p-6 text-white shadow-2xl"
      >
        <h3 className="mb-1 text-base font-semibold text-white">
          Booking received
        </h3>

        {submitted ? (
          <>
            <p className="text-xs font-medium text-teal-300">
              Booking #{submitted.bookingId}
            </p>
            <p className="mt-1 text-sm text-white/60">{submittedDateText}</p>
            <p className="mt-3 text-sm text-white/70">
              We&apos;ll review your request and email you at{" "}
              <span className="text-white">{submitted.email}</span>.
            </p>
          </>
        ) : (
          <p className="text-sm text-white/70">
            We&apos;ll review your request and get back to you soon.
          </p>
        )}

        {channels.length > 0 && (
          <>
            <p className="mt-5 mb-3 text-sm text-white/70">
              Want to reach us faster? Send a copy via:
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

        <button
          type="button"
          onClick={closeConfirmation}
          className="mt-5 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          Done
        </button>
      </Modal>

      {pendingChannel && (
        <ConfirmRedirectModal
          channel={pendingChannel}
          willCopy={pendingCopies}
          isLoading={isConfirming}
          onConfirm={confirmSend}
          onCancel={cancelSend}
        />
      )}
    </FormikProvider>
  );
}

export default BookingForm;
