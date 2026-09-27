"use client";

import Image from "next/image";
import { formatPHP } from "@/utils/formatPhp";
import { useCart } from "@/context/CartContext";
import { toCartItem } from "@/constants/cart";

import type { MerchCardProps } from "@/types/merch";

function MerchCard({ product }: MerchCardProps) {
  const { add, lines } = useCart();
  const inCart = lines.find((l) => l.key === `merch:${product.id}`)?.qty ?? 0;

  return (
    <div className="merch-card z-10 flex max-w-75 flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain p-4"
          loading="eager"
        />

        {inCart > 0 && (
          <span className="absolute top-1 right-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-teal-400 px-1 text-xs font-bold text-black shadow transition">
            {inCart}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-left text-sm font-semibold text-white sm:text-base">
        {product.name}
      </h3>
      <strong className="text-left text-xs text-white/60 sm:text-sm">
        {formatPHP(product.price)}
      </strong>

      <button
        onClick={() => add(toCartItem.merch(product))}
        className="mt-3 flex items-center justify-center rounded-sm bg-teal-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-teal-300"
      >
        {inCart > 0 ? `Add another` : "Add to cart"}
      </button>
    </div>
  );
}

export default MerchCard;
