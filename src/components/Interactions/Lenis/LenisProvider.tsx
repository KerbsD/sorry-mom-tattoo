// components/LenisProvider.tsx
"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

function LenisProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        autoRaf: false, // GSAP's ticker drives Lenis now instead
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisProvider;
