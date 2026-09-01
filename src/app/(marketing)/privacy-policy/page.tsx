export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <div className="prose-algaeo mt-8">
        <p>
          Algaeo collects only the information needed to respond to demo requests and inquiries, and —
          for active subscribers — to operate the formulation platform itself: your name, email,
          organization, and the soil/crop/field data you submit to generate recommendations.
        </p>
        <h2>How we use your information</h2>
        <p>
          We use your contact details to follow up on demo requests and respond to messages submitted
          through our forms. For active subscribers, soil and field data you submit is used solely to
          generate your formulation recommendations and is not shared with other customers or third
          parties. Payment processing for active subscriptions is handled by a third-party processor;
          we never store full card numbers on our servers.
        </p>
        <h2>What we don&apos;t do</h2>
        <p>
          We don&apos;t sell your data, your field data, or your recommendation history. We don&apos;t
          share it with advertisers or with other co-ops/blenders on the platform. We use it to run the
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
