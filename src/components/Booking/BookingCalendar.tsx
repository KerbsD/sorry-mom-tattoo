// components/BookingCalendar.tsx
import { useFormikContext } from "formik";
import type { DateRange } from "react-day-picker";
import Calendar from "@/components/Calendar/Calendar";
import type { BookingValues } from "@/types/booking";

function BookingCalendar() {
  const formik = useFormikContext<BookingValues>();

  return (
    <Calendar
      date={formik.values.date}
      setDate={(d: DateRange | undefined) => {
        formik.setFieldValue("date", d);
        formik.setFieldTouched("date", true);
      }}
    />
  );
}

export default BookingCalendar;