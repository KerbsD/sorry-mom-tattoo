import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useAnimateAftercare() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Hero intro (plays on load, no scroll trigger) ----
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTl
        .from(".hero-eyebrow", {
          y: 16,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-heading",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3",
        )
        .from(
          ".hero-copy",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        );

      // ---- Steps section header ----
      gsap.from(".steps-header > *", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ---- Steps grid cards ----
      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ---- Rules header ----
      gsap.from(".rules-header > *", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rules-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ---- Do's / Don'ts columns ----
      gsap.from(".rules-col", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rules-grid",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Items within each column stagger in slightly after the column
      gsap.from(".rule-item", {
        x: -12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rules-grid",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
}

export default useAnimateAftercare;
