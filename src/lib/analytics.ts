/* Google Analytics 4 (gtag.js) with Consent Mode v2. Safe to import from client components. */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-X3LN88JQZG";
export const CONSENT_KEY = "plant-e-consent";

declare global { interface Window { dataLayer: unknown[]; gtag?: (...a: unknown[]) => void } }

export type GaItem = { item_id: string; item_name: string; price: number; quantity?: number; item_category?: string; index?: number };

export const gaItem = (slug: string, name: string, priceCents: number, quantity = 1, category?: string): GaItem => ({
  item_id: slug, item_name: name, price: priceCents / 100, quantity, ...(category ? { item_category: category } : {}),
});

export const gaValue = (items: GaItem[]) => Math.round(items.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0) * 100) / 100;

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Inline bootstrap for <head>: consent defaults (restored from the visitor's earlier choice) and the GA config. */
export function bootstrapScript({ ga }: { ga: boolean }) {
  return [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;",
    `var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}var g=c==='all'?'granted':'denied';`,
    "gtag('consent','default',{analytics_storage:g,ad_storage:g,ad_user_data:g,ad_personalization:g,wait_for_update:500});",
    "gtag('set','ads_data_redaction',true);",
    ga ? `gtag('js',new Date());gtag('config','${GA_ID}');` : "",
  ].join("");
}
