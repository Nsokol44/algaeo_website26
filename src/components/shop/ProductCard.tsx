import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/shop/AddToCart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card flex flex-col overflow-hidden transition-shadow hover:shadow-a-md">
      <Link href={`/shop/${product.slug}`} className="block aspect-square bg-algaeo-green-pale" />
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
