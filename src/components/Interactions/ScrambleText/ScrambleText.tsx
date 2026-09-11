"use client";

import useScrambleText from "./useScrambleText";

function ScrambleText({ text }: { text: string }) {
  const { spanRef, scramble, reset, width, display } = useScrambleText({
    text,
  });

  return (
    <span
      ref={spanRef}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="inline-block tracking-tight text-base"
      style={{ width }}
    >
      {display}
    </span>
  );
}

export default ScrambleText;
