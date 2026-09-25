// Design/Design.tsx
"use client";

import { anton } from "@/utils/fonts";
import DesignCard from "./DesignCard";
import useAnimateDesign from "./useAnimateDesign";
import { DESIGN_CATEGORIES } from "@/constants/design";

function Design() {
  const {
    activeCategory,
    setActiveCategory,
    headingRef,
    filtersRef,
    gridRef,
    filteredDesigns,
  } = useAnimateDesign();

  return (
    <section className="flex min-h-dvh justify-center">
      <section className="w-full max-w-6xl px-6 py-40">
        {/* Hero */}
        <div ref={headingRef} className="text-center">
          <h1
            className={`design-heading ${anton.className} text-6xl leading-none`}
          >
            DESIGNS FOR SALE
          </h1>

          <p className="design-copy mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
            Original tattoo designs by Sorry Mom. <br /> Ready to ink.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          ref={filtersRef}
          className="mt-10 flex flex-wrap justify-center gap-8 border-b border-black/10 pb-4"
        >
          {DESIGN_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`text-sm font-semibold tracking-wide uppercase ${
                activeCategory === category
                  ? "border-b-2 border-teal-400 pb-1 text-teal-400"
                  : "pb-1 text-white/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Design grid */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filteredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>

        {/* Empty state */}
        {filteredDesigns.length === 0 && (
          <p className="mt-16 text-center text-black/50">
            No designs found in this category.
          </p>
        )}
      </section>
    </section>
  );
}

export default Design;
