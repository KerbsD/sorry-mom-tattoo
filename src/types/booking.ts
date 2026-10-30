import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BookingValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  date: Date[] | undefined;
}

/** Snapshot kept after a successful submit so the confirmation modal can show it. */
interface SubmittedBooking {
  bookingId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: Date[];
}

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  scheduledAt: string[];
}

interface CreatedBooking {
  id: number;
  status: string;
  scheduledAt: string[];
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

interface FormTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> {
  name: string;
  label?: string;
}

export type {
  BookingValues,
  SubmittedBooking,
  BookingPayload,
  CreatedBooking,
  BookingFormProps,
  FormInputProps,
  FormTextareaProps,
};
