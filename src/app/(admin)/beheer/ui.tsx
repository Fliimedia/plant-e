import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAdmin, serviceClient, supabaseConfigured } from "@/lib/supabase";
import { logout } from "./actions";

export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/beheer/login");
  const email = await currentAdmin();
  if (!email) redirect("/beheer/login");
  return { email, sb: serviceClient()! };
}

const nav = [
  ["/beheer", "Overzicht"], ["/beheer/berichten", "Nieuws & projecten"], ["/beheer/producten", "Producten"],
  ["/beheer/vacatures", "Vacatures"], ["/beheer/bestellingen", "Bestellingen"], ["/beheer/aanvragen", "Aanvragen"],
  ["/beheer/instellingen", "Instellingen"],
];

export function Shell({ email, title, children, action }: { email: string; title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-forest p-4 text-white lg:min-h-screen lg:p-6">
        <div className="flex items-center justify-between lg:block">
          <Link href="/beheer" className="font-display text-xl font-extrabold">Plant-e <span className="text-lime">beheer</span></Link>
          <a href="/" target="_blank" className="text-sm text-white/60 lg:mt-1 lg:block">Bekijk site ↗</a>
        </div>
        <nav className="mt-4 flex gap-1 overflow-x-auto pb-1 lg:mt-8 lg:flex-col">
          {nav.map(([to, label]) => <Link key={to} href={to} className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">{label}</Link>)}
        </nav>
        <div className="mt-6 hidden border-t border-white/10 pt-4 text-xs text-white/50 lg:block">
          {email}
          <form action={logout}><button className="mt-2 font-semibold text-white/80 underline">Uitloggen</button></form>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-extrabold text-forest">{title}</h1>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}

export const field = "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-[15px] outline-none focus:border-lime-dark focus:ring-2 focus:ring-lime/40";
export const lbl = "mb-1 block text-sm font-semibold text-forest";
export const btn = "inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white hover:bg-moss";
export const btnGhost = "inline-flex items-center rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-forest hover:bg-mist";

export function Field({ label, name, defaultValue, type = "text", rows, hint, required }: { label: string; name: string; defaultValue?: string | number | null; type?: string; rows?: number; hint?: string; required?: boolean }) {
  return (
    <div>
      <label className={lbl} htmlFor={name}>{label}</label>
      {rows
        ? <textarea id={name} name={name} rows={rows} defaultValue={defaultValue ?? ""} className={`${field} font-mono text-sm`} required={required} />
        : <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} className={field} required={required} step={type === "number" ? "any" : undefined} />}
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
    </div>
  );
}

export function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-forest">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-forest" />{label}
    </label>
  );
}

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-line bg-white p-5 sm:p-6 ${className}`}>{children}</div>
);

export function Notice({ sp }: { sp: Record<string, string | undefined> }) {
  if (sp.fout) return <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">Opslaan mislukt: {sp.fout}</p>;
  if (sp.opgeslagen) return <p className="mb-4 rounded-xl bg-mist p-3 text-sm font-semibold text-forest">Opgeslagen. De website is bijgewerkt.</p>;
  return null;
}

export const L10nHelp = "Markdown: **vet**, *cursief*, ## kop, - lijst, [link](https://...), ![](afbeelding-url)";
