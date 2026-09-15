// components/Merch/MerchCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/Merch/Products";

interface MerchCardProps {
  product: Product;
}

function MerchCard({ product }: MerchCardProps) {
  return (
    <div className="merch-card z-10 flex max-w-75 flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain p-4"
        />
      </div>

      <h3 className="mt-3 text-left text-sm font-semibold text-white sm:text-base">
        {product.name}
      </h3>
      <p className="text-left text-xs text-white/60 sm:text-sm">
        PHP {product.price.toLocaleString()}.00
      </p>

      <Link
        href={`/merch/${product.slug}`}
        className="mt-3 flex items-center justify-center rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-teal-300"
      >
        View Product
      </Link>
    </div>
  );
}

export default MerchCard;
