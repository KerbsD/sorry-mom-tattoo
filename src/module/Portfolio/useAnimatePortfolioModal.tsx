import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { PortfolioModalProps } from "./PortfolioModal";

function useAnimatePortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Animate open/close
  useGSAP(
    () => {
      if (!overlayRef.current || !panelRef.current) return;

      if (isOpen) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1, ease: "power2.out" },
        );
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, {
                display: "none",
              });
            }
          },
        });
      }
    },
    { dependencies: [isOpen], scope: overlayRef },
  );

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock Lenis (and native) scroll while open
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  return {
    overlayRef,
    panelRef,
  };
}

export default useAnimatePortfolioModal;
