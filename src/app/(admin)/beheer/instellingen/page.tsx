import { requireAdmin, Shell, Card, Field, Notice, btn } from "../ui";
import { saveShipping } from "../actions";
import { getShipping } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Settings({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { email } = await requireAdmin();
  const sp = await searchParams;
  const ship = await getShipping();
  return (
    <Shell email={email} title="Instellingen">
      <Notice sp={sp} />
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
      </div>
    </Shell>
  );
}
