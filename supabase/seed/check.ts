/** Prints which Supabase project the app is pointed at and whether it can see
 *  the tables. Run:  npm run check-db   */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(missing)";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
console.log("NEXT_PUBLIC_SUPABASE_URL =", url);
console.log("project ref             =", url.replace("https://", "").split(".")[0]);
console.log("service key present     =", key ? `yes (${key.length} chars)` : "NO");

if (url.startsWith("https://") && key) {
  const supabase = createClient(url, key);
  for (const t of ["products", "posts", "profiles"]) {
    const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
    console.log(`table ${t.padEnd(9)} →`, error ? `ERROR: ${error.message}` : `${count} rows`);
  }
}
