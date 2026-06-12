"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/(marketing)/contact/actions";

const TOPICS = [
  { value: "contact", label: "General inquiry" },
  { value: "co-op", label: "Co-op / distributor partnership" },
  { value: "free-sample", label: "Free sample request" },
  { value: "automodule", label: "AutoModule pre-order" },
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [source, setSource] = useState("contact");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  function onSubmit() {
    setError(null);
    start(async () => {
      const res = await submitLead({ name, email, org, message, source });
      if (res?.error) setError(res.error);
      else setDone(true);
    });
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-algaeo-green-pale text-2xl text-algaeo-green-dark">
          ✓
        </div>
        <h3 className="mt-4 font-display text-2xl">Message received</h3>
        <p className="mt-2 text-algaeo-text-mid">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={name} onChange={setName} />
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Farm / Organization (optional)" value={org} onChange={setOrg} />
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
              Topic
            </span>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-btn border border-algaeo-border px-3 py-2.5 text-sm focus:border-algaeo-green-mid focus:outline-none"
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
            Message
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Tell us about your operation, acreage, and what you're hoping to achieve."
            className="w-full rounded-card border border-algaeo-border p-4 text-sm focus:border-algaeo-green-mid focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button onClick={onSubmit} disabled={pending} className="btn-primary w-full justify-center disabled:opacity-60">
          {pending ? "Sending…" : "Send Message"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
        {label}{required && <span className="text-algaeo-green-dark"> *</span>}
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
