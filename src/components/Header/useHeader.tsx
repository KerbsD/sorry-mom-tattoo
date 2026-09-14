import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function useHeader() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    pathname,
    isScrolled,
    headerRef,
    wrapperRef,
    isHome,
  };
}

export default useHeader;
