import { RefObject } from "react";

interface HeaderButtonProps {
  onClick?: () => void;
}

interface HeaderNavProps {
  isOpen: boolean;
  toggleMenu: () => void;
  pathname: string;
  isHome: boolean;
  onBookNowClick: () => void;
  menuRef: RefObject<HTMLDivElement>;
}

type HeaderDesktopNavProps = Pick<
  HeaderNavProps,
  "pathname" | "isHome" | "onBookNowClick"
>;

export type { HeaderButtonProps, HeaderNavProps, HeaderDesktopNavProps };
