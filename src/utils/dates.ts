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
