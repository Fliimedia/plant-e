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

const icons: Record<string, React.ReactNode> = {
  overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  posts: <><path d="M4 5.5h12v13a1.5 1.5 0 001.5 1.5H5.5A1.5 1.5 0 014 18.5v-13z" /><path d="M16 9h3.5v9.5a1.5 1.5 0 01-3 0" /><path d="M7 9h6M7 12.5h6M7 16h4" /></>,
  products: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></>,
  jobs: <><rect x="3.5" y="7" width="17" height="12.5" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3.5 12.5h17" /></>,
  orders: <><path d="M6 3.5h12v17l-2.5-1.5-2 1.5-1.5-1.5-1.5 1.5-2-1.5L6 20.5v-17z" /><path d="M9 8h6M9 11.5h6M9 15h3.5" /></>,
  leads: <><path d="M3.5 13.5l2.6-7.8A1.5 1.5 0 017.5 4.5h9a1.5 1.5 0 011.4 1.2l2.6 7.8V18a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 18v-4.5z" /><path d="M3.5 13.5h4.5l1.5 2.5h5l1.5-2.5h4.5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
};

const nav = [
  ["/beheer", "Overzicht", "overview"], ["/beheer/berichten", "Nieuws & projecten", "posts"], ["/beheer/producten", "Producten", "products"],
  ["/beheer/vacatures", "Vacatures", "jobs"], ["/beheer/bestellingen", "Bestellingen", "orders"], ["/beheer/aanvragen", "Aanvragen", "leads"],
  ["/beheer/instellingen", "Instellingen", "settings"],
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
          {nav.map(([to, label, icon]) => (
            <Link key={to} href={to} className="flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-lime" aria-hidden>{icons[icon]}</svg>
              {label}
            </Link>
          ))}
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
