"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { href, type Locale } from "@/lib/routes";
import { ui, brand } from "@/content/site";
import { useCart } from "./Cart";

function Flag({ lang, className }: { lang: Locale; className?: string }) {
  return lang === "nl" ? (
    <svg viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden><rect width="9" height="6" fill="#21468B" /><rect width="9" height="4" fill="#fff" /><rect width="9" height="2" fill="#AE1C28" /></svg>
  ) : (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

type Item = { label: string; to: string; external?: boolean; children?: { label: string; to: string }[] };

export default function Header({ locale, alt }: { locale: Locale; alt: Record<Locale, string> }) {
  const n = ui.nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const items: Item[] = [
    { label: n.products[locale], to: href("groundwater", locale), children: [
      { label: locale === "nl" ? "Grondwaterstand SensorStick" : "Groundwater Level SensorStick", to: href("groundwater", locale) },
      { label: locale === "nl" ? "Waterkwaliteit SensorStick" : "Water Quality SensorStick", to: href("waterquality", locale) },
      { label: locale === "nl" ? "Bodemvocht SensorStick" : "Soil Moisture SensorStick", to: href("soil", locale) },
    ] },
    { label: n.projects[locale], to: href("projects", locale) },
    { label: n.shop[locale], to: href("shop", locale) },
    { label: n.about[locale], to: href("about", locale), children: [
      { label: n.technology[locale], to: href("technology", locale) },
      { label: n.team[locale], to: href("team", locale) },
      { label: n.careers[locale], to: href("careers", locale) },
      { label: n.news[locale], to: href("news", locale) },
    ] },
    { label: n.contact[locale], to: href("contact", locale) },
  ];
  const other: Locale = locale === "nl" ? "en" : "nl";
  const setLang = () => { document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`; };
  const inShop = pathname === "/shop" || pathname.startsWith("/shop/") || pathname === "/en/shop" || pathname.startsWith("/en/shop/");
  const active = (to: string) => pathname === to || (to !== "/" && to !== "/en" && pathname.startsWith(to + "/"));

  return (
    <>
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_#e3e8d9]" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:h-20">
        <Link href={href("home", locale)} className="shrink-0" aria-label="Plant-e home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt="Plant-e" className="h-8 w-auto lg:h-10" />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Hoofdmenu">
          {items.filter((it) => it.to !== href("shop", locale)).map((it) => (
            <div key={it.label} className="group relative">
              <Link href={it.to} className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-mist ${active(it.to) ? "text-lime-dark" : "text-forest"}`}>
                {it.label}
                {it.children && <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>}
              </Link>
              {it.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-64 rounded-2xl border border-line bg-white p-2 shadow-xl shadow-forest/5">
                    {it.children.map((c) => (
                      <Link key={c.to} href={c.to} className="block rounded-xl px-4 py-2.5 text-[15px] text-forest hover:bg-mist">{c.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
          <div className="flex items-center rounded-full bg-mist p-1" role="group" aria-label="Taal / Language">
            {(["nl", "en"] as Locale[]).map((lng) => {
              const name = lng === "nl" ? "Nederlands" : "English";
              const inner = (
                <>
                  <span className="block h-[18px] w-[18px] overflow-hidden rounded-full ring-1 ring-black/10"><Flag lang={lng} className="h-full w-full" /></span>
                  <span className="hidden text-xs font-bold uppercase tracking-wide sm:inline">{lng}</span>
                </>
              );
              const cls = "flex items-center gap-1.5 rounded-full px-2 py-1 transition sm:px-2.5";
              return lng === locale
                ? <span key={lng} className={`${cls} bg-white text-forest shadow-sm`} aria-current="true" title={name}>{inner}</span>
                : <Link key={lng} href={alt[lng]} onClick={setLang} hrefLang={lng} className={`${cls} text-stone opacity-70 hover:opacity-100`} aria-label={name} title={name}>{inner}</Link>;
            })}
          </div>
          <a href={brand.dashboardUrl} className="ml-1 hidden rounded-full bg-forest px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-moss lg:inline-flex">{n.dashboard[locale]}</a>
          <Link href={href("shop", locale)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${inShop ? "bg-lime-dark text-white" : "bg-lime text-forest hover:bg-lime-dark hover:text-white"}`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>
            {n.shop[locale]}
          </Link>
          {inShop && (
            <Link href={href("cart", locale)} className="relative rounded-full p-2.5 text-forest hover:bg-mist" aria-label={ui.shop.cart[locale]}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17.5" cy="19.5" r="1.4" /><path d="M2.5 3.5h2.4l2.3 10.6a1.6 1.6 0 001.6 1.3h8.1a1.6 1.6 0 001.5-1.2L20.5 7H5.6" /></svg>
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-forest">{count}</span>}
            </Link>
          )}
          <button onClick={() => setOpen(true)} className="rounded-full p-2.5 text-forest hover:bg-mist lg:hidden" aria-label={n.menu[locale]} aria-expanded={open}>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest text-white lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt="Plant-e" className="h-8 w-auto brightness-0 invert" />
            <button onClick={() => setOpen(false)} className="rounded-full p-2.5 hover:bg-white/10" aria-label={n.close[locale]}>
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pb-10 pt-4">
            {items.map((it) => (
              <div key={it.label} className="border-b border-white/10 py-3">
                <Link href={it.to} className="block font-display text-2xl font-bold">{it.label}</Link>
                {it.children && (
                  <div className="mt-2 flex flex-col">
                    {it.children.map((c) => <Link key={c.to} href={c.to} className="py-1.5 text-white/75">{c.label}</Link>)}
                  </div>
                )}
              </div>
            ))}
            <a href={brand.dashboardUrl} className="mt-6 rounded-full bg-lime px-5 py-3 text-center font-bold text-forest">{n.dashboard[locale]}</a>
          </nav>
        </div>
      )}
    </>
  );
}
