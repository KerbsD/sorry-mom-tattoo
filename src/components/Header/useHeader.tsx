import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

import useClickOutside from "../hooks/useClickOutside";

function useHeader() {
  const pathname = usePathname();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const isHome = pathname === "/";
  
  const { isOpen, setIsOpen } = useClickOutside();
  
  const toggleBooking = () => {
    setIsBookingOpen((prev) => !prev);
  };

  useLenis(({ scroll }) => {
    setIsScrolled(scroll > 20);
  });

  useGSAP(
    () => {
      if (isHome) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".header-logo", {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
        .from(
          ".header-items",
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          ".booknow-btn",
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
          },
          "-=0.3",
        );
    },
    { scope: headerRef, dependencies: [isHome] },
  );

  return {
    isOpen,
    setIsOpen,
    pathname,
    isScrolled,
    headerRef,
    isHome,
    isBookingOpen,
    toggleBooking,
  };
}

export default useHeader;
