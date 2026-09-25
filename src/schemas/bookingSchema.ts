// schemas/bookingSchema.ts
import * as Yup from "yup";
import { MAX_DAYS } from "@/constants/calendar";

export const bookingSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.array()
    .of(Yup.date().required())
    .min(1, "Pick at least one date")
    .max(MAX_DAYS, `Maximum ${MAX_DAYS} dates`)
    .required("Pick at least one date"),
});