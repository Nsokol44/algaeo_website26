import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { ProductRowActions } from "@/components/dashboard/ProductRowActions";

export default async function DashboardProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, title, slug, price, in_stock, categories, featured")
    .order("featured", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="mt-1 text-sm text-algaeo-text-mid">{products?.length ?? 0} products</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary">+ New Product</Link>
      </div>

      <div className="card divide-y divide-algaeo-border">
        {(products ?? []).map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {p.featured && (
                  <span className="rounded-full bg-algaeo-green-pale px-2 py-0.5 text-xs font-semibold text-algaeo-green-dark">
                    featured
                  </span>
                )}
                {!p.in_stock && (
                  <span className="rounded-full bg-algaeo-border px-2 py-0.5 text-xs font-semibold text-algaeo-text-mid">
                    out of stock
                  </span>
                )}
                <span className="truncate font-medium">{p.title}</span>
              </div>
              <p className="mt-1 text-xs text-algaeo-text-light">
                {formatPrice(p.price)} · {(p.categories ?? []).join(", ")}
              </p>
            </div>
            <ProductRowActions id={p.id} slug={p.slug} />
          </div>
        ))}
        {(products ?? []).length === 0 && (
          <p className="p-8 text-center text-algaeo-text-mid">
            No products yet. <Link href="/dashboard/products/new" className="text-algaeo-green-dark underline">Add one.</Link>
          </p>
        )}
      </div>
    </div>
  );
}
