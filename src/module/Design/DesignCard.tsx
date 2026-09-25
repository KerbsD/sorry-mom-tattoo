// Design/DesignCard.tsx
"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { DesignCardProps } from "@/types/design";
import { useCart } from "@/context/CartContext";
import { toCartItem } from "@/constants/cart";

function DesignCard({ design }: DesignCardProps) {
  const { add, lines } = useCart();
  const inCart = lines.find((l) => l.key === `design:${design.id}`)?.qty ?? 0;

  return (
    <div className="design-card flex h-full flex-col rounded-lg">
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full border border-teal-400 px-3 py-1 text-xs font-semibold transition ${
            inCart > 0 ? "bg-teal-400 text-gray-900" : "text-teal-400"
          }`}
        >
          {inCart > 0 ? `${inCart} IN CART` : "FOR SALE"}
        </span>
      </div>

      <div className="relative mt-4 aspect-square w-full">
        <Image
          src={design.image}
          alt={design.title}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain"
          priority
        />
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">{design.title}</h3>
      <p className="mt-2 text-sm text-white/70">{design.description}</p>

      <div className="mt-auto">
        <div className="mt-4 space-y-1 text-sm text-white">
          <p>
            <span className="font-semibold">Style:</span> {design.style}
          </p>
          <p>
            <span className="font-semibold">Placement:</span> {design.placement}
          </p>
        </div>

        <button
          onClick={() => add(toCartItem.design(design))}
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border-2 border-teal-400 px-4 py-2.5 text-sm font-semibold text-teal-400 transition hover:bg-teal-400 hover:text-black"
        >
          {inCart > 0 ? `ADD ANOTHER` : "ADD TO CART"}
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DesignCard;
