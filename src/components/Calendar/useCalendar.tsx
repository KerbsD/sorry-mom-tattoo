import { useState, useEffect } from "react";
import type { CalendarProps } from "@/types/calendar";

function useCalendar(props: CalendarProps) {
  const { date, setDate } = props;
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

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
  };
}

export default useCalendar;
