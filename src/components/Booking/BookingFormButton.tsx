// components/BookingSubmitButton.tsx
import { useFormikContext } from "formik";

function BookingFormButtons() {
  const { isSubmitting } = useFormikContext();

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded-md border-2 border-teal-400 px-4 py-2 text-sm font-semibold text-nowrap text-teal-300 transition hover:bg-teal-400 hover:text-black disabled:opacity-50"
    >
      {isSubmitting ? "Booking..." : "Book Now"}
    </button>
  );
}

export default BookingFormButtons;
