"use client";

import Image from "next/image";
import Link from "next/link";

import useHeader from "./useHeader";
import HeaderButton from "../Buttons/Header/HeaderButton";
import ScrambleText from "../Interactions/ScrambleText/ScrambleText";

import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction, RefObject } from "react";
import { HeaderItems } from "@/constants/Menu/MenuItems";

import styles from "./Header.module.scss";

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
      <div
        className={`${styles["header-logo"]} ${
          isHome ? styles["header-logo--force-mobile"] : ""
        }`}
      >
        <Link href={"/"}>
          <Image
            src="/smt-logo.png"
            alt="Sorry Mom Tattoo logo"
            width={100}
            height={100}
            loading="eager"
          />
        </Link>
      </div>

      {/* Desktop nav — skipped entirely on the home page */}
      {!isHome && (
        <>
          <ul className={styles["header-items"]}>
            {HeaderItems.map((item) => {
              const isActive = pathname === item.link;

              return (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className={`${styles["header-items__links"]} ${
                      isActive
                        ? styles["header-items__links-active"]
                        : styles["header-items__links-inactive"]
                    }`}
                  >
                    <ScrambleText text={item.title} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles["booknow-btn"]}>
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
      className={`${styles["header-mobile-wrapper"]} ${
        isHome ? styles["header-mobile-wrapper--force-visible"] : ""
      }`}
      ref={wrapperRef}
    >
      {/* Mobile toggle button */}
      <button
        className={`${styles["header-mobile-bgr-btn"]} ${
          isHome ? styles["header-mobile-bgr-btn--force-visible"] : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu dropdown */}
      <div
        className={`${styles["header-mobile-container"]} ${
          isOpen
            ? styles["header-mobile-container__open"]
            : styles["header-mobile-container__close"]
        }`}
      >
        <ul className={styles["header-mobile-items"]}>
          {HeaderItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <li key={item.title}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`${styles["header-mobile-items__links"]} ${
                    isActive
                      ? styles["header-mobile-items__links-active"]
                      : styles["header-mobile-items__links-inactive"]
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles["booknow-mobile-btn"]}>
          <HeaderButton />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { isOpen, setIsOpen, pathname, isScrolled, headerRef, wrapperRef } =
    useHeader();

  const isHome = pathname === "/";

  return (
    <nav
      ref={headerRef}
      className={`${styles["header-main"]} ${
        isScrolled && !isHome ? styles["header-main--scrolled"] : ""
      }`}
    >
      <div
        className={`${styles["header-main__container"]} ${
          isHome ? styles["header-main__container--force-mobile"] : ""
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
