"use client";

import useScrambleText from "./useScrambleText";
import styles from "./ScrambleText.module.scss";

function ScrambleText({ text }: { text: string }) {
  const { spanRef, scramble, reset, width, display } = useScrambleText({
    text,
  });

  return (
    <span
      ref={spanRef}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={styles["scramble-text"]}
      style={{ width }}
    >
      {display}
    </span>
  );
}

export default ScrambleText;
