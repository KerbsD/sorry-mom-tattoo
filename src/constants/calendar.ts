import type { DateRange } from "react-day-picker";
import { getNextAvailableDate } from "@/utils/dates";

const MAX_DAYS = 3;

const QUICK_SELECT_OPTIONS = [
  {
    label: "Reset",
    getRange: (): DateRange => ({
      from: getNextAvailableDate(new Date()),
      to: undefined,
    }),
  },
];

export { MAX_DAYS, QUICK_SELECT_OPTIONS };
