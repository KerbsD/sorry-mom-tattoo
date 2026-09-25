interface MerchFilterDropdownProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

type useMerchFilterDropdownProps = Pick<MerchFilterDropdownProps, "onChange">;

export type { MerchFilterDropdownProps,  useMerchFilterDropdownProps};
