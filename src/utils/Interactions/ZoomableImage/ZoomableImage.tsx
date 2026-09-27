"use client";

import Image from "next/image";
import { ZoomableImageProps } from "@/types/portfolio";
import useZoomableImage from "./useZoomableImage";

/**
 * Image that zooms on interaction, animated with GSAP:
 * - Desktop (mouse): hover to zoom, image tracks the cursor as the zoom origin.
 * - Mobile (touch): tap to toggle zoom centered on the tap point; drag to pan while zoomed.
 */
function ZoomableImage({
  src,
  alt,
  className = "",
  zoomScale = 2.5,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ZoomableImageProps) {
  const {
    containerRef,
    isZoomed,
    handlePointerMove,
    handleTouchStart,
    handleMouseLeave,
  } = useZoomableImage(zoomScale);

  return (
    <div
      ref={containerRef}
      className={`relative touch-none overflow-hidden ${
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      } ${className}`}
      onPointerMove={handlePointerMove}
      onPointerDown={handleTouchStart}
      onPointerLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      />
    </div>
  );
}

export default ZoomableImage;
