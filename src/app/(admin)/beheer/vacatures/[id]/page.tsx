import { notFound } from "next/navigation";
import { requireAdmin, Shell, Card, Field, Check, Notice, btn, btnGhost, L10nHelp } from "../../ui";
import { saveJob, deleteRow } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditJob({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
  const { email, sb } = await requireAdmin();
  const { id } = await params;
  const j = id === "nieuw" ? null : (await sb.from("jobs").select("*").eq("id", id).maybeSingle()).data;
  if (id !== "nieuw" && !j) notFound();
  return (
    <Shell email={email} title={j ? "Vacature bewerken" : "Nieuwe vacature"}>
      <Notice sp={await searchParams} />
      <form action={saveJob} className="grid gap-6">
        <input type="hidden" name="id" value={j?.id ?? ""} />
        <Card className="grid gap-4 sm:grid-cols-2">
          <Field label="Locatie" name="location" defaultValue={j?.location ?? "Renkum"} />
          <Field label="Uren" name="hours" defaultValue={j?.hours} />
          <Field label="Datum" name="date" type="date" defaultValue={j?.date ?? new Date().toISOString().slice(0, 10)} />
          <Field label="Webadres (slug)" name="slug" defaultValue={j?.slug} />
          <Check label="Online" name="published" defaultChecked={j?.published ?? true} />
        </Card>
        <div className="grid gap-6 xl:grid-cols-2">
          {(["nl", "en"] as const).map((l) => (
            <Card key={l} className="grid gap-4">
              <h2 className="font-display text-lg font-extrabold text-forest">{l === "nl" ? "Nederlands" : "Engels"}</h2>
              <Field label="Functietitel" name={`title_${l}`} defaultValue={j?.title?.[l]} required={l === "nl"} />
              <Field label="Omschrijving" name={`body_${l}`} rows={14} defaultValue={j?.body?.[l]} hint={L10nHelp} />
            </Card>
          ))}
        </div>
        <div><button className={btn}>Opslaan</button></div>
      </form>
      {j && (
        <form action={deleteRow} className="mt-8">
          <input type="hidden" name="table" value="jobs" /><input type="hidden" name="id" value={j.id} />
          <button className={`${btnGhost} text-red-700`}>Vacature verwijderen</button>
        </form>
      )}
    </Shell>
  );
}
