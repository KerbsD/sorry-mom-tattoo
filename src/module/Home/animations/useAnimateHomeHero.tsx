import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function useAnimateHomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hide the button immediately (before paint) so there's no flash of
      // it sitting there fully visible before the timeline runs
      gsap.set(buttonRef.current, { opacity: 0, y: 16, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Ink bleed reveal: starts wildly distorted/blurred, "settles" into crisp text
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          filter: "url(#ink-bleed-heavy) blur(8px)",
          scale: 1.04,
        },
        {
          opacity: 1,
          filter: "url(#ink-bleed-settled) blur(0px)",
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
      ).to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2", // starts just before subtext finishes, feels like a natural chain reaction
      );
    },
    { scope: containerRef },
  );

  return { containerRef, headingRef, buttonRef };
}

export default useAnimateHomeHero;
