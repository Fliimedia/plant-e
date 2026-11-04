import Link from "next/link";
import { requireAdmin, Shell, Card, Notice, btn } from "../ui";
import { formatPrice } from "@/lib/markdown";

export const dynamic = "force-dynamic";

const stock: Record<string, string> = { in_stock: "Op voorraad", out_of_stock: "Niet op voorraad", backorder: "Op bestelling" };

export default async function Products({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { data } = await sb.from("products").select("id,title,price_cents,stock,active,images").order("sort");
  return (
    <Shell email={email} title="Producten" action={<Link href="/beheer/producten/nieuw" className={btn}>Nieuw product</Link>}>
      <Notice sp={await searchParams} />
      <Card className="p-0 sm:p-0">
        <ul className="divide-y divide-line">
          {(data ?? []).map((p) => (
            <li key={p.id}>
              <Link href={`/beheer/producten/${p.id}`} className="flex flex-wrap items-center gap-3 px-5 py-4 hover:bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images?.[0]} alt="" className="h-12 w-12 rounded-lg bg-mist object-cover" />
                <span className="min-w-0 flex-1 font-semibold text-forest">{p.title?.nl}</span>
                {!p.active && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">Verborgen</span>}
                <span className="text-sm text-stone">{stock[p.stock]}</span>
                <span className="font-bold text-forest">{formatPrice(p.price_cents, "nl")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}
