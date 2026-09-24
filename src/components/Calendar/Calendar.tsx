import "react-day-picker/style.css";

import { DayPicker } from "react-day-picker";
import { CalendarProps } from "@/types/calendar";
import { QUICK_SELECT_OPTIONS } from "@/constants/calendar";

import useCalendar from "./useCalendar";

function Calendar(props: CalendarProps) {
  const {
    date,
    setDate,
    handleSelect,
    limitMatchers,
    displayMonth,
    setDisplayMonth,
  } = useCalendar(props);

  return (
    <div className="w-full">
      <DayPicker
        mode="range"
        selected={date}
        onSelect={handleSelect}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        disabled={[
          { before: new Date() },
          (day) => day.getDay() === 0 || day.getDay() === 6,
          ...limitMatchers,
        ]}
        className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] p-3 text-white"
        classNames={{
          months: "",
          month: "",
          month_caption:
            "flex justify-center items-center h-9 font-medium text-white mb-2",
          nav: "flex items-center justify-between absolute inset-x-2 top-2",
          button_previous:
            "h-7 w-7 flex items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white",
          button_next:
            "h-7 w-7 flex items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white",
          weekdays: "flex justify-between",
          weekday: "flex-1 text-center text-xs font-normal text-white/50",
          week: "flex justify-between mt-1",
          day: "flex-1 flex items-center justify-center p-0",
          day_button:
            "aspect-square w-full max-w-9 rounded-md text-sm font-normal text-white hover:bg-white/10 transition-colors",
          // Range styling: `selected` is left out on purpose so the
          // start/end/middle classes don't fight each other
          range_start:
            "[&>button]:bg-teal-400 [&>button]:text-black [&>button]:hover:bg-teal-400",
          range_end:
            "[&>button]:bg-teal-400 [&>button]:text-black [&>button]:hover:bg-teal-400",
          range_middle:
            "[&>button]:bg-teal-400/30 [&>button]:text-white [&>button]:hover:bg-teal-400/40",
          today: "[&>button]:border [&>button]:border-teal-400",
          outside: "[&>button]:text-white/20",
          disabled: "[&>button]:text-white/20 [&>button]:cursor-not-allowed",
        }}
      />

      <div className="mt-3 flex gap-2">
        {QUICK_SELECT_OPTIONS.map(({ label, getRange }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              const next = getRange();
              setDate(next);
              if (next.from) setDisplayMonth(next.from);
            }}
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
