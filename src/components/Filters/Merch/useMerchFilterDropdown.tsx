import useClickOutside from "@/utils/useClickOutside";

interface MerchFilterDropdownProps {
  onChange: (category: string) => void;
}

function useMerchFilterDropdown(props: MerchFilterDropdownProps) {
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
