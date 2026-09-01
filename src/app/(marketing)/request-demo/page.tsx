import { ContactForm } from "@/components/layout/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Request a Demo",
  description: "See Algaeo's formulation recommendations against your own soil and crop data.",
};

export default function RequestDemoPage() {
  return (
    <div className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Request a Demo</p>
          <h1>See it against your own fields.</h1>
          <p className="mt-4 text-algaeo-text-mid">
            We&apos;ll walk through a live recommendation using real soil and crop data from your
            operation — no slide deck, just the actual output your agronomists would get.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Based In</dt>
              <dd className="text-algaeo-text-mid">{siteConfig.locationLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Email</dt>
              <dd className="text-algaeo-text-mid">{siteConfig.supportEmail}</dd>
            </div>
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Sales Motion</dt>
              <dd className="text-algaeo-text-mid">
                Direct outreach and demo, not self-serve — pricing is tailored to your operation.
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm initialTopic="demo-request" />
      </div>
    </div>
  );
}
