import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useRef, useState } from "react";
import { PortfolioImages } from "@/constants/Portfolio/Images";

import useClickOutside from "@/utils/useClickOutside";

function usePortfolio() {
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

  const { isOpen, setIsOpen } = useClickOutside();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const currentTattoo = PortfolioImages[selectedIndex] ?? null;

  const animateSlides = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    setSelectedIndex(current);

    const slidesCount = slideRefs.current.length;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      let diff = index - current;
      if (diff > slidesCount / 2) diff -= slidesCount;
      if (diff < -slidesCount / 2) diff += slidesCount;

      const isActive = diff === 0;
      const direction = diff === 0 ? 0 : diff > 0 ? 1 : -1;
      const distance = Math.min(Math.abs(diff), 3);

      gsap.to(slide, {
        rotateY: isActive ? 0 : -direction * 35,
        x: direction * distance * 40,
        z: isActive ? 0 : -distance * 120,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : Math.max(0.1, 0.2 - distance * 0.35),
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: direction > 0 ? "left center" : "right center",
      });
    });
  }, [emblaApi]);

  useGSAP(() => {
    if (!emblaApi) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".portfolio-heading", { y: 40, opacity: 0, duration: 1 })
      .from(".portfolio-copy", { y: 20, opacity: 0, duration: 0.9 }, "-=0.5")
      .from(
        ".portfolio-images-container",
        { y: 10, opacity: 0, duration: 0.8 },
        "-=0.4",
      );

    animateSlides();
    emblaApi.on("select", animateSlides);
    emblaApi.on("reInit", animateSlides);
    emblaApi.on("scroll", animateSlides);

    return () => {
      emblaApi.off("select", animateSlides);
      emblaApi.off("reInit", animateSlides);
      emblaApi.off("scroll", animateSlides);
    };
  }, [emblaApi, animateSlides]);

  return {
    emblaRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    slideRefs,
    isOpen,
    toggleModal,
    currentTattoo,
  };
}

export default usePortfolio;
