"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { saveProduct, type ProductInput } from "@/app/dashboard/actions";
import { ImageUploader } from "@/components/dashboard/ImageUploader";

const CATEGORY_OPTIONS = [
  "Biofertilizer", "Row Crops & Forage", "Turf & Pasture", "Vegetables & Fruit",
  "Hydroponics", "Hardware", "Aquarium & Reef",
];

export function ProductEditor({ initial }: { initial?: Partial<ProductInput> }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "0");
  const [sku, setSku] = useState(initial?.sku ?? "");
  const [shortDesc, setShortDesc] = useState(initial?.short_description ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [categories, setCategories] = useState<string[]>(initial?.categories ?? []);
  const [inStock, setInStock] = useState(initial?.in_stock ?? true);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function toggleCat(c: string) {
    setCategories((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
  }

  function submit() {
    if (!title.trim()) return setError("A title is required.");
    const priceNum = parseFloat(price);
    if (Number.isNaN(priceNum) || priceNum < 0) return setError("Enter a valid price (0 or more).");
    setError(null);
    start(async () => {
      const res = await saveProduct({
        id: initial?.id,
        title,
        slug,
        short_description: shortDesc,
        description,
        price: priceNum,
        sku,
        in_stock: inStock,
        categories,
        image_url: imageUrl,
        featured,
      });
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl">{initial?.id ? "Edit Product" : "New Product"}</h1>
        <button onClick={submit} disabled={pending} className="btn-primary disabled:opacity-50">
          {pending ? "Saving…" : "Save Product"}
        </button>
      </div>

      {error && <p className="mb-4 rounded-btn bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4">
        <Field label="Title" value={title} onChange={setTitle} placeholder="GrowForce Biofertilizer — 12-Strain Liquid" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Slug (optional)" value={slug} onChange={setSlug} placeholder="auto-from-title" />
          <Field label="Price (USD)" value={price} onChange={setPrice} placeholder="20.00" />
          <Field label="SKU" value={sku} onChange={setSku} placeholder="ALG-GROW-BIO" />
        </div>
        <Field label="Short description" value={shortDesc} onChange={setShortDesc} placeholder="Shown in cards and listings." />

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
            Long description (Markdown)
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full rounded-card border border-algaeo-border p-4 font-mono text-sm focus:border-algaeo-green-mid focus:outline-none"
          />
        </label>

        <ImageUploader
          bucket="product-images"
          currentUrl={imageUrl || null}
          onUploaded={setImageUrl}
          label="Product photo"
        />

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">Categories</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => toggleCat(c)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  categories.includes(c)
                    ? "border-algaeo-green-dark bg-algaeo-green-dark text-white"
                    : "border-algaeo-border bg-white text-algaeo-text-mid"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
            In stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured
          </label>
        </div>
      </div>

      <Link href="/dashboard/products" className="mt-6 inline-block text-sm text-algaeo-text-light underline">
        ← Cancel
      </Link>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-btn border border-algaeo-border px-3 py-2.5 text-sm focus:border-algaeo-green-mid focus:outline-none"
      />
    </label>
  );
}
