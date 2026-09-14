import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { products, categories } from "@/constants/Merch/Products";

function useAnimateMerch() {
  const [activeCategory, setActiveCategory] = useState("All");
  const isFirstRender = useRef(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Initial page-load animation — hero, filters, grid
  // Initial page-load animation — hero, filters, grid
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heroRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
    })
      .from(
        filtersRef.current?.children ?? [],
        {
          opacity: 1,
          y: 12,
          duration: 0.5,
          stagger: 0.06,
        },
        "-=0.4",
      )
      .from(
        gridRef.current?.children ?? [],
        {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.06,
        },
        "-=0.3",
      );
  }, []);

  // Re-animate grid on filter change ONLY — skip the initial mount
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (!gridRef.current) return;

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
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
