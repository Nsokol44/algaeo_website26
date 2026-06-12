import Link from "next/link";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">About Algaeo</p>
      <h1>Biology that rebuilds soil — grown in Knoxville, TN.</h1>
      <div className="prose-algaeo mt-8">
        <p>
          Algaeo was founded on a simple premise: the most powerful agricultural input isn&apos;t
          another synthetic chemical — it&apos;s living biology. We engineer and grow a 12-strain
          microbial consortia that unlocks bound nutrients already present in the soil, fixes
          atmospheric nitrogen, and rebuilds the organic matter that decades of synthetic-only
          programs have depleted.
        </p>
        <h2>Built for the Southeast, priced for everyone</h2>
        <p>
          Most biologicals are priced out of reach for row-crop economics. We engineered GrowForce to
          blend into existing fertility programs at $2–5 per acre — the lowest-barrier biological
          add-on on the market — so co-op members can adopt it without re-tooling their operation.
        </p>
        <h2>Science you can verify</h2>
        <p>
          We publish our full formulation — every strain, every nutrient concentration — because
          transparency is how trust is earned in agriculture. As an ORNL / Innovation Crossroads
          partner, our work is grounded in peer-reviewed microbiology, not marketing claims.
        </p>
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/co-op-partners" className="btn-primary">For Co-Ops & Distributors</Link>
        <Link href="/shop" className="btn-outline">Browse Products</Link>
      </div>
    </div>
  );
}
