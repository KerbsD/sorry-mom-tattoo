// HomeAbout.tsx
"use client";

import Image from "next/image";
import { emgaramond } from "@/utils/fonts";
import useAnimateHomeAbout from "./animations/useAnimateHomeAbout";

const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

function HomeAbout() {
  const { textRef, textPanelRef, sectionRef, cellsRef, imageWrapperRef } =
    useAnimateHomeAbout();

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[98vh] flex-col sm:flex-row"
    >
      {/* Text panel */}

      <div
        ref={textPanelRef}
        className="flex max-w-2xl items-start px-6 py-12 sm:px-8 sm:py-20"
      >
        <p
          ref={textRef}
          className="text-center text-2xl leading-snug font-light text-white sm:text-start sm:text-3xl"
        >
          <span
            className={`${emgaramond.className} text-3xl italic sm:text-4xl`}
          >
            Sorry Mom Tattoo
          </span>{" "}
          is an Antipolo based tattoo studio that is established in 2021.
        </p>
      </div>

      {/* Image panel */}
      <div
        ref={imageWrapperRef}
        className="relative w-full flex-1 overflow-hidden sm:h-auto"
      >
        <Image
          src="/about-bg.jpg"
          alt="Tattoo ink caps and equipment"
          fill
          className="object-cover grayscale"
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Cube reveal overlay */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cellsRef.current[i] = el;
              }}
              className="bg-[#161616]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;
