// Design/useAnimateDesign.tsx
"use client";

import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { DESIGN } from "@/constants/design";

function useAnimateDesign() {
  const [activeCategory, setActiveCategory] = useState("All Designs");
  const prevCategory = useRef(activeCategory);

  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredDesigns =
    activeCategory === "All Designs"
      ? DESIGN
      : DESIGN.filter((d) => d.category === activeCategory);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".design-card") ?? [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".design-heading", { y: 40, opacity: 0, duration: 0.7 })
        .from(".design-copy", { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(
          filtersRef.current?.children ?? [],
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.06,
            overwrite: true,
          },
          "-=0.3",
        )
        .from(
          cards,
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.06,
            overwrite: true,
          },
          "-=0.2",
        );
    },
    { scope: headingRef },
  );

  // Filter-change animation — only fires when activeCategory actually changes
  useGSAP(
    () => {
      const changed = prevCategory.current !== activeCategory;
      prevCategory.current = activeCategory;

      if (!changed) return; // covers initial run + Strict Mode's duplicate mount run

      const cards = gridRef.current?.querySelectorAll(".design-card") ?? [];

      gsap.from(cards, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: true,
      });
    },
    { dependencies: [activeCategory] },
  );

  return {
    activeCategory,
    setActiveCategory,
    headingRef,
    filtersRef,
    gridRef,
    filteredDesigns,
  };
}

export default useAnimateDesign;
