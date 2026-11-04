import Link from "next/link";
import { requireAdmin, Shell, Card, Notice, btn } from "../ui";

export const dynamic = "force-dynamic";

export default async function Jobs({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { data } = await sb.from("jobs").select("id,title,published,date").order("date", { ascending: false });
  return (
    <Shell email={email} title="Vacatures" action={<Link href="/beheer/vacatures/nieuw" className={btn}>Nieuwe vacature</Link>}>
      <Notice sp={await searchParams} />
      {(data ?? []).length === 0 ? <Card><p className="text-stone">Geen vacatures. Op de website staat dan: &quot;We hebben op dit moment geen openstaande vacatures.&quot;</p></Card> : (
        <Card className="p-0 sm:p-0">
          <ul className="divide-y divide-line">
            {(data ?? []).map((j) => (
              <li key={j.id}><Link href={`/beheer/vacatures/${j.id}`} className="flex items-center gap-3 px-5 py-4 hover:bg-mist">
                <span className="flex-1 font-semibold text-forest">{j.title?.nl}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${j.published ? "bg-mist text-forest" : "bg-amber-100 text-amber-800"}`}>{j.published ? "Online" : "Offline"}</span>
              </Link></li>
            ))}
          </ul>
        </Card>
      )}
    </Shell>
  );
}
