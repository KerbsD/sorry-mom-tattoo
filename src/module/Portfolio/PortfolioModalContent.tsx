"use client";

import Image from "next/image";
import { anton } from "@/utils/Fonts";
import { PortfolioImage } from "@/constants/Portfolio/Images";

export interface PortfolioModalContentProps {
  tattoo: PortfolioImage | null;
}

function PortfolioModalContent({ tattoo }: PortfolioModalContentProps) {
  if (!tattoo) return null;

  return (
    <>
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
    </>
  );
}

export default PortfolioModalContent;
