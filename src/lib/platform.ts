// Single source of truth for the platform's process and pricing content.
// Replaces the old lib/biology.ts (strain lists, trial data) from when
// Algaeo sold a physical biofertilizer directly to consumers. As a B2B
// SaaS product, there's no formulation of Algaeo's own to describe —
// the "product" is the recommendation engine itself.

export const HOW_IT_WORKS_STEPS: { n: string; title: string; body: string }[] = [
  { n: "1", title: "Enter Field Data", body: "Soil type and test results, crop type, target yield, and any application history you have on file." },
  { n: "2", title: "The Model Runs", body: "Soil/crop/field data is cross-referenced against formulation logic built on established agronomic relationships — not a single fixed recipe." },
  { n: "3", title: "Get a Recommendation", body: "Specific blend ratios, application rates, and timing your agronomist can act on or adjust directly. Microbial dosing guidance is available as an optional module." },
  { n: "4", title: "Your Co-Op Blends & Ships", body: "Physical blending and distribution stay exactly where they are today, under your existing fertilizer registration." },
];

export const PILOT = {
  title: "Start with a paid pilot",
  intro:
    "Before you commit to a subscription, run Algaeo on your own fields at one or two locations for a few months. Your agronomists stay in the loop, and we agree in writing on how success is measured before we start.",
  measured: [
    "Cost per unit of nutrient, compared with your current recommendation",
    "Agronomist time spent per recommendation",
    "Share of recommendations your team actually blends and applies",
  ],
  terms: [
    "Paid and scoped to one or two locations",
    "Success measures agreed in writing up front",
    "A short results summary you can share with your board",
  ],
  lookingFor:
    "We're looking for a small number of Southeast co-ops and commercial blenders to pilot with.",
  cta: "Ask About a Pilot",
  href: "/contact?topic=pilot",
};

export interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "Contact for pricing",
    priceNote: "Single location",
    description: "For a single co-op location getting started with independent formulation recommendations.",
    features: [
      "Unlimited recommendations for one location",
      "Soil type, crop type & field data inputs",
      "Blend ratio, application rate & timing output",
      "Email support",
    ],
    cta: "Request a Demo",
  },
  {
    name: "Co-Op",
    price: "Contact for pricing",
    priceNote: "Multi-location",
    description: "For co-ops and commercial blenders operating across multiple locations or serving multiple agronomists.",
    features: [
      "Everything in Starter",
      "Unlimited locations & agronomist seats",
      "Optional microbial dosing guidance",
      "Field-data history & recommendation tracking",
      "Priority support",
    ],
    cta: "Request a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact for pricing",
    priceNote: "API access",
    description: "For larger blenders and ag-retail networks who want the recommendation engine embedded directly in existing internal tools.",
    features: [
      "Everything in Co-Op",
      "Direct API access",
      "Custom integration support",
      "Dedicated onboarding",
    ],
    cta: "Talk to Sales",
  },
];
