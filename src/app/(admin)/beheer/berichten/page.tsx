import Link from "next/link";
import { requireAdmin, Shell, Card, Notice, btn } from "../ui";

export const dynamic = "force-dynamic";

export default async function Posts({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { data } = await sb.from("posts").select("id,slug,kind,date,title,published").order("date", { ascending: false });
  return (
    <Shell email={email} title="Nieuws & projecten" action={<Link href="/beheer/berichten/nieuw" className={btn}>Nieuw bericht</Link>}>
      <Notice sp={await searchParams} />
      <Card className="p-0 sm:p-0">
        <ul className="divide-y divide-line">
          {(data ?? []).map((p) => (
            <li key={p.id}>
              <Link href={`/beheer/berichten/${p.id}`} className="flex flex-wrap items-center gap-3 px-5 py-4 hover:bg-mist">
                <span className="min-w-0 flex-1 font-semibold text-forest">{p.title?.nl || p.title?.en}</span>
                <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-bold text-forest">{p.kind === "project" ? "Project" : "Nieuws"}</span>
                {!p.published && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">Concept</span>}
                <span className="text-sm text-stone">{p.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}
