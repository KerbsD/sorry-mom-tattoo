// HomeAbout.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { emgaramond } from "@/utils/Fonts";

gsap.registerPlugin(ScrollTrigger, SplitText);

const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

function HomeAbout() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Text line reveal
      const split = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "line",
      });

      gsap.from(split.lines, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          toggleActions: "restart none none reverse",
        },
      });

      // Image reveal — randomized cube grid
      gsap.to(cellsRef.current, {
        height: 0,
        duration: 0.6,
        transformOrigin: "top",
        ease: "power2.out",
        stagger: {
          each: 0.015,
          from: "random",
        },
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 90%",
          toggleActions: "restart none none reverse",
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[98vh] flex-col sm:flex-row"
    >
      {/* Text panel */}
      <div className="flex max-w-2xl items-end px-6 py-12 sm:px-12 sm:py-16">
        <p
          ref={textRef}
          className="text-center text-2xl leading-snug text-white sm:text-start sm:text-3xl"
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
