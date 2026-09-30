import Image from "next/image";
import Link from "next/link";
import { HEADER_ITEMS } from "@/constants/menu";
import { CartButton } from "../Buttons/Header/CartButton";
import type { HeaderDesktopNavProps } from "@/types/headers";
import HeaderButton from "../Buttons/Header/HeaderButton";
import ScrambleText from "../../utils/Interactions/ScrambleText/ScrambleText";

function HeaderDesktop(props: HeaderDesktopNavProps) {
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
            className="header-logo"
            priority
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

export default HeaderDesktop;
