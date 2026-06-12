"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-14">
      <div className="card w-full max-w-sm p-8">
        <p className="eyebrow">Algaeo Admin</p>
        <h1 className="font-display text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-algaeo-text-mid">
          Access the dashboard to write and publish articles.
        </p>

        <div className="mt-6 space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button onClick={onSubmit} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-btn border border-algaeo-border px-3 py-2.5 text-sm focus:border-algaeo-green-mid focus:outline-none"
      />
    </label>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container-x py-14 text-center text-algaeo-text-mid">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
