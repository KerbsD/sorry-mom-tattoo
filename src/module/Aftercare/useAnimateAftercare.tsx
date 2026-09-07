import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function useAnimateAftercare() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const split = new SplitText(headingRef.current, {
      type: "lines",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from(eyebrowRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.5,
    })
      .from(
        split.lines,
        {
          opacity: 0,
          yPercent: 100,
          stagger: 0.12,
          duration: 0.9,
        },
        "-=0.2",
      )
      .from(
        bodyRef.current,
        { opacity: 0, y: 12, duration: 0.6 },
        "-=0.4",
      );

    return () => split.revert();
  }, []);

  useEffect(() => {
    gsap.utils
      .toArray<HTMLElement>(".section-header")
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
  }, []);

  return { eyebrowRef, headingRef, bodyRef };
}

export default useAnimateAftercare;
