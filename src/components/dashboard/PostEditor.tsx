"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost, type PostInput } from "@/app/dashboard/actions";

const CATEGORIES = [
  "Regenerative Agriculture", "Plant Health", "Farm Economics", "AgTech and Innovation",
  "Carbon Capture", "Algae Cultivation", "Marine Aquaculture", "Biofertilizer",
  "Global Trends and Economics",
];

export function PostEditor({ initial }: { initial?: Partial<PostInput> }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [content, setContent] = useState(initial?.content ?? "");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [pending, start] = useTransition();

  function submit(status: "draft" | "published") {
    if (!title.trim()) return setError("A title is required.");
    setError(null);
    start(async () => {
      const res = await savePost({ id: initial?.id, title, slug, excerpt, category, content, status });
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl">{initial?.id ? "Edit Article" : "New Article"}</h1>
        <div className="flex gap-2">
          <button onClick={() => submit("draft")} disabled={pending} className="btn-outline disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => submit("published")} disabled={pending} className="btn-primary disabled:opacity-50">
            {pending ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-btn bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="grid gap-4">
        <Field label="Title" value={title} onChange={setTitle} placeholder="How 12-strain microbes fix atmospheric nitrogen" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug (optional — auto-generated)" value={slug} onChange={setSlug} placeholder="auto-from-title" />
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-btn border border-algaeo-border px-3 py-2.5 text-sm focus:border-algaeo-green-mid focus:outline-none"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <Field label="Excerpt" value={excerpt} onChange={setExcerpt} placeholder="One or two sentences shown in listings and meta description." />

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
              Content (Markdown)
            </span>
            <div className="flex gap-1 text-xs">
              <TabBtn active={tab === "write"} onClick={() => setTab("write")}>Write</TabBtn>
              <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>Preview</TabBtn>
            </div>
          </div>
          {tab === "write" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              placeholder="## Heading&#10;&#10;Write your article in Markdown…"
              className="w-full rounded-card border border-algaeo-border p-4 font-mono text-sm leading-relaxed focus:border-algaeo-green-mid focus:outline-none"
            />
          ) : (
            <div className="prose-algaeo min-h-[400px] rounded-card border border-algaeo-border p-6">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              ) : (
                <p className="text-algaeo-text-light">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Link href="/dashboard" className="mt-6 inline-block text-sm text-algaeo-text-light underline">
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

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-3 py-1 ${active ? "bg-algaeo-green-dark text-white" : "bg-algaeo-green-pale text-algaeo-text-mid"}`}
    >
      {children}
    </button>
  );
}
