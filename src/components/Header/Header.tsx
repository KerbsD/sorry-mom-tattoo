"use client";

import useHeader from "./useHeader";
import { CartDrawer } from "../Cart/CartDrawer";

import Modal from "@/components/Modal/CommonModal/Modal";
import BookingForm from "@/components/Booking/BookingForm";

import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

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
    menuRef
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
            pathname={pathname}
            isHome={isHome}
            onBookNowClick={() => toggleBooking()}
          />
          <HeaderMobile
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            pathname={pathname}
            isHome={isHome}
            onBookNowClick={() => toggleBooking()}
            menuRef={menuRef}
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
