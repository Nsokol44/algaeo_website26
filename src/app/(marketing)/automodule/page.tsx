import Link from "next/link";

export const metadata = { title: "AutoModule — On-Site Biology Production" };

export default function AutoModulePage() {
  return (
    <div className="container-x max-w-4xl py-16">
      <p className="eyebrow">For High-Volume Operations</p>
      <h1>Produce Your Own Biology On-Site</h1>
      <p className="mt-4 text-lg text-algaeo-text-mid">
        The AutoModule is an on-site microbial production system that generates fresh, AI-calibrated
        consortia directly at your facility — eliminating shelf-life degradation and delivering living
        formula precision-matched to your crop and soil type.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["On-Site Production", "Installs at your facility and produces living consortia on demand — no shelf-life loss, no per-bottle markup. Fits 55-gallon drums or 275-gallon IBC totes."],
          ["AI-Calibrated Formulations", "Algorithms continuously calibrate your consortia to your specific growing conditions, crop history, and soil profile. Smarter every cycle."],
          ["Quarterly Nutrient Refeeds", "Every quarter, Algaeo ships a precision nutrient refeed pack calibrated to your crop cycle and grow data."],
        ].map(([t, d]) => (
          <div key={t} className="card p-6">
            <h4>{t}</h4>
            <p className="mt-2 text-sm text-algaeo-text-mid">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card bg-algaeo-green-pale p-8 text-center">
        <h3 className="font-display text-2xl">Commercial & wholesale pricing available</h3>
        <p className="mt-2 text-algaeo-text-mid">Co-op volume agreements welcome.</p>
        <Link href="/contact" className="btn-primary mt-4">Request Pre-Order Info →</Link>
      </div>
    </div>
  );
}
