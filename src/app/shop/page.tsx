import Link from "next/link";
import { getProducts, getCategories } from "@/lib/queries";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(category), getCategories()]);

  return (
    <div className="container-x py-14">
      <header className="mb-8">
        <p className="eyebrow">Shop</p>
        <h1>Live Biology, Sized for Every Operation</h1>
        <p className="mt-3 max-w-2xl text-algaeo-text-mid">
          From co-op blending programs to backyard raised beds — browse the full GrowForce line.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <Pill href="/shop" active={!category}>All</Pill>
        {categories.map((c) => (
          <Pill key={c} href={`/shop?category=${encodeURIComponent(c)}`} active={category === c}>
            {c}
          </Pill>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-algaeo-text-mid">No products in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-algaeo-green-dark bg-algaeo-green-dark text-white"
          : "border-algaeo-border bg-white text-algaeo-text-mid hover:border-algaeo-green-mid"
      }`}
    >
      {children}
    </Link>
  );
}
