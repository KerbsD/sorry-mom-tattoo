// components/Form/Booking/BookingForm.tsx
"use client";

import { FormikProvider } from "formik";
import useHomeBooking from "@/components/hooks/useHomeBooking";
import FormInput from "@/components/Form/Booking/FormInput";
import BookingCalendar from "@/components/Form/Booking/BookingCalendar";
import BookingFormButton from "@/components/Form/Booking/BookingFormButton";

interface BookingFormProps {
  className?: string;
}

function BookingForm({ className = "" }: BookingFormProps) {
  const { formik, formattedDate } = useHomeBooking();

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className={`rounded-2xl border border-white/10 bg-[#161616] p-6 ${className}`}
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
    </FormikProvider>
  );
}

export default BookingForm;
