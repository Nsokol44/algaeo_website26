"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  bucket: "product-images" | "post-images";
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  bucket,
  currentUrl,
  onUploaded,
  label = "Photo",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP, etc.).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large — max 10 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error ?? "Upload failed");
      }

      onUploaded(json.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentUrl ?? null);
    } finally {
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function removeImage() {
    setPreview(null);
    onUploaded("");
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
        {label}
      </span>

      {preview ? (
        <div className="relative inline-block">
          <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-card border border-algaeo-border bg-algaeo-green-pale">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                <span className="text-sm font-medium text-algaeo-text-mid">Uploading…</span>
              </div>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-outline text-xs disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={removeImage}
              disabled={uploading}
              className="rounded-btn border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          disabled={uploading}
          className={`flex h-36 w-full max-w-sm flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed transition-colors disabled:opacity-50 ${
            dragging
              ? "border-algaeo-green-mid bg-algaeo-green-pale"
              : "border-algaeo-border bg-white hover:border-algaeo-green-mid hover:bg-algaeo-green-pale"
          }`}
        >
          <UploadIcon />
          <span className="text-sm font-medium text-algaeo-text-mid">
            {uploading ? "Uploading…" : "Click or drag & drop"}
          </span>
          <span className="text-xs text-algaeo-text-light">JPG, PNG, WebP · max 10 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
      />

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-algaeo-text-light"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
