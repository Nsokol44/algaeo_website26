import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="container-x grid gap-8 py-10 md:grid-cols-[200px_1fr]">
      <aside className="md:sticky md:top-24 md:self-start">
        <p className="eyebrow">Dashboard</p>
        <nav className="mt-2 flex flex-col gap-1 text-sm">
          <Link href="/dashboard" className="rounded px-3 py-2 hover:bg-algaeo-green-pale">
            All Articles
          </Link>
          <Link href="/dashboard/posts/new" className="rounded px-3 py-2 hover:bg-algaeo-green-pale">
            + New Article
          </Link>
          <Link href="/dashboard/products" className="mt-2 rounded px-3 py-2 hover:bg-algaeo-green-pale">
            Products
          </Link>
          <Link href="/dashboard/products/new" className="rounded px-3 py-2 hover:bg-algaeo-green-pale">
            + New Product
          </Link>
          <Link href="/blog" className="mt-2 rounded px-3 py-2 text-algaeo-text-mid hover:bg-algaeo-green-pale">
            View live blog ↗
          </Link>
        </nav>
        <form action={signOut} className="mt-6">
          <button className="text-sm text-algaeo-text-light underline hover:text-algaeo-green-dark">
            Sign out
          </button>
        </form>
        <p className="mt-4 text-xs text-algaeo-text-light">{user.email}</p>
      </aside>

      <section>{children}</section>
    </div>
  );
}
