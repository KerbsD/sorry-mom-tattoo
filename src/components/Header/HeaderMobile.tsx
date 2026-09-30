import Link from "next/link";
import { X, Menu } from "lucide-react";
import { HEADER_ITEMS } from "@/constants/menu";
import { CartButton } from "../Buttons/Header/CartButton";
import HeaderButton from "../Buttons/Header/HeaderButton";

import { HeaderNavProps } from "@/types/headers";

function HeaderMobile(props: HeaderNavProps) {
  const { isOpen, toggleMenu, pathname, isHome, onBookNowClick, menuRef } =
    props;

  return (
    <div
      ref={menuRef}
      className={`relative xl:hidden ${isHome ? "block!" : ""}`}
    >
      <div className="flex gap-2 lg:pr-12">
        <button
          className={`z-50 text-white xl:hidden ${isHome ? "block!" : ""}`}
          onClick={() => toggleMenu()}
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
                  onClick={() => toggleMenu()}
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
              toggleMenu();
              onBookNowClick();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;
