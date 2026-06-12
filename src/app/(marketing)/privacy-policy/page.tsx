export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <div className="prose-algaeo mt-8">
        <p>
          Algaeo collects only the information needed to process your orders, fulfill sample requests,
          and respond to inquiries — your name, email, shipping address, and order history.
        </p>
        <h2>How we use your information</h2>
        <p>
          We use your details to ship products, send order confirmations, and reply to messages you
          send through our contact form. Payment processing is handled entirely by Stripe; we never
          store full card numbers on our servers.
        </p>
        <h2>What we don&apos;t do</h2>
        <p>
          We don&apos;t sell your data. We don&apos;t share it with advertisers. We use it to run the
          parts of Algaeo you actually asked us to run.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about your data? Email <strong>hello@algaeo.com</strong> and we&apos;ll help.
        </p>
        <p className="text-sm text-algaeo-text-light">This is a starter policy — have counsel review before launch.</p>
      </div>
    </div>
  );
}
