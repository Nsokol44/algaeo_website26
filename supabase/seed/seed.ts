/** Seeds the Supabase project with Algaeo's launch blog content.
 *  Run: npm run seed   (safe to re-run — upserts on slug) */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const supabase = createClient(url, key);

function readJson(name: string) {
  return JSON.parse(readFileSync(join(__dirname, name), "utf-8"));
}

async function main() {
  const posts = readJson("posts.json");

  console.log(`Seeding ${posts.length} posts…`);
  const { error } = await supabase.from("posts").upsert(
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
  if (error) throw error;

  console.log("✓ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
