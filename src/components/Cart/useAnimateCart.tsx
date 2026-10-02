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
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const safetyRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!mounted || !overlayRef.current || !panelRef.current) return;

      // Clear anything left over from a previous open/close
      tlRef.current?.kill();
      safetyRef.current?.kill();
      gsap.killTweensOf([overlayRef.current, panelRef.current]);

      if (isOpen) {
        previouslyFocused.current =
          document.activeElement as HTMLElement | null;

        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(panelRef.current, { x: "100%" });

        tlRef.current = gsap
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
        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          safetyRef.current?.kill();
          setMounted(false);
          previouslyFocused.current?.focus();
        };

        tlRef.current = gsap
          .timeline({ onComplete: finish })
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

        // Fail-safe: unmount even if onComplete never fires
        safetyRef.current = gsap.delayedCall(0.6, finish);
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
