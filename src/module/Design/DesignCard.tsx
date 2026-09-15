// Design/DesignCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ArrowUpRight } from "lucide-react";
import { Design } from "@/constants/Design/Designs";

interface DesignCardProps {
  design: Design;
}

function DesignCard({ design }: DesignCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="design-card flex flex-col rounded-lg">
      {/* Badge + favorite */}
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-teal-500 px-3 py-1 text-xs font-semibold text-teal-600">
          FOR SALE
        </span>
        <button
          type="button"
          onClick={() => setIsFavorited((prev) => !prev)}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorited}
        >
          <Heart
            size={20}
            className={
              isFavorited
                ? "fill-white text-white"
                : "text-white/60 hover:text-white"
            }
          />
        </button>
      </div>

      {/* Illustration */}
      <div className="relative mt-4 aspect-square w-full">
        <Image
          src={design.image}
          alt={design.title}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain"
        />
      </div>

      {/* Title + description */}
      <h3 className="mt-4 text-lg font-bold text-white">{design.title}</h3>
      <p className="mt-2 min-h-25 text-sm text-white/70">
        {design.description}
      </p>

      {/* Metadata */}
      <div className="mt-4 space-y-1 text-sm text-white">
        <p>
          <span className="font-semibold">Style:</span> {design.style}
        </p>
        <p>
          <span className="font-semibold">Placement:</span> {design.placement}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="mt-6 flex items-center justify-center gap-2 rounded-md border-2 border-teal-400 px-4 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-400 hover:text-white"
      >
        AVAIL DESIGN
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}

export default DesignCard;
