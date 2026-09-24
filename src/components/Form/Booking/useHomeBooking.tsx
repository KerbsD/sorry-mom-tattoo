// components/hooks/useHomeBooking.ts
import { useFormik } from "formik";
import { bookingSchema } from "@/schemas/bookingSchema";
import { sendBooking,  getInitialValues, formatDate, channels } from "@/lib/booking";
import useConfirmModal from "@/components/Modal/ConfirmModal/useConfirmModal";
import type { BookingValues } from "@/types/booking";

function useHomeBooking() {
  const formik = useFormik<BookingValues>({
    initialValues: getInitialValues(),
    validationSchema: bookingSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Booked:", values);
      setStatus("confirmed");
      setSubmitting(false);
    },
  });

  const {
    pendingChannel,
    pendingCopies,
    request: requestSend,
    cancel: cancelSend,
    confirm,
  } = useConfirmModal((channel) => sendBooking(channel, formik.values));

  const { from, to } = formik.values.date ?? {};

  const formattedDate = from
    ? to && to.getTime() !== from.getTime()
      ? `${formatDate(from)} – ${formatDate(to)}`
      : formatDate(from)
    : null;

  function confirmSend() {
    const result = confirm();
    if (result) formik.resetForm();
  }

  // Dismisses the "booking confirmed, pick a channel" modal without
  // discarding what the user typed — just drops back to the editable form.
  function closeConfirmation() {
    formik.setStatus(undefined);
  }

  return {
    formik,
    formattedDate,
    channels,
    requestSend,
    cancelSend,
    confirmSend,
    pendingChannel,
    pendingCopies,
    isConfirmed: formik.status === "confirmed",
    closeConfirmation,
  };
}

export default useHomeBooking;
