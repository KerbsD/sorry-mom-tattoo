"use client";

import Image from "next/image";
import Link from "next/link";

import useHeader from "./useHeader";
import HeaderButton from "../Buttons/Header/HeaderButton";
import ScrambleText from "../Interactions/ScrambleText/ScrambleText";

import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { HeaderItems } from "@/constants/Menu/MenuItems";

import styles from "./Header.module.scss";

interface HeaderNavProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}

function HeaderDesktop(props: HeaderNavProps) {
  const { pathname } = props;

  return (
    <>
      <div className={styles["header-logo"]}>
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

      {/* Desktop nav */}
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
  );
}

function HeaderMobile(props: HeaderNavProps) {
  const { isOpen, setIsOpen, pathname } = props;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={styles["header-mobile-bgr-btn"]}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu overlay */}
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
        <HeaderButton />
      </div>
    </>
  );
}

function Header() {
  const { isOpen, setIsOpen, pathname } = useHeader();

  return (
    <nav className={styles["header-main"]}>
      <div className={styles["header-main__container"]}>
        <HeaderDesktop
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
        />
        <HeaderMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
        />
      </div>
    </nav>
  );
}

export default Header;
