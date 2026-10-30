import "react-day-picker/style.css";

import { DayPicker } from "react-day-picker";
import {
  MAX_DAYS,
  QUICK_SELECT_OPTIONS,
  STUDIO_TIME_ZONE,
} from "@/constants/calendar";
import type { CalendarProps } from "@/types/calendar";

import useCalendar from "./useCalendar";

function Calendar(props: CalendarProps) {
  const {
    date,
    setDate,
    displayMonth,
    setDisplayMonth,
    applyQuickSelect,
    isDateDisabled,
    isDateTaken,
  } = useCalendar(props);

  const footer = props.isLoading
    ? "Checking availability…"
    : "Past dates and struck-through dates are unavailable.";

  return (
    <div className="w-full">
      <DayPicker
        mode="multiple"
        max={MAX_DAYS}
        selected={date}
        onSelect={setDate}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        timeZone={STUDIO_TIME_ZONE}
        disabled={isDateDisabled}
        modifiers={{ taken: isDateTaken }}
        modifiersClassNames={{
          taken: "[&>button]:line-through [&>button]:decoration-red-400/60",
        }}
        footer={footer}
        className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] p-3 text-white"
        classNames={{
          months: "",
          month: "",
          month_caption:
            "flex justify-center items-center h-9 font-medium text-white mb-2",
          nav: "flex items-center justify-between absolute inset-x-2 top-2",
          button_previous:
            "h-7 w-7 flex items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30",
          button_next:
            "h-7 w-7 flex items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30",
          weekdays: "flex justify-between",
          weekday: "flex-1 text-center text-xs font-normal text-white/50",
          week: "flex justify-between mt-1",
          day: "flex-1 flex items-center justify-center p-0",
          day_button:
            "aspect-square w-full max-w-9 rounded-md text-sm font-normal text-white hover:bg-white/10 transition-colors",
          selected:
            "[&>button]:bg-teal-400 [&>button]:text-black [&>button]:hover:bg-teal-400",
          today: "[&>button]:border [&>button]:border-teal-400",
          outside: "[&>button]:text-white/20",
          disabled: "[&>button]:text-white/20 [&>button]:cursor-not-allowed",
          footer: "mt-2 text-center text-xs text-white/50",
        }}
      />

      <div className="mt-3 flex gap-2">
        {QUICK_SELECT_OPTIONS.map(({ label, getRange }) => (
          <button
            key={label}
            type="button"
            onClick={() => applyQuickSelect(getRange)}
            className="flex-1 rounded-md border border-white/10 bg-[#2a2a2a] px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
