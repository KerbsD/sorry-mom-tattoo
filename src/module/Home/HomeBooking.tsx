// HomeBooking.tsx
"use client";

import Image from "next/image";
import { FormikProvider } from "formik";
import { anton } from "@/utils/Fonts";
import useHomeBooking from "./hooks/useHomeBooking";
import FormInput from "@/components/Form/Booking/FormInput";
import BookingCalendar from "@/components/Form/Booking/BookingCalendar";
import BookingFormButton from "@/components/Form/Booking/BoookingFormButton";

function HomeBooking() {
  const { formik, formattedDate } = useHomeBooking();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Image
        src="/booking-bg.jpg"
        alt="Tattoo studio table with ink and equipment"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover grayscale"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-xl">
        <h2
          className={`mb-6 text-center text-4xl font-bold text-[#ededed] underline-offset-4 md:text-5xl ${anton.className}`}
        >
          BOOK A SESSION
        </h2>

        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="rounded-2xl border border-white/10 bg-[#161616] p-6"
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
      </div>
    </section>
  );
}

export default HomeBooking;
