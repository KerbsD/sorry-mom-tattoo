// components/Merch/MerchFilterDropdown.tsx
"use client";

import { ChevronDown } from "lucide-react";
import useMerchFilterDropdown from "./useMerchFilterDropdown";

interface MerchFilterDropdownProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

function MerchFilterDropdown({
  categories,
  activeCategory,
  onChange,
}: MerchFilterDropdownProps) {
  const { wrapperRef, handleSelect, isOpen, setIsOpen } =
    useMerchFilterDropdown({
      onChange,
    });

  return (
    <div ref={wrapperRef} className="relative max-w-50">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-[#1c1c1c] px-4 py-2.5 text-sm font-medium text-white transition hover:border-teal-400"
      >
        {activeCategory}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#1c1c1c] py-1 shadow-xl"
        >
          {categories.map((category) => (
            <li
              key={category}
              role="option"
              aria-selected={category === activeCategory}
            >
              <button
                type="button"
                onClick={() => handleSelect(category)}
                className={`block w-full px-4 py-2 text-left text-sm transition ${
                  category === activeCategory
                    ? "bg-teal-400 text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MerchFilterDropdown;
