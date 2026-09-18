"use client";

import Image from "next/image";
import Link from "next/link";

import useHeader from "./useHeader";
import HeaderButton from "../Buttons/Header/HeaderButton";
import ScrambleText from "../Interactions/ScrambleText/ScrambleText";

import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction, RefObject } from "react";
import { HeaderItems } from "@/constants/Menu/MenuItems";

interface HeaderNavProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
  isHome: boolean;
}

interface HeaderMobileProps extends HeaderNavProps {
  wrapperRef: RefObject<HTMLDivElement | null>;
}

function HeaderDesktop(props: HeaderNavProps) {
  const { pathname, isHome } = props;

  return (
    <>
      <div className={isHome ? "lg:pl-8" : "lg:pl-12"}>
        <Link href={"/"}>
          <Image
            src="/smt-logo.png"
            alt="Sorry Mom Tattoo logo"
            width={100}
            height={100}
            loading="eager"
            className="header-logo"
          />
        </Link>
      </div>

      {/* Desktop nav — skipped entirely on the home page */}
      {!isHome && (
        <>
          <ul className="hidden gap-13 lg:flex">
            {HeaderItems.map((item) => {
              const isActive = pathname === item.link;

              return (
                <li className="header-items" key={item.title}>
                  <Link
                    href={item.link}
                    className={`relative inline-block uppercase transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-teal-300 after:transition-transform after:duration-300 after:content-[''] ${
                      isActive
                        ? "text-teal-300 after:scale-x-100"
                        : "mix-blend-difference after:scale-x-0 hover:text-teal-300 hover:after:scale-x-100"
                    }`}
                  >
                    <ScrambleText text={item.title} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="booknow-btn hidden lg:block lg:pr-12">
            <HeaderButton />
          </div>
        </>
      )}
    </>
  );
}

function HeaderMobile(props: HeaderMobileProps) {
  const { isOpen, setIsOpen, pathname, wrapperRef, isHome } = props;

  return (
    <div
      className={`relative lg:hidden ${isHome ? "block!" : ""}`}
      ref={wrapperRef}
    >
      {/* Mobile toggle button */}
      <button
        className={`z-50 text-white lg:hidden ${isHome ? "block!" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className=" " size={28} />
        ) : (
          <Menu className=" " size={28} />
        )}
      </button>

      {/* Mobile menu dropdown */}
      <div
        className={`absolute top-full right-0 mt-3 w-64 origin-top-right rounded-xl bg-[#1c1c1c] p-4 shadow-xl transition-[transform,opacity,visibility] duration-200 ease-out ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {HeaderItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <li key={item.title}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-3 py-2 lg:hidden">
          <HeaderButton />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const {
    isOpen,
    setIsOpen,
    pathname,
    isScrolled,
    headerRef,
    wrapperRef,
    isHome,
  } = useHeader();

  return (
    <nav
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 bg-transparent before:absolute before:inset-0 before:-z-10 before:origin-top before:bg-[#161616] before:transition-transform before:duration-400 before:ease-in-out before:content-[''] ${
        isScrolled && !isHome ? "before:scale-y-100" : "before:scale-y-0"
      }`}
    >
      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-0 ${
          isHome ? "px-4!" : ""
        }`}
      >
        <HeaderDesktop
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
          isHome={isHome}
        />
        <HeaderMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
          wrapperRef={wrapperRef}
          isHome={isHome}
        />
      </div>
    </nav>
  );
}

export default Header;
