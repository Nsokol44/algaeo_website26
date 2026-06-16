import { ContactForm } from "@/components/layout/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Talk to the Algaeo team about products, co-op partnerships, or AutoModule pre-orders.",
};

export default function ContactPage() {
  return (
    <div className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Get in Touch</p>
          <h1>Let&apos;s talk about your operation.</h1>
          <p className="mt-4 text-algaeo-text-mid">
            Whether you run 5,000 acres or a backyard market garden, we&apos;ll help you find the right
            biology — and the right way to put it to work.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Lab & Shipping</dt>
              <dd className="text-algaeo-text-mid">Knoxville, TN · ORNL / Innovation Crossroads Partner</dd>
            </div>
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Email</dt>
              <dd className="text-algaeo-text-mid">algaeo@algaeo.io</dd>
            </div>
            <div>
              <dt className="font-semibold text-algaeo-text-dark">Co-Op Partnerships</dt>
              <dd className="text-algaeo-text-mid">
                Ask about our 500-acre pilot program — product, protocol, and data analysis included.
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
