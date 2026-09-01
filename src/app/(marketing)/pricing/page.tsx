import Link from "next/link";
import { PRICING_TIERS } from "@/lib/platform";

export const metadata = {
  title: "Pricing",
  description: "Algaeo subscription pricing for co-ops and commercial blenders.",
};

export default function PricingPage() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Pricing</p>
        <h1>Built for How Co-Ops Actually Buy Software</h1>
        <p className="mt-4 text-algaeo-text-mid">
          Every tier is sold through a short demo, not a self-serve checkout — pricing depends on
          locations, seats, and how you want this to fit into your existing workflow.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`card flex flex-col p-6 ${tier.highlighted ? "border-2 border-algaeo-green-dark" : ""}`}
          >
            {tier.highlighted && (
              <span className="mb-3 inline-block w-fit rounded-full bg-algaeo-green-dark px-3 py-1 text-xs font-semibold text-white">
                Most Common
              </span>
            )}
            <h3 className="font-display text-2xl">{tier.name}</h3>
            <p className="mt-1 text-sm font-semibold text-algaeo-green-dark">{tier.price}</p>
            <p className="text-xs uppercase tracking-wide text-algaeo-text-light">{tier.priceNote}</p>
            <p className="mt-4 text-sm text-algaeo-text-mid">{tier.description}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-algaeo-green-light">✓</span>
                  <span className="text-algaeo-text-mid">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/request-demo"
              className={tier.highlighted ? "btn-primary mt-6 justify-center" : "btn-outline mt-6 justify-center"}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-algaeo-text-light">
        All tiers are subscription software only — Algaeo doesn&apos;t manufacture, blend, or ship any
        physical product, and your co-op keeps its existing fertilizer registration and distribution
        exactly as-is.
      </p>
    </div>
  );
}
