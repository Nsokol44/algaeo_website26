import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";
import { HOW_IT_WORKS_STEPS, PRICING_TIERS } from "@/lib/platform";

export default async function HomePage() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="border-b border-algaeo-border bg-algaeo-green-pale/40">
        <div className="container-x py-24 text-center">
          <p className="eyebrow">For Co-Ops & Commercial Blenders</p>
          <h1 className="mx-auto max-w-4xl">
            Nutrient Formulations <em className="text-algaeo-green-dark">Optimized for Your Field.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-algaeo-text-mid">
            Algaeo turns soil type, crop type, and field data into specific fertilizer blend
            recommendations — independent of any manufacturer, so your agronomists get a genuine
            second opinion instead of advice tied to a sale.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/request-demo" className="btn-primary">Request a Demo →</Link>
            <Link href="/platform" className="btn-outline">See How It Works</Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Soil + Crop + Field Data In", "Blend Ratio + Dosing Out", "No Product to Sell", "Your Co-Op Keeps the Registration"].map((s) => (
              <span key={s} className="stat-pill">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Problem</p>
            <h2>The Advice and the Sale Come From the Same Place</h2>
            <p className="mt-4 text-algaeo-text-mid">
              Most co-op agronomists get formulation guidance from manufacturer reps — the same reps
              whose compensation depends on which product gets recommended. That&apos;s not a knock on
              any individual rep. It&apos;s a structural problem, and it doesn&apos;t go away by asking
              anyone to be more virtuous.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-algaeo-green-pale/40 py-20">
        <div className="container-x">
          <p className="eyebrow text-center">How It Works</p>
          <h2 className="text-center">Soil & Crop Data In, a Recommendation Out</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((s) => (
              <div key={s.n} className="card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-lg text-algaeo-green-dark">
                  {s.n}
                </div>
                <h4 className="mt-4">{s.title}</h4>
                <p className="mt-2 text-sm text-algaeo-text-mid">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-algaeo-text-mid">
            <Link href="/platform" className="font-semibold text-algaeo-green-dark underline">
              See the full platform breakdown →
            </Link>
          </p>
        </div>
      </section>

      {/* ── WHY THE REGISTRATION PROBLEM DISAPPEARS ──────────── */}
      <section className="py-20">
        <div className="container-x">
          <div className="card grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="eyebrow">Not a Regulated Substance</p>
              <h2>We Don&apos;t Manufacture, Blend, or Ship Anything.</h2>
              <p className="mt-4 text-algaeo-text-mid">
                Algaeo is software. Your co-op already holds the fertilizer registration required to
                blend and distribute product in your state — nothing about that changes. What changes
                is where the formulation recommendation comes from.
              </p>
              <Link href="/platform" className="btn-primary mt-6">Learn More →</Link>
            </div>
            <ul className="space-y-3 text-sm text-algaeo-text-mid">
              {[
                "No physical product ships from Algaeo to anyone",
                "Your existing blending & distribution operation stays exactly as-is",
                "An independent input alongside — or instead of — manufacturer guidance",
                "Built around your field's actual data, not a fixed recipe",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-algaeo-green-light">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ───────────────────────────────────── */}
      <section className="bg-algaeo-green-pale/40 py-20">
        <div className="container-x">
          <p className="eyebrow text-center">Pricing</p>
          <h2 className="text-center">Built for How Co-Ops Actually Buy Software</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`card p-6 ${tier.highlighted ? "border-2 border-algaeo-green-dark" : ""}`}
              >
                <h3 className="font-display text-xl">{tier.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-algaeo-text-light">{tier.priceNote}</p>
                <p className="mt-3 text-sm text-algaeo-text-mid">{tier.description}</p>
                <Link href="/pricing" className="mt-6 inline-block text-sm font-semibold text-algaeo-green-dark underline">
                  See full details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG FEED ────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-20">
          <div className="container-x">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="eyebrow">From the Blog</p>
                <h2>Notes on Independent Formulation</h2>
              </div>
              <Link href="/blog" className="hidden btn-outline sm:inline-flex">Read the Blog →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden transition-shadow hover:shadow-a-md">
                  <div className="aspect-[16/9] bg-algaeo-green-pale" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-algaeo-green-mid">
                      {p.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg leading-snug group-hover:text-algaeo-green-dark">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-algaeo-text-light">{formatDate(p.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
