import Link from "next/link";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">About Algaeo</p>
      <h1>Independent formulation intelligence — built in Knoxville, TN.</h1>
      <div className="prose-algaeo mt-8">
        <p>
          Algaeo started as a biological fertilizer company — a 12-strain microbial consortia sold
          direct to growers. Building that product meant building a genuinely differentiated asset
          along the way: a digital-twin model that takes soil type, crop type, and field data and
          generates specific, defensible formulation recommendations.
        </p>
        <p>
          We came to a simple conclusion: that model is the actual differentiated thing we&apos;d
          built — not the bottle. So we repositioned around it.
        </p>
        <h2>Why this is a software company now, not a fertilizer company</h2>
        <p>
          Co-op agronomists mostly get formulation guidance from manufacturer reps — advice tied
          structurally to a sale, however well-intentioned any individual rep is. An independent model,
          with no product of its own to sell, removes that conflict by design rather than by asking
          anyone to be more virtuous. We don&apos;t manufacture, blend, or ship anything; your co-op
          keeps its existing fertilizer registration and blending operation exactly as it is today.
        </p>
        <h2>Grounded in real agronomic science</h2>
        <p>
          Our formulation logic is built on established agronomic relationships — nutrient availability
          curves by soil type, crop-specific uptake patterns, microbial dosing thresholds — not a single
          fixed recipe applied to every field. As an ORNL / Innovation Crossroads partner, our work
          stays grounded in peer-reviewed microbiology and agronomy, not marketing claims.
        </p>
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/request-demo" className="btn-primary">Request a Demo</Link>
        <Link href="/platform" className="btn-outline">See the Platform</Link>
      </div>
    </div>
  );
}
