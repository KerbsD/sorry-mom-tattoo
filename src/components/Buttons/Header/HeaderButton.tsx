import { CircleArrowRight } from "lucide-react";
import type { HeaderButtonProps } from "@/types/headers";

function HeaderButton({ onClick }: HeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1 rounded-md border-2 border-teal-400 px-2 py-1 text-sm text-teal-300 transition hover:bg-teal-400 hover:text-black"
    >
      <span className="text-base font-semibold tracking-tight">BOOK NOW</span>
      <CircleArrowRight size={20} />
    </button>
  );
}

export default HeaderButton;
