import { useEffect, useState } from "react";

const READ_DELAY_SECONDS = 3;

function useConfirmModalDelayButton({ isLoading, channel }: any) {
  const [secondsLeft, setSecondsLeft] = useState(READ_DELAY_SECONDS);

  useEffect(() => {
    setSecondsLeft(READ_DELAY_SECONDS);
  }, [channel]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const isWaiting = secondsLeft > 0;
  const isConfirmDisabled = isLoading || isWaiting;

  return {
    isConfirmDisabled,
    isWaiting,
    secondsLeft,
  };
}

export default useConfirmModalDelayButton;
