import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import useClickOutside from "../../utils/Interactions/useClickOutside";

function useHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  const { isOpen, setIsOpen } = useClickOutside();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
  
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
  
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

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
    menuRef,
  };
}

export default useHeader;
