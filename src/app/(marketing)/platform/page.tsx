import Link from "next/link";
import { HOW_IT_WORKS_STEPS } from "@/lib/platform";

export const metadata = {
  title: "Platform",
  description: "How Algaeo's digital-twin formulation model turns soil, crop, and field data into blend recommendations.",
};

export default function PlatformPage() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">The Platform</p>
        <h1>What a Digital Twin Actually Does With Your Data</h1>
        <p className="mt-4 text-algaeo-text-mid">
          &quot;Digital twin&quot; gets used loosely in ag-tech. Here&apos;s specifically what goes in,
          what happens to it, and what comes out.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-4">
        {HOW_IT_WORKS_STEPS.map((s) => (
          <div key={s.n} className="card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-algaeo-green-pale font-display text-lg text-algaeo-green-dark">
              {s.n}
            </div>
            <h4 className="mt-4">{s.title}</h4>
            <p className="mt-2 text-sm text-algaeo-text-mid">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <div className="prose-algaeo">
          <h2>What Goes In</h2>
          <p>
            Three categories of input drive a recommendation: soil type and test results (texture,
            organic matter, existing nutrient levels), crop type and target yield, and field-specific
            data where available (past application history, irrigation, regional climate norms). The
            model doesn&apos;t need all of it to produce a recommendation, but accuracy improves as
            more real field data is supplied instead of defaults.
          </p>

          <h2>What Happens In Between</h2>
          <p>
            The model cross-references that input against formulation logic built on established
            agronomic relationships — nutrient availability curves by soil type, crop-specific uptake
            patterns, and microbial dosing thresholds — rather than a single fixed recipe applied to
            every field. Two fields with the same crop but different soil texture and organic matter
            get different recommendations, because they need different things.
          </p>

          <h2>What Comes Out</h2>
          <p>
            A specific blend recommendation: ratios, application rate, timing, and microbial dosing
            guidance where relevant — something a co-op agronomist can act on directly, or adjust based
            on what they know about a specific grower&apos;s field that the model doesn&apos;t have.
          </p>

          <h2>What Doesn&apos;t Change</h2>
          <p>
            Your co-op still does the physical blending, still holds the fertilizer registration
            required in your state, and still distributes product exactly the way it does today. Algaeo
            sits upstream of all of that, as an independent input into the recommendation — not a link
            in the supply chain.
          </p>
        </div>

        <div className="mt-10 rounded-card bg-algaeo-green-pale p-8 text-center">
          <h3 className="font-display text-2xl">See it against your own fields</h3>
          <p className="mt-2 text-algaeo-text-mid">
            We&apos;ll walk through a live recommendation using real soil and crop data from your operation.
          </p>
          <Link href="/request-demo" className="btn-primary mt-4">Request a Demo →</Link>
        </div>
      </div>
    </div>
  );
}
