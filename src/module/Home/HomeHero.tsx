"use client";

import { anton, emgaramond } from "@/utils/fonts";
import BookButton from "@/components/Buttons/Home/BookButton";
import useAnimateHomeHero from "./animations/useAnimateHomeHero";

function HomeHero() {
  const { containerRef, headingRef, buttonRef } = useAnimateHomeHero();

  return (
    <section
      ref={containerRef}
      className="mx-auto mt-40 flex max-w-400 flex-col items-center gap-6 px-6 sm:mt-60 sm:flex-row sm:items-end sm:justify-between sm:gap-0"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter
            id="ink-bleed-heavy"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.09"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="ink-bleed-settled"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.09"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col items-center sm:items-start">
        <h1
          ref={headingRef}
          className={`hero-text ${anton.className} mb-4 text-center text-4xl text-white md:text-left md:text-6xl`}
        >
          SORRY MOM TATTOO
        </h1>
      </div>

      <div ref={buttonRef}>
        <BookButton />
      </div>
    </section>
  );
}

export default HomeHero;
