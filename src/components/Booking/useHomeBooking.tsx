// components/hooks/useHomeBooking.ts
import { useFormik } from "formik";
import type { BookingValues } from "@/types/booking";
import { bookingSchema } from "@/schemas/bookingSchema";
import { sendBooking, getInitialValues } from "@/lib/booking";
import { formatDates } from "@/utils/dates";
import useConfirmModal from "@/components/Modal/ConfirmModal/useConfirmModal";

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

  const formattedDate = formatDates(formik.values.date);

  function confirmSend() {
    const result = confirm();
    if (result) formik.resetForm();
  }

  function closeConfirmation() {
    formik.setStatus(undefined);
  }

  return {
    formik,
    formattedDate,
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