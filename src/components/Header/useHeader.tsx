import { useState } from "react";
import { usePathname } from "next/navigation";

function useHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return { isOpen, setIsOpen, pathname };
}

export default useHeader;
