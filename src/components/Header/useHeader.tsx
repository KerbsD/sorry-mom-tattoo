import gsap from "gsap";
import styles from "./Header.module.scss";

import { useLenis } from "lenis/react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function useHeader() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    setIsScrolled(scroll > 20);
  });

  //Header background animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(`.${styles["header-logo"]}`, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
        .from(
          `.${styles["header-items"]} li`,
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3", // overlap slightly with the logo animation
        )
        .from(
          `.${styles["booknow-btn"]}`,
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
          },
          "-=0.3",
        );
    }, headerRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  //Mobile Dropdown Menu
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
  };
}

export default useHeader;
