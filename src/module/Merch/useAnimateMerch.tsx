import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { products } from "@/constants/Merch/Products";

function useAnimateMerch() {
  const [activeCategory, setActiveCategory] = useState("All");
  const prevCategory = useRef(activeCategory);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Entrance animation — runs exactly once on mount, unrelated to activeCategory
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".merch-card") ?? [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".merch-heading", { y: 40, opacity: 0, duration: 0.7 })
        .from(".merch-copy", { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
        .from(
          filtersRef.current?.children ?? [],
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.06,
            overwrite: true,
          },
          "-=0.4",
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
          "-=0.3",
        );
    },
    { scope: heroRef },
  );

  // Filter-change animation — only fires when activeCategory actually changes
  useGSAP(
    () => {
      const changed = prevCategory.current !== activeCategory;
      prevCategory.current = activeCategory;

      if (!changed) return; // covers both the initial run AND Strict Mode's duplicate mount run

      const cards = gridRef.current?.querySelectorAll(".merch-card") ?? [];

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
    heroRef,
    filtersRef,
    gridRef,
    filteredProducts,
  };
}

export default useAnimateMerch;
