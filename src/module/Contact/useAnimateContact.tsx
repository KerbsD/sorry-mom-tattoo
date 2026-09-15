import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useAnimateContact() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".hero-heading", { y: 40, opacity: 0, duration: 0.9 })
        .from(".hero-copy", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");

      gsap.from(".messenger-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".contacts-header", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contacts-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-item", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contacts-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".map-card", {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".map-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".info-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".info-strip",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    {
      scope: containerRef,
    },
  );

  return { containerRef };
}

export default useAnimateContact;
