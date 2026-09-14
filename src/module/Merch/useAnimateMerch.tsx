import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { products, categories } from "@/constants/Merch/Products";

function useAnimateMerch() {
  const [activeCategory, setActiveCategory] = useState("All");
  const hasMounted = useRef(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".merch-card") ?? [];

      if (!hasMounted.current) {
        // Initial page-load sequence — hero, filters, grid
        hasMounted.current = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(heroRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
        })
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
      } else {
        // Filter change — only the grid re-animates
        gsap.from(cards, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: true,
        });
      }
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
