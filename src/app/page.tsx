import Link from "next/link";
import Image from "next/image";
import { BlendFinder } from "@/components/home/BlendFinder";
import { getPublishedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export default async function HomePage() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-algaeo-border bg-algaeo-off-white">
        <div className="algae-orb left-[-10%] top-[-20%] h-96 w-96 bg-algaeo-green-light/40" />
        <div className="algae-orb right-[-5%] top-[20%] h-80 w-80 bg-algaeo-green-mid/30" style={{ animationDelay: "6s" }} />
        <div className="container-x relative py-24 text-center">
          <p className="eyebrow">Corn · Beans · Forage · Pasture · Hydroponics · Home Gardens</p>
          <h1 className="mx-auto max-w-4xl">
            Reduce Synthetic Nitrogen. <em className="text-algaeo-green-dark">Rebuild Soil Biology.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-algaeo-text-mid">
            GrowForce is a 12-strain live microbial consortia — proven to unlock bound nitrogen,
            solubilize phosphorus, and improve moisture retention at <strong>$2–5 per acre</strong>.
            Built for co-op blending programs and row crop operations across the Southeast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">Order GrowForce →</Link>
            <Link href="/co-op-partners" className="btn-outline">Co-Op Partnership Info</Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["12 Active Strains", "$2–5 Per Acre", "Lab Grown in Knoxville, TN", "18-Month Shelf Life · No Refrigeration"].map((s) => (
              <span key={s} className="stat-pill">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIAL DATA ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-x">
          <p className="eyebrow text-center">Tall Fescue Trial — TFG-Trial-1</p>
          <h2 className="text-center">The Numbers Speak for Themselves</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-algaeo-text-mid">
            28-day controlled establishment trial on <em>Festuca arundinacea</em>. Single inoculation
            at seeding. Knoxville, TN lab research.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat n="+20.5%" label="Root Penetration Depth" sub="15.1 cm → 18.2 cm vs. control" />
            <Stat n="+57.7%" label="Soil Moisture Retention" sub="Volumetric water content, Day 28" />
            <Stat n="+40.9%" label="Shoot Length at 28 Days" sub="10.5 cm → 14.8 cm mean" />
            <Stat n="+50%" label="Tiller Density" sub="30 → 45 count/cm² at canopy closure" />
          </div>
          <p className="mt-6 text-center text-xs text-algaeo-text-light">
            Proof-of-concept trial data. Field-scale validation available through our co-op pilot program.
          </p>
        </div>
      </section>

      {/* ── CO-OP VALUE ──────────────────────────────────────── */}
      <section className="bg-algaeo-green-dark py-20 text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-algaeo-green-light">For Co-Ops & Distributors</p>
            <h2 className="!text-white">A Biological Input Your Members Can Afford</h2>
            <p className="mt-4 text-white/80">
              GrowForce doesn&apos;t replace your members&apos; fertility program — it makes every pound
              of nitrogen work harder. At $2–5/acre blending cost, it&apos;s the lowest-barrier
              biological add-on in the market.
            </p>
            <Link href="/co-op-partners" className="btn-light mt-6">Explore Co-Op Partnership →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Lower Member Input Spend", "A 30% urea reduction at $500/ton ≈ $69/acre savings at 150 lb N/acre."],
              ["More Resilient Stands", "57% moisture retention means less irrigation stress and faster establishment."],
              ["Soil That Improves Each Season", "Living biology rebuilds organic matter — compounding value every year."],
              ["500-Acre Pilot — $2–5/Acre", "We provide product, protocol, and data analysis, co-branded for your members."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-card bg-white/10 p-5 backdrop-blur">
                <h4 className="!text-white">{t}</h4>
                <p className="mt-1 text-sm text-white/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-x">
          <p className="eyebrow text-center">Simple Ordering</p>
          <h2 className="text-center">Three Steps to Your First Order</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Step n="1" title="Find Your Product" body="Use the Blend Finder below or browse by crop type in our shop." />
            <Step n="2" title="Add to Cart & Checkout" body="Secure checkout — credit card, or invoice for commercial orders." />
            <Step n="3" title="Ships from Knoxville, TN" body="Live cultures shipped with insulated packaging. Most orders ship within 2 business days." />
          </div>
          <p className="mt-8 text-center text-sm text-algaeo-text-mid">
            ✓ No subscription required &nbsp; ✓ Wholesale invoicing available &nbsp; ✓ Free shipping over $75
          </p>
        </div>
      </section>

      {/* ── AUTOMODULE ───────────────────────────────────────── */}
      <section className="bg-algaeo-text-dark py-20 text-white">
        <div className="container-x">
          <p className="eyebrow !text-algaeo-green-light text-center">For High-Volume Operations</p>
          <h2 className="!text-white text-center">Produce Your Own Biology On-Site</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/75">
            The AutoModule is an on-site microbial production system that generates fresh,
            AI-calibrated consortia directly at your facility — eliminating shelf-life degradation.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["On-Site Production", "Produces living microbial consortia on demand — no shelf-life loss, no per-bottle markup. Fits 55-gallon drums or 275-gallon IBC totes."],
              ["AI-Calibrated Formulations", "Algorithms continuously calibrate your consortia to your growing conditions, crop history, and soil profile."],
              ["Quarterly Nutrient Refeeds", "Every quarter, Algaeo ships a precision nutrient refeed pack calibrated to your crop cycle and grow data."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-card border border-white/15 bg-white/5 p-6">
                <h4 className="!text-white">{t}</h4>
                <p className="mt-2 text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/automodule" className="btn-light">Learn More & Pre-Order →</Link>
          </div>
        </div>
      </section>

      {/* ── FREE SAMPLE ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-x">
          <div className="card grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="eyebrow">Limited Offer</p>
              <h2>Test Our Biology on Your Crop — <em className="text-algaeo-green-dark">On Us.</em></h2>
              <p className="mt-4 text-algaeo-text-mid">
                We&apos;ll send you a free 100 mL trial sample of our flagship microbial consortia.
                Apply it to a test plot or a few pots. You only pay $4.99 shipping.
              </p>
              <Link href="/shop/algaeo-free-trial-growforce" className="btn-primary mt-6">
                Claim My Free Sample →
              </Link>
            </div>
            <ul className="space-y-3 text-sm text-algaeo-text-mid">
              {[
                "100 mL live consortia — enough for a field test plot or multiple garden pots",
                "Compatible with hydroponic lines, in-soil drench, and foliar application",
                "No subscription, no commitment — verifiable results before any purchase",
                "Includes 15% off your first full order plus early AutoModule pre-order access",
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

      {/* ── BLEND FINDER ─────────────────────────────────────── */}
      <BlendFinder />

      {/* ── INGREDIENT TRANSPARENCY ──────────────────────────── */}
      <section className="py-20">
        <div className="container-x">
          <p className="eyebrow text-center">Full Transparency</p>
          <h2 className="text-center">Every Ingredient. Every Strain. Explained.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-algaeo-text-mid">
            Most biostimulant brands hide behind &quot;proprietary blends.&quot; We publish our full
            formulation — every nutrient concentration and every microbial strain.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-display text-xl">12-Strain Microbial Consortium</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {STRAINS.map(([name, role]) => (
                  <li key={name}>
                    <em className="font-semibold not-italic text-algaeo-text-dark">{name}</em>
                    <span className="text-algaeo-text-mid"> — {role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-xl">Precision Macronutrient Matrix</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {NUTRIENTS.map(([name, amt, role]) => (
                  <li key={name} className="flex justify-between gap-4">
                    <span>
                      <span className="font-semibold text-algaeo-text-dark">{name}</span>
                      <span className="block text-algaeo-text-mid">{role}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-algaeo-green-dark">{amt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG FEED ────────────────────────────────────────── */}
      <section className="bg-algaeo-off-white py-20">
        <div className="container-x">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">From the Lab Bench</p>
              <h2>Agronomy Deep-Dives & Trial Data</h2>
            </div>
            <Link href="/blog" className="hidden btn-outline sm:inline-flex">View All Articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden transition-shadow hover:shadow-a-md">
                <div className="relative aspect-[16/9] bg-algaeo-green-pale">
                  {p.cover_image ? (
                    <Image
                      src={p.cover_image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                </div>
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
    </>
  );
}

function Stat({ n, label, sub }: { n: string; label: string; sub: string }) {
  return (
    <div className="card p-6 text-center">
      <p className="font-display text-4xl text-algaeo-green-dark">{n}</p>
      <p className="mt-2 font-semibold">{label}</p>
      <p className="mt-1 text-xs text-algaeo-text-light">{sub}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="card p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-algaeo-green-pale font-display text-lg text-algaeo-green-dark">
        {n}
      </div>
      <h4 className="mt-4">{title}</h4>
      <p className="mt-2 text-sm text-algaeo-text-mid">{body}</p>
    </div>
  );
}

const STRAINS: [string, string][] = [
  ["Azospirillum brasilense", "Nitrogen fixer — converts atmospheric N₂ into plant-available ammonium."],
  ["Rhizobium sp.", "Nitrogen cycler — works with roots for efficient N absorption."],
  ["Pseudomonas sp.", "Phosphorus solubilizer — unlocks bound P so it stays bioavailable."],
  ["Bacillus subtilis", "Bio-fungicide — protects against root rot while promoting cell elongation."],
  ["Variovorax sp.", "Hormonal balancer — breaks down ACC stress hormone that stunts growth."],
  ["Arthrobacter sp.", "Environmental cleaner — degrades pollutants, revives depleted soils."],
  ["Flavobacterium sp.", "Nutrient mobilizer — moves minerals from soil into root hairs."],
  ["Microbacterium sp.", "Siderophore producer — chelates iron and delivers it to the plant."],
  ["Promicromonospora sp.", "Natural antibiotic producer — keeps the root zone pathogen-free."],
  ["Microalgae Complex", "Nannochloropsis, Scenedesmus & Chlorella — photosynthetic scaffolding."],
];

const NUTRIENTS: [string, string, string][] = [
  ["Nitrogen (NaNO₃)", "4.00 g/L", "Drives rapid vegetative growth."],
  ["Phosphorus (K₂HPO₄)", "0.60 g/L", "Powers ATP transfer and root/stem structure."],
  ["Potassium (K₂SO₄)", "1.20 g/L", "Regulates osmosis; co-delivers bioavailable sulfur."],
  ["Calcium (CaCl₂)", "0.30 g/L", "Builds rigid cell walls."],
  ["Magnesium (MgSO₄)", "0.50 g/L", "Central atom of chlorophyll."],
  ["Trace Metal Suite A5", "3.0 mL/L", "B, Mn, Zn, Mo, Cu, Fe — prevents metabolic bottlenecks."],
];
