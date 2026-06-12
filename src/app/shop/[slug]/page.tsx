import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/shop/AddToCart";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.short_description ?? undefined };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="container-x py-14">
      <nav className="mb-6 text-sm text-algaeo-text-light">
        <Link href="/shop" className="hover:text-algaeo-green-dark">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square rounded-card bg-algaeo-green-pale" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">
            {product.categories.join(" · ")}
          </p>
          <h1 className="mt-2">{product.title}</h1>
          <p className="mt-4 font-display text-3xl text-algaeo-green-dark">
            {product.price === 0 ? "Free — just pay shipping" : formatPrice(product.price)}
          </p>
          <p className="mt-4 text-algaeo-text-mid">{product.short_description}</p>

          {product.description && <div className="prose-algaeo mt-6">{product.description}</div>}

          <div className="mt-8 max-w-xs">
            <AddToCart product={product} />
          </div>

          <ul className="mt-6 space-y-2 text-sm text-algaeo-text-mid">
            <li>✓ Ships live from Knoxville, TN within 2 business days</li>
            <li>
              ✓ {product.in_stock ? "In stock" : "Currently out of stock"}
              {product.sku ? ` · SKU ${product.sku}` : ""}
            </li>
            <li>✓ Free shipping on orders over $75</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
