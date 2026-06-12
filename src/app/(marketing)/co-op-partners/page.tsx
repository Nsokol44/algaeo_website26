import Link from "next/link";

export const metadata = { title: "For Co-Ops & Distributors" };

export default function CoOpPage() {
  return (
    <div className="container-x max-w-4xl py-16">
      <p className="eyebrow">For Co-Ops & Distributors</p>
      <h1>A Biological Input Your Members Can Afford</h1>
      <p className="mt-4 text-lg text-algaeo-text-mid">
        GrowForce makes every pound of nitrogen work harder. At $2–5/acre blending cost, it&apos;s the
        lowest-barrier biological add-on in the market — designed to slot into the fertility programs
        your members already run.
      </p>

      <div className="mt-10 overflow-hidden rounded-card border border-algaeo-border">
        <table className="w-full text-sm">
          <thead className="bg-algaeo-off-white">
            <tr>
              <th className="p-3 text-left font-semibold"></th>
              <th className="p-3 text-left font-semibold">Urea Alone</th>
              <th className="p-3 text-left font-semibold text-algaeo-green-dark">Urea + GrowForce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-algaeo-border">
            {[
              ["Bound N in soil", "25–40% unavailable", "Microbially unlocked"],
              ["Root uptake surface", "Baseline", "+35–50%"],
              ["Moisture retention", "Baseline", "+57% observed"],
              ["Synthetic N required", "Full program", "Target 30% reduction"],
              ["Input cost exposure", "100% market-linked", "Partially decoupled"],
            ].map(([k, a, b]) => (
              <tr key={k}>
                <td className="p-3 font-medium">{k}</td>
                <td className="p-3 text-algaeo-text-mid">{a}</td>
                <td className="p-3 text-algaeo-green-dark">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 rounded-card bg-algaeo-green-dark p-8 text-center text-white">
        <h3 className="font-display text-2xl !text-white">500-Acre Pilot — $2–5/Acre</h3>
        <p className="mt-2 text-white/80">
          We provide product, protocol, and data analysis. Results co-branded and ready for your
          member presentations.
        </p>
        <Link href="/contact" className="btn-light mt-4">Request a Pilot Conversation →</Link>
      </div>
    </div>
  );
}
