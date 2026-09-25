import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

import useClickOutside from "../../utils/Interactions/useClickOutside";

function useHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  const { isOpen, setIsOpen} = useClickOutside();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleBooking = () => {
    setIsOpen((prev) => !prev);
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
    pathname,
    isScrolled,
    headerRef,
    isHome,
    toggleBooking,
    isMenuOpen,
    toggleMenu,
  };
}

export default useHeader;
