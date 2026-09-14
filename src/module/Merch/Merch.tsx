// Merch.tsx
"use client";

import { anton } from "@/utils/Fonts";
import MerchCard from "@/components/Merch/MerchCard";
import { categories } from "@/constants/Merch/Products";
import useAnimateMerch from "@/constants/Merch/useAnimateMerch";

function Merch() {
  const {
    activeCategory,
    setActiveCategory,
    heroRef,
    filtersRef,
    gridRef,
    filteredProducts,
  } = useAnimateMerch();

  return (
    <section className="flex min-h-dvh justify-center bg-[#161616]">
      <section className="w-full max-w-6xl px-6 pt-40 pb-20">
        {/* Hero */}
        <div ref={heroRef} className="text-center">
          <h1
            className={`${anton.className} hero-heading text-6xl leading-none`}
          >
            SMT Merch
          </h1>

          <p className="hero-copy mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
            Collection of merch from SMT.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          ref={filtersRef}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-teal-400 bg-teal-400 text-black"
                  : "border-white/20 text-white/70 hover:border-teal-400 hover:text-teal-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <MerchCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <p className="mt-16 text-center text-white/50">
            No products found in this category.
          </p>
        )}
      </section>
    </section>
  );
}

export default Merch;
