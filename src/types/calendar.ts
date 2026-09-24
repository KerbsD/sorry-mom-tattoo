import type { DateRange } from "react-day-picker";

interface CalendarProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export type { CalendarProps };
