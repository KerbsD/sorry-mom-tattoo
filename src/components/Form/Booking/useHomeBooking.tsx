// components/hooks/useHomeBooking.ts
import { useState } from "react";
import { useFormik } from "formik";
import { bookingSchema } from "@/schemas/bookingSchema";
import {
  sendBooking,
  availableChannels,
  CHANNELS,
  type Channel,
} from "@/lib/booking";
import { willCopyToClipboard } from "@/utils/chatSend";

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
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingChannel, setPendingChannel] = useState<Channel | null>(null);

  const formik = useFormik<BookingValues>({
    initialValues,
    validationSchema: bookingSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      // fake submit — replace with your real API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booked:", values);

      setStatus("confirmed"); // reveals the channel buttons
      setSubmitting(false);
      setNotice("");
      // no resetForm here — handleSend resets once the message is actually sent
    },
  });

  const channels = availableChannels();

  function requestSend(channel: Channel) {
    setPendingChannel(channel);
  }

  function cancelSend() {
    setPendingChannel(null);
  }

  function confirmSend() {
    if (!pendingChannel) return;
    const { copied } = sendBooking(pendingChannel, formik.values);
    setNotice(
      copied
        ? `Copied. Paste it into ${CHANNELS[pendingChannel].label} if the message box is empty.`
        : `Opening ${CHANNELS[pendingChannel].label} with your booking details.`,
    );
    setPendingChannel(null);
    formik.resetForm();
  }

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
    pendingCopies: pendingChannel ? willCopyToClipboard(pendingChannel) : false,
    notice,
    isConfirmed: formik.status === "confirmed",
  };
}

export default useHomeBooking;
