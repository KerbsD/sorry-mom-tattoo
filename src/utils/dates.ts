import type { DateRange } from "react-day-picker";

export function getNextAvailableDate(input: Date): Date {
  const date = new Date(input);
  const day = date.getDay();

  if (day === 6) date.setDate(date.getDate() + 2);
  else if (day === 0) date.setDate(date.getDate() + 1);

  return date;
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function formatDateRange(range: DateRange | undefined): string | null {
  const { from, to } = range ?? {};
  if (!from) return null;
  return to && to.getTime() !== from.getTime()
    ? `${formatDate(from)} – ${formatDate(to)}`
    : formatDate(from);
}
