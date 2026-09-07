import gsap from "gsap";
import { useEffect, useRef } from "react";

import { PortfolioModalProps } from "./PortfolioModal";

function useAnimatePortfolioModal({
  isOpen,
  onClose,
}: PortfolioModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate open/close
  useEffect(() => {
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
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    const original = {
      body: document.body.style.overflow,
      html: document.documentElement.style.overflow,
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = original.body;
      document.documentElement.style.overflow =
        original.html;
    };
  }, [isOpen]);

  return {
    overlayRef,
    panelRef,
  };
}

export default useAnimatePortfolioModal;
