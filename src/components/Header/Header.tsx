"use client";

import Image from "next/image";
import Link from "next/link";

import useHeader from "./useHeader";
import HeaderButton from "../Buttons/Header/HeaderButton";
import ScrambleText from "../../utils/Interactions/ScrambleText/ScrambleText";
import Modal from "@/components/Modal/CommonModal/Modal";
import BookingForm from "@/components/Booking/BookingForm";

import { Menu, X } from "lucide-react";
import { HEADER_ITEMS } from "@/constants/menu";
import { CartButton } from "../Buttons/Header/CartButton";
import { CartDrawer } from "../Cart/CartDrawer";
import type { HeaderNavProps } from "@/types/headers";

function HeaderDesktop(props: HeaderNavProps) {
  const { pathname, isHome, onBookNowClick } = props;

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

      {!isHome && (
        <>
          <ul className="hidden gap-13 xl:flex">
            {HEADER_ITEMS.map((item) => {
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

          <div className="booknow-btn hidden lg:items-center lg:gap-4 lg:pr-12 xl:flex">
            <CartButton />
            <HeaderButton onClick={onBookNowClick} />
          </div>
        </>
      )}
    </>
  );
}

function HeaderMobile(props: HeaderNavProps) {
  const { isOpen, setIsOpen, pathname, isHome, onBookNowClick } = props;

  return (
    <div className={`relative xl:hidden ${isHome ? "block!" : ""}`}>
      <div className="flex gap-2 lg:pr-12">
        <button
          className={`z-50 text-white xl:hidden ${isHome ? "block!" : ""}`}
          onClick={() => setIsOpen()}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <CartButton />
      </div>

      <div
        className={`absolute top-full right-0 mt-3 w-64 origin-top-right rounded-xl bg-[#1c1c1c] p-4 shadow-xl transition-[transform,opacity,visibility] duration-200 ease-out ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {HEADER_ITEMS.map((item) => {
            const isActive = pathname === item.link;

            return (
              <li key={item.title}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen()}
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
        <div className={`px-3 py-2 xl:hidden ${isHome ? "hidden!" : ""}`}>
          <HeaderButton
            onClick={() => {
              setIsOpen();
              onBookNowClick();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const {
    isOpen,
    pathname,
    isScrolled,
    headerRef,
    isHome,
    toggleBooking,
    isMenuOpen,
    toggleMenu,
  } = useHeader();

  return (
    <>
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
            isOpen={isMenuOpen}
            setIsOpen={toggleMenu}
            pathname={pathname}
            isHome={isHome}
            onBookNowClick={() => toggleBooking()}
          />
          <HeaderMobile
            isOpen={isMenuOpen}
            setIsOpen={toggleMenu}
            pathname={pathname}
            isHome={isHome}
            onBookNowClick={() => toggleBooking()}
          />
        </div>
      </nav>

      <CartDrawer />

      <Modal
        isOpen={isOpen}
        onClose={() => toggleBooking()}
        title="Book a session"
        className="mx-5 max-w-xl"
      >
        <BookingForm />
      </Modal>
    </>
  );
}

export default Header;
