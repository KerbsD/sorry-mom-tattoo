"use client";

import Image from "next/image";
import { anton } from "@/utils/Fonts";
import Calendar from "@/components/Calendar/Calendar";
import useHomeBooking from "./hooks/useHomeBooking";

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

        <form
          onSubmit={formik.handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#161616] p-6"
        >
          {/* Name inputs */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-white/40 focus:border-teal-400 focus:outline-none"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-white/40 focus:border-teal-400 focus:outline-none"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-white/40 focus:border-teal-400 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.email}</p>
            )}
          </div>

          {/* Date picker */}
          <p className="mb-4 text-sm text-white/70">Pick a Date:</p>

          <Calendar
            date={formik.values.date}
            setDate={(d: Date | undefined) => formik.setFieldValue("date", d)}
          />

          {formik.touched.date && formik.errors.date && (
            <p className="mt-1 text-xs text-red-400">
              {String(formik.errors.date)}
            </p>
          )}

          {/* Selected date + submit */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-semibold text-white/90">
              Date: {formattedDate}
            </p>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-md border-2 border-teal-400 px-4 py-2 text-sm font-semibold text-nowrap text-teal-300 transition hover:bg-teal-400 hover:text-black disabled:opacity-50"
            >
              {formik.isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default HomeBooking;
