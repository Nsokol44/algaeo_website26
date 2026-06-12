import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import { PostRowActions } from "@/components/dashboard/PostRowActions";

export default async function DashboardHome() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, status, category, published_at, updated_at")
    .order("updated_at", { ascending: false });

  const published = posts?.filter((p) => p.status === "published").length ?? 0;
  const drafts = posts?.filter((p) => p.status === "draft").length ?? 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">All Articles</h1>
          <p className="mt-1 text-sm text-algaeo-text-mid">
            {published} published · {drafts} drafts
          </p>
        </div>
        <Link href="/dashboard/posts/new" className="btn-primary">+ New Article</Link>
      </div>

      <div className="card divide-y divide-algaeo-border">
        {(posts ?? []).map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    p.status === "published"
                      ? "bg-algaeo-green-pale text-algaeo-green-dark"
                      : "bg-algaeo-border text-algaeo-text-mid"
                  }`}
                >
                  {p.status}
                </span>
                <span className="truncate font-medium">{p.title}</span>
              </div>
              <p className="mt-1 text-xs text-algaeo-text-light">
                {p.category} · {p.status === "published" ? formatDate(p.published_at) : `edited ${formatDate(p.updated_at)}`}
              </p>
            </div>
            <PostRowActions id={p.id} slug={p.slug} status={p.status} />
          </div>
        ))}
        {(posts ?? []).length === 0 && (
          <p className="p-8 text-center text-algaeo-text-mid">
            No articles yet. <Link href="/dashboard/posts/new" className="text-algaeo-green-dark underline">Write your first one.</Link>
          </p>
        )}
      </div>
    </div>
  );
}
