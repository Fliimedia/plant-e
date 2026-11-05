"use client";
import Link from "next/link";
import { useState } from "react";
import { href, type Locale } from "@/lib/routes";
import { ui } from "@/content/site";
import { track } from "@/lib/analytics";

const input = "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-lime-dark focus:ring-2 focus:ring-lime/40";
const label = "mb-1.5 block text-sm font-semibold text-forest";
const button = "inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 font-bold text-white transition hover:bg-moss disabled:opacity-60";

type State = "idle" | "busy" | "done" | "error";

async function post(body: Record<string, unknown>) {
  const res = await fetch("/api/forms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function useForm(type: string, extra: Record<string, string> = {}) {
  const [state, setState] = useState<State>("idle");
  const [started] = useState(() => Date.now());
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("busy");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await post({ type, ...extra, ...data, elapsed: Date.now() - started });
      setState("done");
      if (type === "newsletter") track("newsletter_signup", { form_type: type });
      else track("generate_lead", { lead_type: type, ...(extra.product ? { product: extra.product } : {}) });
    } catch { setState("error"); }
  };
  return { state, onSubmit };
}

const Honeypot = () => (
  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
);

export function ContactForm({ locale }: { locale: Locale }) {
  const f = ui.forms;
  const { state, onSubmit } = useForm("contact", { locale });
  if (state === "done") return <p className="rounded-2xl bg-mist p-6 font-semibold text-forest">{f.thanks[locale]}</p>;
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4">
      <Honeypot />
      <div><label className={label} htmlFor="c-name">{f.name[locale]}</label><input id="c-name" name="name" className={input} autoComplete="name" /></div>
      <div><label className={label} htmlFor="c-email">{f.email[locale]} *</label><input id="c-email" name="email" type="email" required className={input} autoComplete="email" /></div>
      <div><label className={label} htmlFor="c-msg">{f.message[locale]} *</label><textarea id="c-msg" name="message" required rows={6} className={input} /></div>
      {state === "error" && <p className="text-sm text-red-700">{f.error[locale]}</p>}
      <div><button disabled={state === "busy"} className={button}>{state === "busy" ? f.sending[locale] : f.send[locale]}</button></div>
    </form>
  );
}

export function BrochureForm({ locale, product, pdf }: { locale: Locale; product: string; pdf: string }) {
  const f = ui.forms;
  const { state, onSubmit } = useForm("brochure", { locale, product });
  if (state === "done")
    return (
      <div className="rounded-2xl bg-white p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/2023/03/Mailing-150x150.png" alt="" className="mb-4 h-16 w-16" />
        <p className="font-semibold text-forest">{f.brochureThanks[locale]}</p>
        <a href={pdf} target="_blank" rel="noopener" className={`${button} mt-4`}>{f.downloadBrochure[locale]}</a>
      </div>
    );
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <div><label className={label} htmlFor="b-name">{f.name[locale]} *</label><input id="b-name" name="name" required className={input} autoComplete="name" /></div>
      <div><label className={label} htmlFor="b-email">{f.email[locale]} *</label><input id="b-email" name="email" type="email" required className={input} autoComplete="email" /></div>
      <div><label className={label} htmlFor="b-phone">{f.phone[locale]}</label><input id="b-phone" name="phone" type="tel" className={input} autoComplete="tel" /></div>
      <div><label className={label} htmlFor="b-company">{f.company[locale]} *</label><input id="b-company" name="company" required className={input} autoComplete="organization" /></div>
      <label className="flex gap-3 text-sm text-stone sm:col-span-2">
        <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-forest" />
        <span>{f.consent[locale]} <Link href={href("privacy", locale)} className="underline">Privacy statement</Link></span>
      </label>
      {state === "error" && <p className="text-sm text-red-700 sm:col-span-2">{f.error[locale]}</p>}
      <div className="sm:col-span-2"><button disabled={state === "busy"} className={button}>{state === "busy" ? f.sending[locale] : f.downloadBrochure[locale]}</button></div>
    </form>
  );
}

export function NewsletterForm({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const f = ui.forms;
  const { state, onSubmit } = useForm("newsletter", { locale });
  if (state === "done") return <p className={`font-semibold ${dark ? "text-lime" : "text-forest"}`}>{f.subscribed[locale]}</p>;
  return (
    <form onSubmit={onSubmit} className="relative flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <Honeypot />
      <label htmlFor="n-email" className="sr-only">{f.email[locale]}</label>
      <input id="n-email" name="email" type="email" required placeholder={f.email[locale]} className={input} autoComplete="email" />
      <button disabled={state === "busy"} className={`${button} shrink-0 ${dark ? "bg-lime text-forest hover:bg-white" : ""}`}>{f.subscribe[locale]}</button>
      {state === "error" && <p className={`text-sm ${dark ? "text-red-200" : "text-red-700"}`}>{f.error[locale]}</p>}
    </form>
  );
}
