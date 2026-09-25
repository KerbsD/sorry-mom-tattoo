import { useState } from "react";
import type { CalendarProps } from "@/types/calendar";

function useCalendar(props: CalendarProps) {
  const { date, setDate } = props;
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  return {
    date,
    setDate,
    displayMonth,
    setDisplayMonth,
  };
}

export default useCalendar;
