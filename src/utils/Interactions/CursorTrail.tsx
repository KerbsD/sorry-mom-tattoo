// components/CursorTrail/CursorTrail.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SVGNS = "http://www.w3.org/2000/svg";
const EASE = 0.75;
const TOTAL = 100;

function CursorTrail() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const root = svgRef.current;
      if (!root) return;

      // Skip entirely on touch-only devices or when the OS prefers less motion
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!hasFinePointer || prefersReducedMotion) return;

      const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const onPointerMove = (e: PointerEvent) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      };
      window.addEventListener("pointermove", onPointerMove);

      type Segment = {
        line: SVGLineElement;
        pos: { x: number; y: number };
        leader: { x: number; y: number };
      };

      const segments: Segment[] = [];
      let leader: { x: number; y: number } = pointer;

      for (let i = 0; i < TOTAL; i++) {
        const line = document.createElementNS(SVGNS, "line") as SVGLineElement;
        root.appendChild(line);
        gsap.set(line, { opacity: (TOTAL - i) / TOTAL });

        const pos = { x: leader.x, y: leader.y };
        segments.push({ line, pos, leader });
        leader = pos;
      }

      function update() {
        for (const { line, pos, leader } of segments) {
          pos.x += (leader.x - pos.x) * EASE;
          pos.y += (leader.y - pos.y) * EASE;
          line.setAttribute("x1", String(pos.x));
          line.setAttribute("y1", String(pos.y));
          line.setAttribute("x2", String(leader.x));
          line.setAttribute("y2", String(leader.y));
        }
      }
      gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
        window.removeEventListener("pointermove", onPointerMove);
        segments.forEach(({ line }) => line.remove());
      };
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-9999 hidden h-screen w-screen sm:block"
      stroke="teal"
      strokeWidth={6}
    />
  );
}

export default CursorTrail;
