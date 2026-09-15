import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function useAnimateHomeAbout() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

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

  return { textRef, sectionRef, cellsRef, imageWrapperRef };
}

export default useAnimateHomeAbout;
