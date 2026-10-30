import { useFormikContext } from "formik";
import Calendar from "@/components/Calendar/Calendar";
import type { BookingValues } from "@/types/booking";

interface BookingCalendarProps {
  takenDates?: string[];
  isLoading?: boolean;
}

function BookingCalendar({ takenDates, isLoading }: BookingCalendarProps) {
  const formik = useFormikContext<BookingValues>();

  return (
    <Calendar
      date={formik.values.date}
      takenDates={takenDates}
      isLoading={isLoading}
      setDate={(next: Date[] | undefined) => {
        formik.setFieldValue("date", next);
        formik.setFieldTouched("date", true);
      }}
    />
  );
}

export default BookingCalendar;
