// useAnimateHomeAbout.tsx
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function useAnimateHomeAbout() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // Tweak these per breakpoint
          const textStart = isDesktop ? "top 50%" : "top 60%";
          const imageStart = isDesktop ? "top 70%" : "top 80%";
          const pinStart = isDesktop ? "top top" : "top 60px";

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
              start: textStart,
              toggleActions: "restart none none reverse",
            },
          });

          gsap.to(cellsRef.current, {
            height: 0,
            duration: 0.6,
            transformOrigin: "top",
            ease: "power2.out",
            stagger: { each: 0.015, from: "random" },
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: imageStart,
              toggleActions: "restart none none reverse",
            },
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: pinStart,
            end: "bottom 60px",
            pin: true,
            pinSpacing: false,
          });

          // Runs when the breakpoint stops matching (or on unmount)
          return () => split.revert();
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return { textRef, textPanelRef, sectionRef, cellsRef, imageWrapperRef };
}

export default useAnimateHomeAbout;
