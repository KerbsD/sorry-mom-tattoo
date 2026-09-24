// schemas/bookingSchema.ts
import * as Yup from "yup";

export const bookingSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.object({
    from: Yup.date().required("Pick a date"),
    to: Yup.date().optional(),
  }).required("Pick a date"),
});