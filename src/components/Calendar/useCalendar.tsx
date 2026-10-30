import { useMemo, useState } from "react";
import type { CalendarProps } from "@/types/calendar";
import { MAX_DAYS_AHEAD } from "@/constants/calendar";
import {
  getEarliestBookingKey,
  getMaxBookingKey,
  toDateKey,
} from "@/utils/dates";

function useCalendar(props: CalendarProps) {
  const { date, setDate, takenDates = [] } = props;
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  const earliestBookingKey = getEarliestBookingKey();
  const maxBookingKey = getMaxBookingKey(MAX_DAYS_AHEAD);
  const takenDateSet = useMemo(() => new Set(takenDates), [takenDates]);

  const isDateTaken = (day: Date) => takenDateSet.has(toDateKey(day));

  // Comparing YYYY-MM-DD strings avoids the off-by-one-day problems that come
  // from comparing midnight instants across timezones.
  const isDateDisabled = (day: Date) => {
    const key = toDateKey(day);
    return (
      key < earliestBookingKey ||
      key > maxBookingKey ||
      takenDateSet.has(key)
    );
  };

  const applyQuickSelect = (getRange: () => Date[]) => {
    const next = getRange();
    setDate(next);
    setDisplayMonth(next[0] ?? new Date());
  };

  return {
    date,
    setDate,
    displayMonth,
    setDisplayMonth,
    applyQuickSelect,
    isDateDisabled,
    isDateTaken,
  };
}

export default useCalendar;
