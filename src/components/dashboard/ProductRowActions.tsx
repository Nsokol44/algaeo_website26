"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProduct } from "@/app/dashboard/actions";

export function ProductRowActions({ id, slug }: { id: string; slug: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex shrink-0 items-center gap-3 text-sm">
      <Link href={`/shop/${slug}`} className="text-algaeo-text-light hover:text-algaeo-green-dark">View</Link>
      <Link href={`/dashboard/products/${id}`} className="text-algaeo-green-dark hover:underline">Edit</Link>
      <button
        disabled={pending}
        onClick={() => { if (confirm("Delete this product?")) start(async () => { await deleteProduct(id); }); }}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
