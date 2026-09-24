interface HeaderButtonProps {
  onClick?: () => void;
}

interface HeaderNavProps {
  isOpen: boolean;
  setIsOpen: () => void;
  pathname: string;
  isHome: boolean;
  onBookNowClick: () => void;
}

export type { HeaderButtonProps, HeaderNavProps };
