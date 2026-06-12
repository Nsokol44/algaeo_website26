"use client";

import { useState } from "react";
import Link from "next/link";

// Recommendation engine ported from the original theme's main.js.
type Rec = {
  name: string;
  reasoning: string;
  url: string;
  microbes: { name: string; role: string }[];
};

const DEFAULT_REC: Rec = {
  name: "GrowForce Biofertilizer — 12-Strain Professional Microbial Liquid",
  reasoning:
    "Our flagship biostimulant introduces a synergistic community of live algae and beneficial microbes to enhance soil vitality and nutrient cycling.",
  url: "/shop/growforce-biofertilizer-12-strain-professional-microbial-liquid",
  microbes: [
    { name: "Chlorella vulgaris", role: "Photosynthetic producer; secretes metabolites that promote root growth." },
    { name: "Azospirillum brasilense", role: "Fixes nitrogen and produces plant growth hormones." },
    { name: "Bacillus subtilis", role: "Improves stress tolerance and nutrient mobilization." },
  ],
};

function recommend(soil: string, crop: string, problem: string): Rec {
  if (soil === "clay" && crop === "tomatoes")
    return {
      name: "Live Chlorella — Freshwater Microalgae Culture",
      reasoning:
        "Clay soils often trap phosphorus. A Chlorella-based culture boosts bioavailability and supports fruiting through Bacillus and Microbacterium synergy.",
      url: "/shop/live-chlorella-freshwater-microalgae-culture",
      microbes: [
        { name: "Bacillus subtilis", role: "Phosphate solubilizer; protects roots from stress and pathogens." },
        { name: "Chlorella vulgaris", role: "Produces oxygen and organic carbon to fuel microbial growth." },
      ],
    };
  if (soil === "sandy" && problem === "drying_soil")
    return {
      name: "Live Nannochloropsis — Premium Phytoplankton Culture",
      reasoning:
        "Sandy soils lose water rapidly. Nannochloropsis with fungal and bacterial partners improves soil aggregation and water retention.",
      url: "/shop/live-nannochloropsis-premium-reef-phytoplankton-culture",
      microbes: [
        { name: "Mycorrhizal fungi", role: "Enhances root surface area and water uptake." },
        { name: "Scenedesmus sp.", role: "Produces biofilms that help retain soil moisture." },
      ],
    };
  if (crop === "leafy_greens" && problem === "yellow_leaves")
    return {
      name: "GrowForce Biofertilizer (Nitrogen Boost)",
      reasoning:
        "Yellowing leaves signal nitrogen deficiency. Nitrogen-fixing microbes restore color, vigor, and chlorophyll production.",
      url: "/shop/growforce-biofertilizer-12-strain-professional-microbial-liquid",
      microbes: [
        { name: "Azospirillum brasilense", role: "Nitrogen fixer and plant hormone producer." },
        { name: "Rhizobium spp.", role: "Enhances nitrogen assimilation and growth rate." },
      ],
    };
  if (soil === "hydroponic")
    return {
      name: "Live Scenedesmus — High-Density Freshwater Culture",
      reasoning:
        "Hydroponic ecosystems depend on microbial harmony. This culture rejuvenates your biofilm and nutrient balance with key symbiotic microbes.",
      url: "/shop/live-scenedesmus-high-density-freshwater-culture",
      microbes: [
        { name: "Chlorella vulgaris", role: "Enhances dissolved oxygen and nutrient cycling." },
        { name: "Variovorax paradoxus", role: "Stimulates algal and bacterial growth through IAA signaling." },
      ],
    };
  return DEFAULT_REC;
}

const SOILS: [string, string][] = [
  ["", "Select system type…"], ["clay", "Clay Soil — heavy, water-retentive"],
  ["sandy", "Sandy Soil — light, fast-draining"], ["loam", "Loam — balanced and rich"],
  ["hydroponic", "Hydroponic / NFT / DWC"], ["raised_bed", "Raised Beds / Containers"],
  ["pasture", "Pasture / Rangeland"],
];
const CROPS: [string, string][] = [
  ["", "Select crop type…"], ["corn", "Corn / Sweet Corn"], ["beans", "Soybeans / Legumes"],
  ["fescue", "Tall Fescue / Turf Grass"], ["forage", "Forage / Cover Crops / Hay"],
  ["tomatoes", "Tomatoes / Peppers / Cucumbers"], ["leafy_greens", "Leafy Greens"],
  ["hemp", "Hemp / Cannabis"], ["herbs", "Herbs & Specialty Botanicals"],
];
const PROBLEMS: [string, string][] = [
  ["", "Select an issue…"], ["high_n", "High synthetic N / fertilizer costs"],
  ["establishment", "Poor or uneven stand establishment"], ["yellow_leaves", "Yellowing leaves / deficiency"],
  ["low_yield", "Low yield or undersized harvest"], ["disease_pressure", "Disease pressure or root rot"],
  ["drying_soil", "Soil dries out too fast"], ["soil_health", "Long-term soil health / organic matter"],
];

export function BlendFinder() {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [problem, setProblem] = useState("");
  const [rec, setRec] = useState<Rec | null>(null);

  return (
    <section className="bg-algaeo-green-pale py-20">
      <div className="container-x max-w-4xl">
        <p className="eyebrow text-center">Crop-Specific Blend Finder</p>
        <h2 className="text-center">Which GrowForce Blend Is Right for Your Operation?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-algaeo-text-mid">
          Answer three questions. We&apos;ll match you with the right formulation for your crop and
          biggest challenge.
        </p>

        <div className="card mt-8 grid gap-4 p-6 md:grid-cols-3">
          <Select label="Your Growing System" value={soil} onChange={setSoil} options={SOILS} />
          <Select label="Primary Crop" value={crop} onChange={setCrop} options={CROPS} />
          <Select label="Biggest Challenge" value={problem} onChange={setProblem} options={PROBLEMS} />
        </div>

        <div className="mt-5 text-center">
          <button onClick={() => setRec(recommend(soil, crop, problem))} className="btn-primary">
            Find My Blend →
          </button>
        </div>

        {rec && (
          <div className="card mt-6 p-6">
            <p className="eyebrow">Recommended Product</p>
            <h3 className="font-display text-2xl">{rec.name}</h3>
            <p className="mt-2 text-algaeo-text-mid">
              <strong className="text-algaeo-text-dark">Why:</strong> {rec.reasoning}
            </p>
            <h4 className="mt-4 font-semibold">Key strains</h4>
            <ul className="mt-2 space-y-1 text-sm text-algaeo-text-mid">
              {rec.microbes.map((m) => (
                <li key={m.name}>
                  <strong className="text-algaeo-text-dark">{m.name}</strong> — {m.role}
                </li>
              ))}
            </ul>
            <Link href={rec.url} className="btn-primary mt-5">
              View Product →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-algaeo-text-light">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-btn border border-algaeo-border bg-white px-3 py-2.5 text-sm focus:border-algaeo-green-mid focus:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );
}
