import { ContactForm } from "@/components/layout/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Talk to the Algaeo team about the platform, pricing, or a demo.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Get in Touch</p>
          <h1>Let&apos;s talk about your operation.</h1>
          <p className="mt-4 text-algaeo-text-mid">
            Whether you&apos;re a single-location co-op or a multi-site commercial blender, we&apos;ll
            help you figure out where an independent formulation model fits into how you already work.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Based In</dt>
              <dd className="text-algaeo-text-mid">Knoxville, TN · ORNL / Innovation Crossroads Partner</dd>
            </div>
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Email</dt>
              <dd className="text-algaeo-text-mid">hello@algaeo.com</dd>
            </div>
          </dl>
        </div>

        <ContactForm initialTopic={topic} />
      </div>
    </div>
  );
}
