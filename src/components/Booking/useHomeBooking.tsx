import { useState } from "react";
import { useFormik } from "formik";

import { bookingSchema } from "@/schemas/bookingSchema";
import {
  BookingApiError,
  createBooking,
  getInitialValues,
  sendBooking,
} from "@/lib/booking";
import { formatDates, toDateKey } from "@/utils/dates";
import type { BookingValues, SubmittedBooking } from "@/types/booking";
import type { Channel } from "@/utils/channels";
import useConfirmModal from "@/components/Modal/ConfirmModal/useConfirmModal";
import useBookingAvailability from "@/components/Booking/useBookingAvailability";

const noSend = () => ({ copied: false, copyResult: Promise.resolve(false) });

function useHomeBooking() {
  const availability = useBookingAvailability();
  const [submitted, setSubmitted] = useState<SubmittedBooking | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik<BookingValues>({
    initialValues: getInitialValues(),
    validationSchema: bookingSchema,
    onSubmit: async (
      values,
      { setSubmitting, setStatus, resetForm, setErrors, setFieldValue },
    ) => {
      setSubmitError(null);

      try {
        const created = await createBooking(values);
        const dates = [...(values.date ?? [])].sort(
          (a, b) => a.getTime() - b.getTime(),
        );

        setSubmitted({
          bookingId: created.id,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          date: dates,
        });

        // Hold the new days immediately, then reconcile with the server.
        availability.addTakenDates(dates.map(toDateKey));
        resetForm();
        setStatus("confirmed");
        void availability.refresh();
      } catch (reason) {
        if (!(reason instanceof BookingApiError)) {
          setSubmitError("Something went wrong. Please try again.");
          return;
        }

        if (Object.keys(reason.fieldErrors).length > 0) {
          setErrors(reason.fieldErrors);
        }

        if (reason.status === 409 && reason.takenDateKeys.length > 0) {
          availability.addTakenDates(reason.takenDateKeys);

          const taken = new Set(reason.takenDateKeys);
          const remaining = (values.date ?? []).filter(
            (date) => !taken.has(toDateKey(date)),
          );
          setFieldValue("date", remaining);

          const message =
            remaining.length === 0
              ? "Those dates were just booked. Please pick another date."
              : "Some of those dates were just booked. We removed them — pick another date.";

          setSubmitError(message);
          if (remaining.length === 0) setErrors({ date: message });
        } else {
          setSubmitError(reason.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    pendingChannel,
    pendingCopies,
    isConfirming,
    request: requestSend,
    cancel: cancelSend,
    confirm,
  } = useConfirmModal((channel: Channel) =>
    submitted ? sendBooking(channel, submitted) : noSend(),
  );

  function confirmSend() {
    confirm();
  }

  function closeConfirmation() {
    formik.setStatus(undefined);
    setSubmitted(null);
  }

  return {
    formik,
    formattedDate: formatDates(formik.values.date),
    submittedDateText: formatDates(submitted?.date),
    submitted,
    submitError,
    takenDates: availability.takenDates,
    isAvailabilityLoading: availability.isLoading,
    availabilityError: availability.error,
    requestSend,
    cancelSend,
    confirmSend,
    pendingChannel,
    pendingCopies,
    isConfirmed: formik.status === "confirmed" && submitted !== null,
    closeConfirmation,
    isConfirming,
  };
}

export default useHomeBooking;
