"use client";

import { useCart } from "@/store/cart";
import type { Product } from "@/lib/types";

export function AddToCart({ product, className }: { product: Product; className?: string }) {
  const add = useCart((s) => s.add);
  return (
    <button
      onClick={() =>
        add({
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
        })
      }
      disabled={!product.in_stock}
      className={className ?? "btn-primary w-full justify-center disabled:opacity-50"}
    >
      {product.in_stock ? (product.price === 0 ? "Claim Free Sample" : "Add to Cart") : "Out of Stock"}
    </button>
  );
}
