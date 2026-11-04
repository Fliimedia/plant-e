import { requireAdmin, Shell, Card } from "../ui";
import { setOrderStatus } from "../actions";
import { formatPrice } from "@/lib/markdown";

export const dynamic = "force-dynamic";

type Addr = { line1?: string; line2?: string; postal_code?: string; city?: string; country?: string } | null;
const addr = (a: Addr) => a ? [a.line1, a.line2, `${a.postal_code ?? ""} ${a.city ?? ""}`, a.country].filter((x) => x && x.trim()).join(", ") : "";

export default async function Orders() {
  const { email, sb } = await requireAdmin();
  const { data } = await sb.from("orders").select("*").order("created_at", { ascending: false }).limit(200);
  return (
    <Shell email={email} title="Bestellingen">
      <p className="mb-4 text-sm text-stone">Betalingen, terugbetalingen en facturen beheer je in het Stripe-dashboard. Hier zie je wat er verstuurd of opgehaald moet worden.</p>
      <div className="grid gap-4">
        {(data ?? []).length === 0 && <Card><p className="text-stone">Nog geen bestellingen.</p></Card>}
        {(data ?? []).map((o) => (
          <Card key={o.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-forest">{o.name} <span className="font-normal text-stone">({o.email}{o.phone ? `, ${o.phone}` : ""})</span></p>
                <p className="text-sm text-stone">{new Date(o.created_at).toLocaleString("nl-NL")} • {o.pickup ? "Ophalen in Renkum" : addr(o.shipping?.address)}</p>
              </div>
              <p className="font-display text-xl font-extrabold text-forest">{formatPrice(o.amount_total ?? 0, "nl")}</p>
            </div>
            <ul className="mt-3 text-sm text-forest">{(o.items ?? []).map((i: { name: string; qty: number }, n: number) => <li key={n}>{i.qty}x {i.name}</li>)}</ul>
            <form action={setOrderStatus} className="mt-4 flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={o.id} />
              <select name="fulfilment" defaultValue={o.fulfilment ?? "new"} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
                <option value="new">Nieuw</option><option value="processing">In behandeling</option><option value="done">Verzonden / opgehaald</option>
              </select>
              <button className="rounded-full border border-line px-4 py-2 text-sm font-bold text-forest hover:bg-mist">Bijwerken</button>
              {o.status !== "paid" && <span className="text-sm font-bold text-amber-700">Betaalstatus: {o.status}</span>}
            </form>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
