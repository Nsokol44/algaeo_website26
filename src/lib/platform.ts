// Single source of truth for the platform's process and pricing content.
// Replaces the old lib/biology.ts (strain lists, trial data) from when
// Algaeo sold a physical biofertilizer directly to consumers. As a B2B
// SaaS product, there's no formulation of Algaeo's own to describe —
// the "product" is the recommendation engine itself.

export const HOW_IT_WORKS_STEPS: { n: string; title: string; body: string }[] = [
  { n: "1", title: "Enter Field Data", body: "Soil type and test results, crop type, target yield, and any application history you have on file." },
  { n: "2", title: "The Model Runs", body: "Soil/crop/field data is cross-referenced against formulation logic built on established agronomic relationships — not a single fixed recipe." },
  { n: "3", title: "Get a Recommendation", body: "Specific blend ratios, application rate, timing, and microbial dosing guidance — something an agronomist can act on or adjust directly." },
  { n: "4", title: "Your Co-Op Blends & Ships", body: "Physical blending and distribution stay exactly where they are today, under your existing fertilizer registration." },
];

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
      "Microbial dosing guidance included",
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
