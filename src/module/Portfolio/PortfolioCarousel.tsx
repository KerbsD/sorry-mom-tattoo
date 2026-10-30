"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { anton } from "@/utils/fonts";
import usePortfolio from "./useAnimatePortfolio";
import type { PortfolioImageProps } from "@/types/portfolio";

import Modal from "@/components/Modal/CommonModal/Modal";
import PortfolioModalContent from "./PortfolioModalContent";

interface PortfolioCarouselProps {
  items: PortfolioImageProps[];
}

function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    slideRefs,
    isOpen,
    toggleModal,
    currentTattoo,
    modalInstanceKey,
  } = usePortfolio(items);

  return (
    <section className="min-h-[75dvh] flex-1">
      <div className="flex flex-col items-center pt-40">
        <h1
          className={`portfolio-heading text-6xl leading-none ${anton.className}`}
        >
          SMT PORTFOLIO
        </h1>
        <p className="portfolio-copy mt-6 text-sm text-white/60 sm:text-base">
          Gallery of tattoos done by Sorry Mom.
        </p>
      </div>

      <div className="portfolio-images-container relative mx-auto mt-12 max-w-5xl px-3 lg:max-w-7xl">
        <h3 className={`mt-4 text-center text-2xl ${anton.className}`}>
          {items[selectedIndex]?.title}
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
            {items.map(({ src, title }, index) => (
              <div
                onClick={() => toggleModal()}
                key={`${index}-${src}`}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_36%]"
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
                    sizes="(min-width: 1024px) 36vw, (min-width: 768px) 50vw, (min-width: 640px) 60vw, 85vw"
                    className="h-auto max-h-[70vh] w-full rounded-lg object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
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

      <div className="mt-8 flex justify-center gap-2 pb-40">
        {items.map((item, index) => (
          <button
            key={`${index}-${item.src}`}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === selectedIndex ? "bg-teal-400" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => toggleModal()}
        title="Portfolio Images"
        className="relative mx-4 flex h-120 w-full max-w-4xl flex-col rounded-lg bg-neutral-900 md:h-125 md:flex-row"
      >
        <PortfolioModalContent key={modalInstanceKey} tattoo={currentTattoo} />
      </Modal>
    </section>
  );
}

export default PortfolioCarousel;
