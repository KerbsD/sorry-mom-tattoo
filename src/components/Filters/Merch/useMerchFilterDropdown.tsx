import { useEffect, useRef, useState } from "react";

interface MerchFilterDropdownProps {
  onChange: (category: string) => void;
}

function useMerchFilterDropdown(props: MerchFilterDropdownProps) {
  const { onChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(category: string) {
    onChange(category);
    setIsOpen(false);
  }

  return {
    wrapperRef,
    handleSelect,
    isOpen,
    setIsOpen,
  };
}

export default useMerchFilterDropdown;
