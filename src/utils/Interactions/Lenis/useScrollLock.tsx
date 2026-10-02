// src/utils/Interactions/Lenis/useScrollLock.tsx
"use client";

import { useEffect, useId } from "react";
import { useLenis } from "lenis/react";

// Module-level: shared by every component that locks scroll
const locks = new Set<string>();

function useScrollLock(locked: boolean) {
  const id = useId();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !locked) return;

    locks.add(id);
    lenis.stop();

    return () => {
      locks.delete(id);
      // Only resume scrolling when nobody else still holds a lock
      if (locks.size === 0) lenis.start();
    };
  }, [locked, lenis, id]);
}

export default useScrollLock;
