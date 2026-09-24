import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { addDays, differenceInCalendarDays, subDays } from "date-fns";
import { getNextAvailableDate } from "@/utils/dates";
import { MAX_DAYS } from "@/constants/calendar";
import type { CalendarProps } from "@/types/calendar";

function useCalendar(props: CalendarProps) {
  const { date, setDate } = props;
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  useEffect(() => {
    const initialDate = getNextAvailableDate(new Date());
    setDate({ from: initialDate, to: undefined });
    setDisplayMonth(initialDate);
  }, []);

  const handleSelect = (next: DateRange | undefined, triggerDate: Date) => {
    if (
      next?.from &&
      next?.to &&
      differenceInCalendarDays(next.to, next.from) + 1 > MAX_DAYS
    ) {
      setDate({ from: triggerDate, to: undefined });
      return;
    }
    setDate(next);
  };

  const limitMatchers =
    date?.from && !date.to
      ? [
          { before: subDays(date.from, MAX_DAYS - 1) },
          { after: addDays(date.from, MAX_DAYS - 1) },
        ]
      : [];

  return {
    date,
    setDate,
    handleSelect,
    limitMatchers,
    displayMonth,
    setDisplayMonth,
  };
}

export default useCalendar;
