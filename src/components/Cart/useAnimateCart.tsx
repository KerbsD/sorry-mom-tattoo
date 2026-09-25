import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useEffect, useState, useRef } from "react";
import type { AnimateCartProps } from "@/types/cart";

function useAnimateCart(props: AnimateCartProps) {
  const { isOpen } = props;

  const [mounted, setMounted] = useState(isOpen);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!mounted || !overlayRef.current || !panelRef.current) return;

      gsap.killTweensOf([overlayRef.current, panelRef.current]);

      if (isOpen) {
        previouslyFocused.current =
          document.activeElement as HTMLElement | null;

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
          )
          .call(() => panelRef.current?.focus());
      } else {
        gsap
          .timeline({
            onComplete: () => {
              setMounted(false);

              previouslyFocused.current?.focus();
            },
          })
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
