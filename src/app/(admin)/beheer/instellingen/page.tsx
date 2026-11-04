import { requireAdmin, Shell, Card, Field, Notice, btn } from "../ui";
import { saveShipping, importSeed } from "../actions";
import { getShipping } from "@/lib/data";
import MediaMigrator from "./MediaMigrator";
import manifest from "../../../../../data/media-manifest.json";

export const dynamic = "force-dynamic";

export default async function Settings({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { email } = await requireAdmin();
  const sp = await searchParams;
  const ship = await getShipping();
  return (
    <Shell email={email} title="Instellingen">
      <Notice sp={sp} />
      {sp.import && <p className="mb-4 rounded-xl bg-mist p-3 text-sm font-semibold text-forest">Import klaar. Bestaande items zijn niet overschreven.</p>}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-extrabold text-forest">Verzendkosten</h2>
          <form action={saveShipping} className="mt-4 grid gap-4">
            <Field label="Nederland (euro, incl. btw)" name="nl" defaultValue={(ship.nlCents / 100).toFixed(2)} />
            <Field label="Buiten Nederland (euro, incl. btw)" name="eu" defaultValue={(ship.euCents / 100).toFixed(2)} />
            <Field label="Landen waarnaar we verzenden" name="countries" defaultValue={ship.countries.join(", ")} hint="Landcodes, bijv. NL, BE, DE" />
            <div><button className={btn}>Opslaan</button></div>
          </form>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-extrabold text-forest">Content van de oude website</h2>
          <p className="mt-2 text-sm text-stone">Zet alle nieuwsberichten, projecten en producten uit de WordPress-export in de database. Eenmalig; bestaande items blijven staan.</p>
          <form action={importSeed} className="mt-4"><button className={btn}>Importeer content</button></form>
          <h2 className="mt-8 font-display text-lg font-extrabold text-forest">Afbeeldingen en PDF&apos;s overzetten</h2>
          <p className="mt-2 text-sm text-stone">Kopieert alle {manifest.length} bestanden van de oude site naar de nieuwe opslag. Doe dit voordat de oude site offline gaat.</p>
          <div className="mt-4"><MediaMigrator paths={manifest} /></div>
        </Card>
      </div>
    </Shell>
  );
}
