import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Encapsulates all entrance / scroll animations for the Contact page.
 * Returns a ref that must be attached to the outermost wrapper element —
 * gsap.context() scopes every selector below to inside that element, and
 * automatically cleans up all tweens + ScrollTriggers on unmount so nothing
 * leaks or double-fires across route changes / fast refresh.
 */
function useAnimateContact() {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Hero intro — plays immediately on load, no scroll trigger ----
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".hero-heading", { y: 40, opacity: 0, duration: 0.9 })
        .from(".hero-copy", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");

      // ---- Messenger CTA card ----
      gsap.from(".messenger-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      // ---- "Other ways to reach us" header ----
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

      // ---- Contact method rows, staggered ----
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

      // ---- Map card ----
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

      // ---- Info strip (We Are Here / Parking), staggered ----
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
}

export default useAnimateContact;
