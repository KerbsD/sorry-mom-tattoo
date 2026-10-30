import { useCallback, useEffect, useMemo, useState } from "react";
import { getTakenBookingDates } from "@/lib/booking";

function availabilityErrorMessage(reason: unknown): string {
  return reason instanceof Error
    ? reason.message
    : "Could not load availability.";
}

function useBookingAvailability() {
  const [takenDates, setTakenDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getTakenBookingDates(controller.signal)
      .then((dates) => {
        if (controller.signal.aborted) return;
        setTakenDates(dates);
        setError(null);
        setIsLoading(false);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(availabilityErrorMessage(reason));
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    try {
      const dates = await getTakenBookingDates();
      setTakenDates(dates);
      setError(null);
    } catch (reason) {
      setError(availabilityErrorMessage(reason));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTakenDates = useCallback((dates: string[]) => {
    if (dates.length === 0) return;
    setTakenDates((current) => [...new Set([...current, ...dates])].sort());
  }, []);

  const takenDateSet = useMemo(() => new Set(takenDates), [takenDates]);

  return {
    takenDates,
    takenDateSet,
    isLoading,
    error,
    refresh,
    addTakenDates,
  };
}

export default useBookingAvailability;
