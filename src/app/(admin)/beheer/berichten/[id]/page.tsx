import { notFound } from "next/navigation";
import { requireAdmin, Shell, Card, Field, Check, Notice, btn, btnGhost, L10nHelp } from "../../ui";
import { savePost, deleteRow } from "../../actions";
import Uploader from "../../Uploader";
import { authors } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { id } = await params;
  const p = id === "nieuw" ? null : (await sb.from("posts").select("*").eq("id", id).maybeSingle()).data;
  if (id !== "nieuw" && !p) notFound();
  return (
    <Shell email={email} title={p ? "Bericht bewerken" : "Nieuw bericht"}>
      <Notice sp={await searchParams} />
      <form action={savePost} className="grid gap-6">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <Card className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-forest" htmlFor="kind">Soort</label>
            <select id="kind" name="kind" defaultValue={p?.kind ?? "news"} className="w-full rounded-xl border border-line bg-white px-3 py-2.5">
              <option value="news">Nieuws</option><option value="project">Project</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-forest" htmlFor="author">Auteur</label>
            <select id="author" name="author" defaultValue={p?.author ?? "plant-e"} className="w-full rounded-xl border border-line bg-white px-3 py-2.5">
              {Object.entries(authors).map(([k, a]) => <option key={k} value={k}>{a.name}</option>)}
            </select>
          </div>
          <Field label="Datum" name="date" type="date" defaultValue={p?.date ?? new Date().toISOString().slice(0, 10)} />
          <Field label="Webadres (slug)" name="slug" defaultValue={p?.slug} hint="Leeg laten om automatisch te maken uit de titel" />
          <Field label="Labels" name="tags" defaultValue={(p?.tags ?? []).join(", ")} hint="Gescheiden door komma's, bijv. Sensor, Samenwerkingen" />
          <div className="sm:col-span-2">
            <Field label="Uitgelichte afbeelding (URL)" name="image" defaultValue={p?.image} />
            <div className="mt-2"><Uploader target="image" /></div>
          </div>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <Check label="Gepubliceerd" name="published" defaultChecked={p?.published ?? true} />
            <Check label="Ook tonen bij Nieuws" name="is_news" defaultChecked={p?.is_news ?? true} />
          </div>
        </Card>
        <div className="grid gap-6 xl:grid-cols-2">
          {(["nl", "en"] as const).map((l) => (
            <Card key={l} className="grid gap-4">
              <h2 className="font-display text-lg font-extrabold text-forest">{l === "nl" ? "Nederlands" : "Engels"}</h2>
              <Field label="Titel" name={`title_${l}`} defaultValue={p?.title?.[l]} />
              <Field label="Korte samenvatting" name={`excerpt_${l}`} rows={3} defaultValue={p?.excerpt?.[l]} />
              <Field label="Tekst" name={`body_${l}`} rows={18} defaultValue={p?.body?.[l]} hint={L10nHelp} />
              <div><Uploader target={`body_${l}`} append /></div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-stone">Een taal leeg laten? Dan tonen we de andere taal.</p>
        <div className="flex flex-wrap gap-3"><button className={btn}>Opslaan</button></div>
      </form>
      {p && (
        <form action={deleteRow} className="mt-8">
          <input type="hidden" name="table" value="posts" /><input type="hidden" name="id" value={p.id} />
          <button className={`${btnGhost} text-red-700`}>Bericht verwijderen</button>
        </form>
      )}
    </Shell>
  );
}
