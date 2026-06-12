import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductEditor } from "@/components/dashboard/ProductEditor";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: p } = await supabase.from("products").select("*").eq("id", id).single();
  if (!p) notFound();
  return (
    <ProductEditor
      initial={{
        id: p.id, title: p.title, slug: p.slug,
        short_description: p.short_description ?? "", description: p.description ?? "",
        price: Number(p.price), sku: p.sku ?? "", in_stock: p.in_stock,
        categories: p.categories ?? [], image_url: p.image_url ?? "", featured: p.featured,
      }}
    />
  );
}
