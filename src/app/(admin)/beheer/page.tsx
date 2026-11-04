import Link from "next/link";
import { requireAdmin, Shell, Card } from "./ui";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { email, sb } = await requireAdmin();
  const count = async (t: string, f?: (q: any) => any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let q = sb.from(t).select("*", { count: "exact", head: true });
    if (f) q = f(q);
    return (await q).count ?? 0;
  };
  const [posts, products, jobs, orders, leads] = await Promise.all([
    count("posts"), count("products", (q) => q.eq("active", true)), count("jobs", (q) => q.eq("published", true)),
    count("orders", (q) => q.neq("fulfilment", "done")), count("leads"),
  ]);
  const tiles = [
    ["/beheer/berichten", "Nieuws & projecten", posts], ["/beheer/producten", "Actieve producten", products],
    ["/beheer/vacatures", "Open vacatures", jobs], ["/beheer/bestellingen", "Open bestellingen", orders],
    ["/beheer/aanvragen", "Aanvragen", leads],
  ] as const;
  return (
    <Shell email={email} title="Overzicht">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(([to, label, n]) => (
          <Link key={to} href={to}><Card className="transition hover:border-lime-dark"><p className="text-sm text-stone">{label}</p><p className="mt-1 font-display text-4xl font-extrabold text-forest">{n}</p></Card></Link>
        ))}
      </div>
      {posts === 0 && (
        <Card className="mt-6"><p className="text-forest">De database is nog leeg. Ga naar <Link href="/beheer/instellingen" className="font-bold underline">Instellingen</Link> en importeer de content van de oude website.</p></Card>
      )}
    </Shell>
  );
}
