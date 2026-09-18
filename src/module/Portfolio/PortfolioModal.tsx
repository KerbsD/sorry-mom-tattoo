"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { anton } from "@/utils/Fonts";
import { PortfolioImage } from "@/constants/Portfolio/Images";

import useAnimatePortfolioModal from "./useAnimatePortfolioModal";

export interface PortfolioModalProps {
  tattoo: PortfolioImage | null;
  isOpen: boolean;
  onClose: () => void;
}

function PortfolioModal({ tattoo, isOpen, onClose }: PortfolioModalProps) {
  const { overlayRef, panelRef } = useAnimatePortfolioModal({
    tattoo,
    isOpen,
    onClose,
  });

  if (!tattoo) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 hidden items-center justify-center overscroll-contain bg-black/70 backdrop-blur-sm"
      style={{ display: "none" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tattoo-modal-title"
      data-lenis-prevent
    >
      <div
        ref={panelRef}
        className="relative mx-4 flex h-120 w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-neutral-900 md:h-125 md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10   text-white/80 transition-colors hover:text-white"
          aria-label="Close modal"
        >
          <X size={28} />
        </button>

        {/* Image side */}
        <div className="relative h-64 w-full shrink-0 md:h-auto md:w-1/2">
          <Image
            src={tattoo.src}
            alt={tattoo.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Details side */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-6 text-white md:p-8">
          <h2 id="tattoo-modal-title" className={`text-3xl ${anton.className}`}>
            {tattoo.title}
          </h2>

          {tattoo.description && (
            <p className="text-sm leading-relaxed text-white/80">
              {tattoo.description}
            </p>
          )}

          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:mt-auto">
            {tattoo.artist && (
              <>
                <dt className="text-white/50">Artist</dt>
                <dd className="text-white">{tattoo.artist}</dd>
              </>
            )}
            {tattoo.duration && (
              <>
                <dt className="text-white/50">Session Length</dt>
                <dd className="text-white">{tattoo.duration}</dd>
              </>
            )}
            {tattoo.date && (
              <>
                <dt className="text-white/50">Date</dt>
                <dd className="text-white">{tattoo.date}</dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;
