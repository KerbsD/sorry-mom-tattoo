const MAX_DAYS = 3;

// The API accepts slots up to one year ahead.
const MAX_DAYS_AHEAD = 365;

// The studio's local calendar. The landing calendar renders and submits dates
// in this zone so a visitor in another timezone still books the intended day.
const STUDIO_TIME_ZONE = "Asia/Manila";
const STUDIO_UTC_OFFSET = "+08:00";

// The calendar picks a day, not a time. The studio confirms the exact time
// after reviewing the request, so every submitted slot uses this placeholder.
const DEFAULT_BOOKING_TIME = "10:00";

const QUICK_SELECT_OPTIONS = [
  {
    label: "Clear",
    getRange: (): Date[] => [],
  },
];

export {
  MAX_DAYS,
  MAX_DAYS_AHEAD,
  STUDIO_TIME_ZONE,
  STUDIO_UTC_OFFSET,
  DEFAULT_BOOKING_TIME,
  QUICK_SELECT_OPTIONS,
};
