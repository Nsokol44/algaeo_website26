import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export const metadata = { title: "News & Lab Notes" };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="container-x py-14">
      <header className="mb-10">
        <p className="eyebrow">From the Lab Bench</p>
        <h1>News &amp; Lab Notes</h1>
        <p className="mt-3 max-w-2xl text-algaeo-text-mid">
          Agronomy deep-dives, trial data updates, and application guides — written for growers and
          agronomists who want to understand what&apos;s happening below the surface.
        </p>
      </header>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="card group mb-10 grid overflow-hidden md:grid-cols-2"
        >
          <div className="aspect-[16/10] bg-algaeo-green-pale md:aspect-auto" />
          <div className="p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">
              {featured.category} · Featured
            </p>
            <h2 className="mt-3 group-hover:text-algaeo-green-dark">{featured.title}</h2>
            <p className="mt-3 text-algaeo-text-mid">{featured.excerpt}</p>
            <p className="mt-4 text-xs text-algaeo-text-light">{formatDate(featured.published_at)}</p>
          </div>
        </Link>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden transition-shadow hover:shadow-a-md">
            <div className="aspect-[16/9] bg-algaeo-green-pale" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">{p.category}</p>
              <h3 className="mt-2 font-display text-lg leading-snug group-hover:text-algaeo-green-dark">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-algaeo-text-mid">{p.excerpt}</p>
              <p className="mt-3 text-xs text-algaeo-text-light">{formatDate(p.published_at)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
