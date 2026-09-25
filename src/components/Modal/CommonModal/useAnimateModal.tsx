import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import type { AnimateModalProps } from "@/types/modal";

function useAnimateModal(props: AnimateModalProps) {
  const { isOpen } = props;

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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
            duration: 0.3,
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

export default useAnimateModal;
