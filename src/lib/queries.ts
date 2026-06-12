import { createPublicClient } from "@/lib/supabase/server";
import type { Post, Product } from "@/lib/types";

// All functions here are PUBLIC reads and use the cookieless client so they work
// at build time (static generation) as well as at request time. Each call is
// wrapped so a transient DB/network issue degrades to empty content instead of
// crashing a public storefront page.

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("posts").select("*").eq("slug", slug).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const supabase = createPublicClient();
    let query = supabase.from("products").select("*").order("featured", { ascending: false });
    if (category) query = query.contains("categories", [category]);
    const { data } = await query;
    return (data ?? []).filter((p) => p.price > 0 || p.slug.includes("free-trial"));
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("products").select("categories");
    const set = new Set<string>();
    (data ?? []).forEach((r) => r.categories?.forEach((c: string) => set.add(c)));
    return [...set].sort();
  } catch {
    return [];
  }
}
