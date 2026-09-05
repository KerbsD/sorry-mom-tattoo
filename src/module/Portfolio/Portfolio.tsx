"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { anton } from "@/utils/Fonts";
import { PortfolioImages } from "@/constants/Portfolio/Images";
import usePortfolio from "./useAnimatePortfolio";

import PortfolioModal from "./PortfolioModal";

function Portfolio() {
  const {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    slideRefs,
    isModalOpen,
    setIsModalOpen,
    currentTattoo,
  } = usePortfolio();

  return (
    <section className="my-30 min-h-[75dvh] flex-1">
      <div className="flex flex-col items-center">
        <h1 className={`text-[50px] ${anton.className}`}>
          SMT PORTFOLIO
        </h1>
        <p className="border-t-2 border-teal-200 text-[15px]">
          Gallery of tattoos done by Sorry Mom.
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-5xl px-3 lg:max-w-7xl">
        <h3
          className={`mt-4 text-center text-2xl ${anton.className}`}
        >
          {PortfolioImages[selectedIndex].title}
        </h3>
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-1 z-10 h-[30%] -translate-y-1/2 rounded-full p-1 text-white md:left-5"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          style={{ perspective: "1200px" }}
        >
          <div
            className="my-15 flex lg:my-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {PortfolioImages.map(
              ({ src, title, style }, index) => (
                <div
                  onClick={() => setIsModalOpen(true)}
                  key={style}
                  className="min-w-0 flex-[0_0_70%] lg:flex-[0_0_40%]"
                >
                  <div
                    ref={(el) => {
                      slideRefs.current[index] = el;
                    }}
                    className="relative"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                  >
                    <Image
                      src={src}
                      alt={title}
                      width={600}
                      height={600}
                      className="h-auto max-h-[70vh] w-full object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-1 z-10 h-[30%] -translate-y-1/2 rounded-full p-1 text-white md:right-5"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="mt-12 flex justify-center gap-2">
        {PortfolioImages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-teal-400"
                : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <PortfolioModal
        tattoo={currentTattoo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

export default Portfolio;
