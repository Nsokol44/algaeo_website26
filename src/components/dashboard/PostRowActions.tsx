"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deletePost, togglePublish } from "@/app/dashboard/actions";
import type { PostStatus } from "@/lib/types";

export function PostRowActions({
  id, slug, status,
}: {
  id: string; slug: string; status: PostStatus;
}) {
  const [pending, start] = useTransition();

  return (
    <div className="flex shrink-0 items-center gap-3 text-sm">
      {status === "published" && (
        <Link href={`/blog/${slug}`} className="text-algaeo-text-light hover:text-algaeo-green-dark">
          View
        </Link>
      )}
      <Link href={`/dashboard/posts/${id}`} className="text-algaeo-green-dark hover:underline">
        Edit
      </Link>
      <button
        disabled={pending}
        onClick={() => start(async () => { await togglePublish(id, status === "published" ? "draft" : "published"); })}
        className="text-algaeo-text-mid hover:text-algaeo-green-dark disabled:opacity-50"
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        disabled={pending}
        onClick={() => { if (confirm("Delete this article? This cannot be undone.")) start(async () => { await deletePost(id); }); }}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
