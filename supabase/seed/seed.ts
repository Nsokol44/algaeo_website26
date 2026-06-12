/**
 * Seed script — loads migrated WordPress content into Supabase.
 *
 *   1. Create a .env.local with NEXT_PUBLIC_SUPABASE_URL and
 *      SUPABASE_SERVICE_ROLE_KEY (the service-role key bypasses RLS).
 *   2. Run the SQL migration first (supabase/migrations/0001_init.sql).
 *   3. npm run seed
 *
 * Safe to re-run: rows are upserted on their unique `slug`.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

// ── Loud preflight so a project mismatch is impossible to miss ──────────────
const projectRef = url.replace("https://", "").split(".")[0];
console.log("─".repeat(60));
console.log("Seeding into Supabase project:");
console.log("   URL:  " + url);
console.log("   REF:  " + projectRef);
console.log("");
console.log("👉 Open your Supabase dashboard. The project ref in its URL");
console.log("   (https://supabase.com/dashboard/project/<REF>) MUST match");
console.log("   the REF above. If it doesn't, you are creating tables/users");
console.log("   in one project and seeding a different one.");
console.log("─".repeat(60));

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  db: { schema: "public" },
});

const here = dirname(fileURLToPath(import.meta.url));
const readJson = (f: string) => JSON.parse(readFileSync(resolve(here, f), "utf-8"));

async function main() {
  const products = readJson("products.json");
  const posts = readJson("posts.json");

  console.log(`Seeding ${products.length} products…`);
  const { error: pErr } = await supabase.from("products").upsert(
    products.map((p: Record<string, unknown>) => ({
      slug: p.slug,
      title: p.title,
      short_description: p.short_description,
      price: p.price,
      sku: p.sku,
      in_stock: p.in_stock,
      categories: p.categories,
      featured: p.slug === "growforce-biofertilizer-12-strain-professional-microbial-liquid",
    })),
    { onConflict: "slug" },
  );
  if (pErr) throw pErr;

  console.log(`Seeding ${posts.length} posts…`);
  const { error: postErr } = await supabase.from("posts").upsert(
    posts.map((p: Record<string, unknown>) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      author: p.author,
      status: p.status,
      published_at: p.published_at,
    })),
    { onConflict: "slug" },
  );
  if (postErr) throw postErr;

  console.log("✓ Seed complete.");
}

main().catch((e) => {
  console.error("✗ Seed failed:", e.message ?? e);
  process.exit(1);
});
