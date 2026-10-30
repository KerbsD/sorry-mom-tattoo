import {
  STUDIO_TIME_ZONE,
  STUDIO_UTC_OFFSET,
  DEFAULT_BOOKING_TIME,
} from "@/constants/calendar";

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const studioDateKeyFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: STUDIO_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** The calendar day in the studio's timezone, e.g. "2026-11-05". */
export function toDateKey(date: Date): string {
  const parts = studioDateKeyFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return year && month && day ? `${year}-${month}-${day}` : "";
}

export function getTodayKey(): string {
  return toDateKey(new Date());
}

/**
 * First selectable day. Today stays selectable until the placeholder slot time
 * has passed; after that the API would reject it as past.
 */
export function getEarliestBookingKey(): string {
  const todayKey = getTodayKey();
  const todaySlot = new Date(
    `${todayKey}T${DEFAULT_BOOKING_TIME}:00${STUDIO_UTC_OFFSET}`,
  );

  if (Date.now() < todaySlot.getTime()) return todayKey;
  return toDateKey(new Date(Date.now() + 24 * 60 * 60 * 1000));
}

/** Last selectable day, expressed the same way as the API's availability keys. */
export function getMaxBookingKey(daysAhead: number): string {
  return toDateKey(new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000));
}

/**
 * Converts a calendar day into the timezone-aware ISO datetime the API expects.
 * The time is a placeholder until the studio confirms the exact schedule.
 */
export function dateKeyToScheduledAt(key: string): string {
  return new Date(
    `${key}T${DEFAULT_BOOKING_TIME}:00${STUDIO_UTC_OFFSET}`,
  ).toISOString();
}

export function toScheduledAt(date: Date): string {
  return dateKeyToScheduledAt(toDateKey(date));
}

function formatDateKey(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  if (!year || !month || !day) return key;

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? key : formatDate(date);
}

export function formatDates(dates: Date[] | undefined): string | null {
  if (!dates || dates.length === 0) return null;

  const keys = [...new Set(dates.map(toDateKey))].filter(Boolean).sort();
  return keys.length > 0 ? keys.map(formatDateKey).join(", ") : null;
}

/**
 * Formats an API calendar date ("YYYY-MM-DD") without going through UTC, which
 * would shift the day for visitors west of Greenwich.
 */
export function formatCalendarDate(
  value: string | null | undefined,
): string | undefined {
  if (!value) return undefined;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return value;

  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  return Number.isNaN(date.getTime()) ? value : formatDate(date);
}
