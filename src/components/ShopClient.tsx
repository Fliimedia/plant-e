"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { href, type Locale } from "@/lib/routes";
import { ui } from "@/content/site";
import { useCart } from "./Cart";
import { track, gaItem, gaValue, type GaItem } from "@/lib/analytics";

export type CartProduct = { slug: string; title: string; priceCents: number; image: string | null; pickupOnly: boolean; buyable: boolean };

const money = (c: number, l: Locale) => new Intl.NumberFormat(l === "nl" ? "nl-NL" : "en-IE", { style: "currency", currency: "EUR" }).format(c / 100);

export function AddToCart({ slug, locale, disabled, item }: { slug: string; locale: Locale; disabled?: boolean; item?: GaItem }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const s = ui.shop;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="sr-only" htmlFor="qty">{s.quantity[locale]}</label>
      <div className="flex items-center rounded-full border border-line">
        <button type="button" className="px-4 py-3 text-lg" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="-">−</button>
        <input id="qty" inputMode="numeric" value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))} className="w-10 bg-transparent text-center font-bold outline-none" />
        <button type="button" className="px-4 py-3 text-lg" onClick={() => setQty(Math.min(99, qty + 1))} aria-label="+">+</button>
      </div>
      <button
        type="button" disabled={disabled}
        onClick={() => {
          add(slug, qty); setAdded(true); setTimeout(() => setAdded(false), 1800);
          if (item) { const items = [{ ...item, quantity: qty }]; track("add_to_cart", { currency: "EUR", value: gaValue(items), items }); }
        }}
        className="rounded-full bg-forest px-7 py-3.5 font-bold text-white transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added ? `✓ ${s.added[locale]}` : s.addToCart[locale]}
      </button>
      {added && <Link href={href("cart", locale)} className="font-semibold text-lime-dark underline underline-offset-4">{s.cart[locale]}</Link>}
    </div>
  );
}

export function CartView({ locale, products }: { locale: Locale; products: CartProduct[] }) {
  const { lines, set } = useCart();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const s = ui.shop;
  useEffect(() => setReady(true), []);
  const rows = lines
    .map((l) => ({ ...l, p: products.find((p) => p.slug === l.slug) }))
    .filter((r): r is typeof r & { p: CartProduct } => Boolean(r.p && r.p.buyable));
  const subtotal = rows.reduce((t, r) => t + r.qty * r.p.priceCents, 0);
  const pickup = rows.some((r) => r.p.pickupOnly);
  const items = rows.map((r) => gaItem(r.slug, r.p.title, r.p.priceCents, r.qty));
  const viewed = useRef(false);
  useEffect(() => {
    if (!ready || viewed.current || items.length === 0) return;
    viewed.current = true;
    track("view_cart", { currency: "EUR", value: gaValue(items), items });
  }, [ready, items]);
  const change = (r: (typeof rows)[number], qty: number) => {
    const diff = Math.min(99, Math.max(0, qty)) - r.qty;
    if (diff !== 0) {
      const it = [gaItem(r.slug, r.p.title, r.p.priceCents, Math.abs(diff))];
      track(diff > 0 ? "add_to_cart" : "remove_from_cart", { currency: "EUR", value: gaValue(it), items: it });
    }
    set(r.slug, qty);
  };

  const checkout = async () => {
    setBusy(true); setError(false);
    track("begin_checkout", { currency: "EUR", value: gaValue(items), items });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale, lines: rows.map((r) => ({ slug: r.slug, qty: r.qty })) }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error();
      window.location.href = j.url;
    } catch { setError(true); setBusy(false); }
  };

  if (!ready) return <div className="h-40" />;
  if (rows.length === 0)
    return (
      <div className="rounded-3xl bg-mist p-10 text-center">
        <p className="text-lg text-stone">{s.emptyCart[locale]}</p>
        <Link href={href("shop", locale)} className="mt-5 inline-block rounded-full bg-forest px-6 py-3 font-bold text-white">{s.continue[locale]}</Link>
      </div>
    );
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="divide-y divide-line border-y border-line">
        {rows.map((r) => (
          <li key={r.slug} className="flex gap-4 py-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {r.p.image ? <img src={r.p.image} alt="" className="h-24 w-24 shrink-0 rounded-2xl bg-mist object-cover" /> : <div className="h-24 w-24 rounded-2xl bg-mist" />}
            <div className="flex flex-1 flex-col gap-2">
              <Link href={href("product", locale, { slug: r.slug })} className="font-display text-lg font-bold text-forest">{r.p.title}</Link>
              {r.p.pickupOnly && <span className="text-sm text-stone">{s.pickupOnly[locale]}</span>}
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-line text-sm">
                  <button className="px-3 py-1.5" onClick={() => change(r, r.qty - 1)} aria-label="-">−</button>
                  <span className="w-8 text-center font-bold">{r.qty}</span>
                  <button className="px-3 py-1.5" onClick={() => change(r, r.qty + 1)} aria-label="+">+</button>
                </div>
                <button className="text-sm text-stone underline" onClick={() => change(r, 0)}>{s.remove[locale]}</button>
              </div>
            </div>
            <div className="font-bold text-forest">{money(r.qty * r.p.priceCents, locale)}</div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-3xl bg-mist p-6">
        <div className="flex justify-between text-lg font-bold text-forest"><span>{s.subtotal[locale]}</span><span>{money(subtotal, locale)}</span></div>
        <p className="mt-1 text-sm text-stone">{s.vat[locale]}</p>
        <p className="mt-4 text-sm text-stone">{pickup ? s.pickupNote[locale] : s.shippingCalc[locale]}</p>
        <button onClick={checkout} disabled={busy} className="mt-6 w-full rounded-full bg-forest py-3.5 font-bold text-white transition hover:bg-moss disabled:opacity-60">{s.checkout[locale]}</button>
        {error && <p className="mt-3 text-sm text-red-700">{s.checkoutError[locale]}</p>}
        <Link href={href("shop", locale)} className="mt-4 block text-center text-sm font-semibold text-forest underline underline-offset-4">{s.continue[locale]}</Link>
      </aside>
    </div>
  );
}

export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // GA purchase: amounts come from the paid Stripe session, sent once per order.
    const session = new URLSearchParams(window.location.search).get("session");
    if (!session) return;
    const KEY = "plant-e-ga-orders";
    let done: string[] = [];
    try { done = JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { /* storage unavailable */ }
    if (done.includes(session)) return;
    fetch(`/api/order?session=${encodeURIComponent(session)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((o) => {
        if (!o?.transaction_id) return;
        track("purchase", o);
        try { localStorage.setItem(KEY, JSON.stringify([...done, session].slice(-20))); } catch { /* storage unavailable */ }
      })
      .catch(() => {});
  }, []);
  return null;
}
