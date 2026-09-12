import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// If the given date lands on a Sat/Sun, roll forward to the next Monday
function getNextAvailableDate(input: Date): Date {
  const date = new Date(input);
  const day = date.getDay();

  if (day === 6) {
    // Saturday -> +2 days
    date.setDate(date.getDate() + 2);
  } else if (day === 0) {
    // Sunday -> +1 day
    date.setDate(date.getDate() + 1);
  }

  return date;
}

const QUICK_SELECT_OPTIONS = [
  {
    label: "Reset",
    getDate: () => getNextAvailableDate(new Date()),
  },
];

function Calendar(props: CalendarProps) {
  const { date, setDate } = props;
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  // On mount: if no date is selected yet, default to today —
  // but if today is disabled (weekend), jump to the next available weekday
  useEffect(() => {
    const initialDate = getNextAvailableDate(new Date());
    setDate(initialDate);
    setDisplayMonth(initialDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <DayPicker
        mode="single"
        selected={date}
        onSelect={setDate}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        disabled={[
          { before: new Date() },
          (day) => day.getDay() === 0 || day.getDay() === 6,
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
          selected:
            "[&>button]:bg-teal-400 [&>button]:text-black [&>button]:hover:bg-teal-400",
          today: "[&>button]:border [&>button]:border-teal-400",
          outside: "[&>button]:text-white/20",
          disabled: "[&>button]:text-white/20 [&>button]:cursor-not-allowed",
        }}
      />

      <div className="mt-3 flex gap-2">
        {QUICK_SELECT_OPTIONS.map(({ label, getDate }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              const nextDate = getDate();
              setDate(nextDate);
              setDisplayMonth(nextDate);
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
