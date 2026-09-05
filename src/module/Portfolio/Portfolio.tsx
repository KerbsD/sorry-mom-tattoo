"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioImages } from "@/constants/Portfolio/Images";
import { anton } from "@/utils/Fonts";

function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const animateSlides = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    setSelectedIndex(current);

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const isActive = index === current;
      gsap.to(slide, {
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    animateSlides();
    emblaApi.on("select", animateSlides);
    emblaApi.on("reInit", animateSlides);
  }, [emblaApi, animateSlides]);

  return (
    <section className="my-30 flex-1">
      <div className="flex flex-col items-center">
        <h1 className={`text-[50px] ${anton.className}`}>SMT PORTFOLIO</h1>
        <p className="border-t-2 border-teal-200 text-[15px]">
          Gallery of tattoos done by Sorry Mom.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-5xl px-3">
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {PortfolioImages.map(({ src, title, style }, index) => (
              <div
                key={style}
                className="min-w-0 flex-[0_0_70%] px-2 sm:flex-[0_0_50%]"
              >
                <div
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  <Image
                    src={src}
                    alt={title}
                    width={600}
                    height={600}
                    className="h-auto max-h-[70vh] w-auto object-contain"
                    loading="eager"
                  />
                  <span className="absolute right-2 bottom-2 rounded px-2 py-1 text-sm font-bold text-white">
                    {title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 text-white"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {PortfolioImages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === selectedIndex ? "bg-teal-400" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
