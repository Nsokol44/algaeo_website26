import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { title: post.title, description: post.excerpt ?? undefined, type: "article" },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author ?? "Algaeo" },
    publisher: { "@type": "Organization", name: "Algaeo" },
  };

  return (
    <article className="container-x max-w-3xl py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/blog" className="text-sm text-algaeo-green-dark hover:underline">
        ← Back to all articles
      </Link>

      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">
          {post.category}
        </p>
        <h1 className="mt-3">{post.title}</h1>
        <p className="mt-4 text-sm text-algaeo-text-light">
          {formatDate(post.published_at)} · {post.author}
        </p>
      </header>

      <div className="my-8 aspect-[16/8] rounded-card bg-algaeo-green-pale" />

      <div className="prose-algaeo">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-12 rounded-card bg-algaeo-green-pale p-8 text-center">
        <h3 className="font-display text-2xl">Ready to put this biology to work?</h3>
        <p className="mt-2 text-algaeo-text-mid">
          Claim a free 100 mL trial sample — you only pay $4.99 shipping.
        </p>
        <Link href="/shop/algaeo-free-trial-growforce" className="btn-primary mt-4">
          Claim Free Sample →
        </Link>
      </div>
    </article>
  );
}
