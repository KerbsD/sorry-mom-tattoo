import type { BookingValues } from "@/types/booking";
import { getNextAvailableDate } from "@/utils/dates";
import { availableChannels } from "@/utils/Channels";

const getInitialValues = (): BookingValues => ({
  fullName: "",
  email: "",
  date: { from: getNextAvailableDate(new Date()), to: undefined },
});

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const channels = availableChannels();

export { getInitialValues, formatDate, channels };
