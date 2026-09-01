import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Demo Requests" };

const SOURCE_LABELS: Record<string, string> = {
  "demo-request": "Demo Request",
  pricing: "Pricing Question",
  contact: "General Contact",
};

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("id, name, email, org, message, source, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl">Demo Requests & Leads</h1>

      {!leads || leads.length === 0 ? (
        <p className="mt-6 text-algaeo-text-mid">No submissions yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-algaeo-text-dark">
                    {lead.name || "(no name)"} {lead.org && <span className="text-algaeo-text-mid">· {lead.org}</span>}
                  </p>
                  <a href={`mailto:${lead.email}`} className="text-sm text-algaeo-green-dark underline">
                    {lead.email}
                  </a>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-algaeo-green-pale px-2.5 py-1 text-xs font-medium text-algaeo-green-dark">
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </span>
                  <p className="mt-1 text-xs text-algaeo-text-light">{formatDate(lead.created_at)}</p>
                </div>
              </div>
              {lead.message && <p className="mt-3 text-sm text-algaeo-text-mid">{lead.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
