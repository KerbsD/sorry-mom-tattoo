import { InputHTMLAttributes } from "react";

interface BookingValues {
  fullName: string;
  email: string;
  date: Date[] | undefined; // was DateRange | undefined
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
