import { createPublicClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

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
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}
