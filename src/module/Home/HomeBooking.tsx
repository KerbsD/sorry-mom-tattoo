// HomeBooking.tsx
"use client";

import Image from "next/image";
import { anton } from "@/utils/fonts";
import BookingForm from "@/components/Booking/BookingForm";

function HomeBooking() {
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
        sizes="100vw"
        quality={50}
        className="object-cover grayscale"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-xl">
        <h2
          className={`mb-6 text-center text-4xl font-bold text-white underline-offset-4 md:text-5xl ${anton.className}`}
        >
          BOOK A SESSION
        </h2>
        <BookingForm />
      </div>
    </section>
  );
}

export default HomeBooking;
