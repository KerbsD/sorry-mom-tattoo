import * as Yup from "yup";

export const bookingSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().required("Please pick a date"),
});
