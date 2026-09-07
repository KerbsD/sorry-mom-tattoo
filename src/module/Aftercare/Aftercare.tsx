"use client";

import { Check, X } from "lucide-react";
import { anton, jetbrainsmono } from "@/utils/Fonts";
import {
  steps,
  dos,
  donts,
} from "@/constants/Aftercare/Aftercare";

function Aftercare() {
  return (
    <main className="min-h-screen bg-[#161616] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 pt-40 pb-16 text-center">
        <p
          className={`${jetbrainsmono.className} text-xs tracking-[0.3em] text-teal-400/70`}
        >
          AFTERCARE GUIDE
        </p>
        <h1
          className={`${anton.className} mt-3 text-6xl leading-none sm:text-8xl`}
        >
          Healing is part
          <br />
          of the art
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          A fresh tattoo is an open wound before it's art.
          Follow these steps closely for the first two to
          three weeks — your skin, and the piece, will thank
          you.
        </p>
      </section>

      {/* Steps */}
      <section className="px-6 py-15">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2
              className={`${anton.className} section-header text-3xl`}
            >
              The Process
            </h2>
            <span
              className={`${jetbrainsmono.className} text-xs text-white/40`}
            >
              6 STEPS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(
              ({ num, icon: Icon, title, text }) => (
                <div
                  key={num}
                  className="group relative flex flex-col gap-4 bg-[#0a0a0a] p-8 transition-colors duration-300 hover:bg-[#121212]"
                >
                  <span
                    className={`${anton.className} absolute top-4 right-6 text-6xl text-white/4 transition-colors duration-300 group-hover:text-teal-400/10`}
                  >
                    {num}
                  </span>
                  <Icon
                    className="relative z-10 text-teal-400"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <div className="relative z-10">
                    <h3
                      className={`${anton.className} text-2xl`}
                    >
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {text}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Do's & Don'ts */}
      <section className="border-t border-white/10 px-6 pt-15 pb-20 lg:pb-50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2
              className={`${anton.className} section-header text-3xl`}
            >
              Rules of Healing
            </h2>
            <span
              className={`${jetbrainsmono.className} text-xs text-white/40`}
            >
              READ CAREFULLY
            </span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-white/10 border border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            {/* Do's */}
            <div className="p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`${jetbrainsmono.className} rounded-full border border-teal-400/40 px-2.5 py-1 text-[11px] text-teal-400`}
                >
                  DO
                </span>
                <div className="h-px flex-1 bg-teal-400/20" />
              </div>
              <ul className="space-y-4">
                {dos.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-400"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`${jetbrainsmono.className} rounded-full border border-red-400/40 px-2.5 py-1 text-[11px] text-red-400`}
                >
                  DON'T
                </span>
                <div className="h-px flex-1 bg-red-400/20" />
              </div>
              <ul className="space-y-4">
                {donts.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <X
                      size={16}
                      className="mt-0.5 shrink-0 text-red-400"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Aftercare;
