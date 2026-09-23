// components/hooks/useHomeBooking.ts
import { useFormik } from "formik";
import { bookingSchema } from "@/schemas/bookingSchema";
import { sendBooking, availableChannels, CHANNELS } from "@/lib/booking";
import useConfirmModal from "@/components/Modal/ConfirmModal/useConfirmModal";
interface BookingValues {
  fullName: string;
  email: string;
  date: Date | undefined;
}

const initialValues: BookingValues = {
  fullName: "",
  email: "",
  date: new Date(),
};

function useHomeBooking() {
  const formik = useFormik<BookingValues>({
    initialValues,
    validationSchema: bookingSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      // fake submit — replace with your real API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booked:", values);

      setStatus("confirmed"); // reveals the channel buttons
      setSubmitting(false);
      // no resetForm here — confirmSend resets once the message is actually sent
    },
  });

  const {
    pendingChannel,
    pendingCopies,
    request: requestSend,
    cancel: cancelSend,
    confirm,
  } = useConfirmModal((channel) => sendBooking(channel, formik.values));

  function confirmSend() {
    const result = confirm();
    if (result) formik.resetForm();
  }

  // Dismisses the "booking confirmed, pick a channel" modal without
  // discarding what the user typed — just drops back to the editable form.
  function closeConfirmation() {
    formik.setStatus(undefined);
  }

  const channels = availableChannels();

  const formattedDate = formik.values.date
    ? formik.values.date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

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
