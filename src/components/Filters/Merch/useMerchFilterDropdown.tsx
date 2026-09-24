import useClickOutside from "@/utils/useClickOutside";
import type { useMerchFilterDropdownProps } from "@/types/filters";

function useMerchFilterDropdown(props: useMerchFilterDropdownProps) {
  const { onChange } = props;

  const { isOpen, setIsOpen, wrapperRef } = useClickOutside();

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
