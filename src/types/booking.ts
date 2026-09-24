import type { DateRange } from "react-day-picker";
import { InputHTMLAttributes } from "react";

interface BookingValues {
  fullName: string;
  email: string;
  date: DateRange | undefined;
}

interface BookingFormProps {
  className?: string;
}

interface FormInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: string;
  label?: string;
}

export type { BookingValues, BookingFormProps, FormInputProps };
