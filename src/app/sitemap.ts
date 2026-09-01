import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/platform", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/request-demo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.7 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${baseUrl}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  try {
    const supabase = createPublicClient();
    const { data: posts } = await supabase.from("posts").select("slug, updated_at").eq("status", "published");
    for (const post of posts ?? []) {
      entries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at ?? undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // DB unreachable at build time — still return the static entries above
    // rather than failing the whole sitemap route.
  }

  return entries;
}
