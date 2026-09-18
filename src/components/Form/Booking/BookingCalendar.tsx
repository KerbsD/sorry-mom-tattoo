// components/BookingCalendar.tsx
import { useFormikContext } from "formik";
import Calendar from "@/components/Calendar/Calendar";

interface BookingValues {
  firstName: string;
  lastName: string;
  email: string;
  date: Date | undefined;
}

function BookingCalendar() {
  const formik = useFormikContext<BookingValues>();

  return (
    <>
      <Calendar
        date={formik.values.date}
        setDate={(d: Date | undefined) => {
          formik.setFieldValue("date", d);
          formik.setFieldTouched("date", true);
        }}
      />
    </>
  );
}

export default BookingCalendar;
