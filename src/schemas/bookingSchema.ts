import * as Yup from "yup";
import { MAX_DAYS } from "@/constants/calendar";

// Mirrors smt-be/src/validators/bookings.ts so the browser catches the same
// mistakes before submitting. The API remains the source of truth.
const PHONE_PATTERN = /^[+\d][\d\s()+.-]{5,31}$/;

export const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Full name is required")
    .max(100, "Full name is too long"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required")
    .max(254, "Email is too long"),
  phone: Yup.string()
    .trim()
    .max(32, "Phone number is too long")
    .matches(PHONE_PATTERN, {
      message: "Phone number looks invalid",
      excludeEmptyString: true,
    }),
  message: Yup.string().trim().max(2000, "Message is too long"),
  date: Yup.array()
    .of(Yup.date().required())
    .min(1, "Pick at least one date")
    .max(MAX_DAYS, `Maximum ${MAX_DAYS} dates`)
    .required("Pick at least one date"),
});
