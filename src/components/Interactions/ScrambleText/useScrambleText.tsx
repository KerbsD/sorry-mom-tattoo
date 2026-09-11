import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function useScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const spanRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.getBoundingClientRect().width);
    }
  }, [text]);

  const scramble = () => {
    tweenRef.current?.kill();

    const progress = { value: 0 };
    tweenRef.current = gsap.to(progress, {
      value: text.length,
      duration: (text.length / 3) * (30 / 100), // roughly matches original timing
      ease: "none",
      onUpdate: () => {
        const iteration = progress.value;
        setDisplay(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return SCRAMBLE_CHARS[
                Math.floor(Math.random() * SCRAMBLE_CHARS.length)
              ];
            })
            .join(""),
        );
      },
    });
  };

  const reset = () => {
    tweenRef.current?.kill();
    setDisplay(text);
  };

  return {
    spanRef,
    scramble,
    reset,
    width,
    display,
  };
}

export default useScrambleText;
