interface CalendarProps {
  date: Date[] | undefined;
  setDate: (date: Date[] | undefined) => void;
  /** Calendar days in YYYY-MM-DD form that already have an active booking. */
  takenDates?: string[];
  isLoading?: boolean;
}

export type { CalendarProps };
