import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/shop/AddToCart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card flex flex-col overflow-hidden transition-shadow hover:shadow-a-md">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square bg-algaeo-green-pale">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-20">🌿</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">
          {product.categories[0]}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg leading-snug hover:text-algaeo-green-dark">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-algaeo-text-mid">{product.short_description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-algaeo-green-dark">
            {product.price === 0 ? "Free" : formatPrice(product.price)}
          </span>
        </div>
        <div className="mt-3">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
