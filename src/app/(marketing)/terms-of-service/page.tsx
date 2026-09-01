import { siteConfig } from "@/config/site";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Legal</p>
      <h1>Terms of Service</h1>
      <div className="prose-algaeo mt-8">
        <p>
          These terms govern your use of {siteConfig.url.replace(/^https?:\/\//, "")} and any Algaeo
          subscription. By requesting a demo, subscribing, or otherwise using this site, you agree to
          them.
        </p>

        <h2>What Algaeo is — and isn&apos;t</h2>
        <p>
          Algaeo is a subscription software product that generates fertilizer blend recommendations
          from soil type, crop type, and field data you provide. Algaeo does not manufacture, blend,
          sell, or ship any physical fertilizer, soil amendment, or other regulated substance. Your
          organization is solely responsible for any physical blending, distribution, and applicable
          state fertilizer registration.
        </p>

        <h2>Recommendations are guidance, not a guarantee</h2>
        <p>
          Formulation recommendations are generated from a model built on established agronomic
          relationships and the data you supply. They are guidance for your agronomists to evaluate and
          adjust, not a guarantee of yield or outcome in any specific field. Soil variability, weather,
          and application practices all affect real-world results.
        </p>

        <h2>Subscription & billing</h2>
        <p>
          Subscription pricing and terms are set out in your order form or service agreement. We
          reserve the right to change pricing for future billing periods with reasonable notice.
        </p>

        <h2>Your data</h2>
        <p>
          Soil, crop, and field data you submit remains yours. We use it only to generate your
          organization&apos;s recommendations — see our <a href="/privacy-policy">Privacy Policy</a>{" "}
          for details.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The underlying formulation model, platform, and all site content belong to Algaeo and may not
          be reproduced or reverse-engineered without permission.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Algaeo&apos;s liability for any claim related to the
          platform is limited to the amount paid for the applicable subscription period. We are not
          liable for indirect, incidental, or consequential damages, including lost crop yield or
          blending costs.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Tennessee.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <strong>{siteConfig.supportEmail}</strong>.
        </p>

        <p className="text-sm text-algaeo-text-light">This is a starter policy — have counsel review before launch.</p>
      </div>
    </div>
  );
}
