import { BookCheck } from "lucide-react";

function BookButton() {
  return (
    <a className="flex max-h-20 max-w-56.25 items-center justify-center gap-1.5 rounded-lg border-2 border-teal-400 px-1 py-1 text-sm text-teal-300 transition hover:bg-teal-400 hover:text-black sm:gap-2 sm:border-3 md:gap-4 md:px-2  ">
      <span className="text-base font-semibold tracking-tight sm:text-xl text-nowrap">
        Book Now
      </span>
      <BookCheck size={18} className="sm:size-6 md:size-7.75" />
    </a>
  );
}

export default BookButton;
