const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function formatDates(dates: Date[] | undefined): string | null {
  if (!dates || dates.length === 0) return null;

  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  return sorted.map(formatDate).join(", ");
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
