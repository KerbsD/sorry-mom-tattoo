"use client";

import { useEffect, useRef } from "react";

function HomeTeaserVid() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return; // poster only

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // autoplay can be blocked; poster stays
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-10 w-full">
      <video
        ref={videoRef}
        className="aspect-2/3 h-auto w-full object-cover grayscale sm:aspect-video"
        poster="/video/studio-teaser-poster.jpg"
        preload="metadata"
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/studio-teaser.webm" type="video/webm" />
        <source src="/video/studio-teaser.mp4" type="video/mp4" />
      </video>
    </section>
  );
}

export default HomeTeaserVid;
