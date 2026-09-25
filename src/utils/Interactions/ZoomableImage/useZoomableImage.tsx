import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function useZoomableImage(zoomScale: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Plain object tweened by GSAP; never touches React state.
  const origin = useRef({ x: 50, y: 50 });

  const quickOx = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickOy = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickScaleX = useRef<gsap.QuickToFunc | undefined>(undefined);
  const quickScaleY = useRef<gsap.QuickToFunc | undefined>(undefined);

  const applyOrigin = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.style.transformOrigin = `${origin.current.x}% ${origin.current.y}%`;
  }, []);

  useGSAP(
    () => {
      // next/image's ref forwarding is inconsistent across versions, so grab
      // the real <img> node from the DOM instead of trusting a passed-in ref.
      const imgEl = containerRef.current?.querySelector("img");
      if (!imgEl) return;
      imgRef.current = imgEl;

      quickOx.current = gsap.quickTo(origin.current, "x", {
        duration: 0.35,
        ease: "power3.out",
        onUpdate: applyOrigin,
      });
      quickOy.current = gsap.quickTo(origin.current, "y", {
        duration: 0.35,
        ease: "power3.out",
        onUpdate: applyOrigin,
      });
      quickScaleX.current = gsap.quickTo(imgEl, "scaleX", {
        duration: 0.35,
        ease: "power3.out",
      });
      quickScaleY.current = gsap.quickTo(imgEl, "scaleY", {
        duration: 0.35,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const updateOriginFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.min(
        100,
        Math.max(0, ((clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.min(
        100,
        Math.max(0, ((clientY - rect.top) / rect.height) * 100),
      );
      quickOx.current?.(x);
      quickOy.current?.(y);
    },
    [],
  );

  const setZoomed = useCallback(
    (zoomed: boolean) => {
      setIsZoomed(zoomed);
      const target = zoomed ? zoomScale : 1;
      quickScaleX.current?.(target);
      quickScaleY.current?.(target);
    },
    [zoomScale],
  );

  // --- Desktop: hover to zoom, follow cursor ---
  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    updateOriginFromPoint(e.clientX, e.clientY);
    if (!isZoomed) setZoomed(true);
  };

  const handleMouseLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    setZoomed(false);
    quickOx.current?.(50);
    quickOy.current?.(50);
  };

  // --- Mobile: tap to toggle zoom, drag to pan while zoomed ---
  const handleTouchStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") return;
    updateOriginFromPoint(e.clientX, e.clientY);
    setZoomed(!isZoomed);
  };

  const handleTouchMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch" || !isZoomed) return;
    updateOriginFromPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    handleTouchMove(e);
  };

  return {
    containerRef,
    imgRef,
    isZoomed,
    handlePointerMove,
    handleTouchStart,
    handleMouseLeave,
  };
}

export default useZoomableImage;
