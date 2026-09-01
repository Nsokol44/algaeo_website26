"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PostStatus } from "@/lib/types";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/** Ensures the caller is a signed-in admin; returns the Supabase client. */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) throw new Error("Not authorized — admin access required.");
  return supabase;
}

export interface PostInput {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  category: string;
  content: string;
  status: PostStatus;
}

export async function savePost(input: PostInput) {
  const supabase = await requireAdmin();
  const slug = input.slug?.trim() || slugify(input.title);
  const publishedAt =
    input.status === "published" ? new Date().toISOString() : null;

  if (input.id) {
    const { error } = await supabase
      .from("posts")
      .update({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        category: input.category,
        content: input.content,
        status: input.status,
        ...(input.status === "published" ? { published_at: publishedAt } : {}),
      })
      .eq("id", input.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("posts").insert({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      category: input.category,
      content: input.content,
      status: input.status,
      published_at: publishedAt,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deletePost(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/blog");
  revalidatePath("/dashboard");
}

export async function togglePublish(id: string, next: PostStatus) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("posts")
    .update({
      status: next,
      ...(next === "published" ? { published_at: new Date().toISOString() } : {}),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/blog");
  revalidatePath("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
