import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useEffect, useState, useRef } from "react";

interface AnimateCartProps {
  isOpen: boolean;
}

function useAnimateCart(props: AnimateCartProps) {
  const { isOpen } = props;

  const [mounted, setMounted] = useState(isOpen);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!mounted || !overlayRef.current || !panelRef.current) return;

      if (isOpen) {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(panelRef.current, { x: "100%" });

        gsap
          .timeline()
          .to(overlayRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: "power1.out",
          })
          .to(
            panelRef.current,
            { x: "0%", duration: 0.3, ease: "power3.out" },
            "<0.05",
          );
      } else {
        gsap
          .timeline({ onComplete: () => setMounted(false) })
          .to(panelRef.current, {
            x: "100%",
            duration: 0.3,
            ease: "power3.in",
          })
          .to(
            overlayRef.current,
            { opacity: 0, duration: 0.2, ease: "power1.in" },
            "<",
          );
      }
    },
    { scope: overlayRef, dependencies: [isOpen, mounted] },
  );

  return {
    visible: mounted,
    overlayRef,
    panelRef,
  };
}

export default useAnimateCart;
