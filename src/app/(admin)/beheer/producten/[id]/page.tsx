import { notFound } from "next/navigation";
import { requireAdmin, Shell, Card, Field, Check, Notice, btn, btnGhost, L10nHelp } from "../../ui";
import { saveProduct, deleteRow } from "../../actions";
import Uploader from "../../Uploader";

export const dynamic = "force-dynamic";

export default async function EditProduct({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { id } = await params;
  const p = id === "nieuw" ? null : (await sb.from("products").select("*").eq("id", id).maybeSingle()).data;
  if (id !== "nieuw" && !p) notFound();
  return (
    <Shell email={email} title={p ? "Product bewerken" : "Nieuw product"}>
      <Notice sp={await searchParams} />
      <form action={saveProduct} className="grid gap-6">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <Card className="grid gap-4 sm:grid-cols-2">
          <Field label="Prijs in euro (incl. btw)" name="price" defaultValue={p ? (p.price_cents / 100).toFixed(2) : ""} required />
          <div>
            <label className="mb-1 block text-sm font-semibold text-forest" htmlFor="stock">Voorraad</label>
            <select id="stock" name="stock" defaultValue={p?.stock ?? "in_stock"} className="w-full rounded-xl border border-line bg-white px-3 py-2.5">
              <option value="in_stock">Op voorraad</option><option value="backorder">Op bestelling</option><option value="out_of_stock">Niet op voorraad (niet bestelbaar)</option>
            </select>
          </div>
          <Field label="Webadres (slug)" name="slug" defaultValue={p?.slug} hint="Leeg laten om automatisch te maken" />
          <Field label="Volgorde" name="sort" type="number" defaultValue={p?.sort ?? 0} />
          <div className="sm:col-span-2">
            <Field label="Afbeeldingen (een URL per regel, eerste is hoofdafbeelding)" name="images" rows={4} defaultValue={(p?.images ?? []).join("\n")} />
            <div className="mt-2"><Uploader target="images" append /></div>
          </div>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <Check label="@Home" name="cat_home" defaultChecked={p?.categories?.includes("home")} />
            <Check label="@Work" name="cat_work" defaultChecked={p?.categories?.includes("work")} />
            <Check label="@School" name="cat_school" defaultChecked={p?.categories?.includes("school")} />
            <Check label="Alleen ophalen in Renkum" name="pickup_only" defaultChecked={p?.pickup_only} />
            <Check label="Zichtbaar in de shop" name="active" defaultChecked={p?.active ?? true} />
          </div>
        </Card>
        <div className="grid gap-6 xl:grid-cols-2">
          {(["nl", "en"] as const).map((l) => (
            <Card key={l} className="grid gap-4">
              <h2 className="font-display text-lg font-extrabold text-forest">{l === "nl" ? "Nederlands" : "Engels"}</h2>
              <Field label="Naam" name={`title_${l}`} defaultValue={p?.title?.[l]} required={l === "nl"} />
              <Field label="Korte omschrijving" name={`short_${l}`} rows={4} defaultValue={p?.short?.[l]} />
              <Field label="Uitgebreide omschrijving" name={`body_${l}`} rows={12} defaultValue={p?.body?.[l]} hint={L10nHelp} />
            </Card>
          ))}
        </div>
        <div><button className={btn}>Opslaan</button></div>
      </form>
      {p && (
        <form action={deleteRow} className="mt-8">
          <input type="hidden" name="table" value="products" /><input type="hidden" name="id" value={p.id} />
          <button className={`${btnGhost} text-red-700`}>Product verwijderen</button>
        </form>
      )}
    </Shell>
  );
}
