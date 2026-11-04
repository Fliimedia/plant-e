import Link from "next/link";
import { requireAdmin, Shell, Card, btnGhost } from "../ui";

export const dynamic = "force-dynamic";

const types: Record<string, string> = { contact: "Contact", brochure: "Brochure", newsletter: "Nieuwsbrief" };

export default async function Leads({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { email, sb } = await requireAdmin();
  const { type } = await searchParams;
  let q = sb.from("leads").select("*").order("created_at", { ascending: false }).limit(300);
  if (type && types[type]) q = q.eq("type", type);
  const { data } = await q;
  return (
    <Shell email={email} title="Aanvragen" action={<a href={`/beheer/aanvragen/export${type ? `?type=${type}` : ""}`} className={btnGhost}>Download CSV</a>}>
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <Link href="/beheer/aanvragen" className={`rounded-full px-4 py-1.5 font-bold ${!type ? "bg-forest text-white" : "bg-white text-forest"}`}>Alle</Link>
        {Object.entries(types).map(([k, v]) => <a key={k} href={`/beheer/aanvragen?type=${k}`} className={`rounded-full px-4 py-1.5 font-bold ${type === k ? "bg-forest text-white" : "bg-white text-forest"}`}>{v}</a>)}
      </div>
      <div className="grid gap-3">
        {(data ?? []).length === 0 && <Card><p className="text-stone">Nog geen aanvragen.</p></Card>}
        {(data ?? []).map((l) => (
          <Card key={l.id}>
            <div className="flex flex-wrap justify-between gap-2">
              <p className="font-bold text-forest">{l.name ?? l.email} <span className="font-normal text-stone">{l.company ? `• ${l.company}` : ""}</span></p>
              <p className="text-sm text-stone">{types[l.type]}{l.product ? `: ${l.product}` : ""} • {new Date(l.created_at).toLocaleString("nl-NL")}</p>
            </div>
            <p className="mt-1 text-sm"><a className="text-lime-dark underline" href={`mailto:${l.email}`}>{l.email}</a>{l.phone ? ` • ${l.phone}` : ""}</p>
            {l.message && <p className="mt-3 whitespace-pre-wrap text-[15px] text-ink">{l.message}</p>}
          </Card>
        ))}
      </div>
    </Shell>
  );
}
