// HomeBooking.tsx
"use client";

import Image from "next/image";
import { FormikProvider } from "formik";
import { anton } from "@/utils/Fonts";
import useHomeBooking from "./hooks/useHomeBooking";
import FormInput from "@/components/Form/Booking/FormInput";
import BookingCalendar from "@/components/Form/Booking/BookingCalendar";
import BookingFormButton from "@/components/Form/Booking/BookingFormButton";

function HomeBooking() {
  const { formik, formattedDate } = useHomeBooking();

  return (
    <section
      id="home-booking"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 [clip-path:url(#booking-wave)]"
    >
      {/* Wave clip-path definition — renders nothing visually, just registers the shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="booking-wave" clipPathUnits="objectBoundingBox">
            <path
              d="M0,0.04
                 C0.125,0 0.125,0.08 0.25,0.04
                 C0.375,0 0.375,0.08 0.5,0.04
                 C0.625,0 0.625,0.08 0.75,0.04
                 C0.875,0 0.875,0.08 1,0.04
                 L1,1 L0,1 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <Image
        src="/booking-bg.JPG"
        alt="Tattoo studio table with ink and equipment"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover grayscale"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-xl">
        <h2
          className={`mb-6 text-center text-4xl font-bold text-white underline-offset-4 md:text-5xl ${anton.className}`}
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
