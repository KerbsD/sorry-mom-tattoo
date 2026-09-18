// hooks/useHomeBooking.ts
import { useFormik } from "formik";
import { bookingSchema } from "@/schemas/bookingSchema";

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
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      // fake submit — replace with your real API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booked:", values);

      resetForm();
      setSubmitting(false);
    },
  });

  const formattedDate = formik.values.date ? (
    formik.values.date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  ) : (
    <span className="text-red-400 transition">No selected date</span>
  );

  return { formik, formattedDate };
}

export default useHomeBooking;
