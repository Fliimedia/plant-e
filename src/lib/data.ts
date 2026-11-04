import "server-only";
import { unstable_cache } from "next/cache";
import seedPosts from "../../data/posts.json";
import seedProducts from "../../data/products.json";
import seedLegal from "../../data/legal.json";
import type { Locale } from "./routes";
import { serviceClient } from "./supabase";

export type L10n = Partial<Record<Locale, string>>;

export type Post = {
  slug: string; date: string; kind: "news" | "project"; isNews: boolean; tags: string[];
  image: string | null; lang: Locale; title: L10n; excerpt: L10n; body: L10n; published: boolean; author?: string;
};
export type Product = {
  slug: string; title: L10n; short: L10n; body: L10n; priceCents: number; categories: string[];
  images: string[]; stock: "in_stock" | "out_of_stock" | "backorder"; pickupOnly: boolean; active: boolean;
  sort?: number;
};
export type Job = {
  slug: string; date: string; title: L10n; body: L10n; location: string | null; hours: string | null; published: boolean;
};
export type ShippingSettings = { nlCents: number; euCents: number; countries: string[] };

export const defaultShipping: ShippingSettings = {
  nlCents: 695, euCents: 1495,
  countries: ["NL", "BE", "DE", "FR", "LU", "AT", "DK"],
};

export function t(v: L10n | undefined, locale: Locale): string {
  if (!v) return "";
  return v[locale] || v.nl || v.en || "";
}
export function shownLang(v: L10n | undefined, locale: Locale): Locale {
  return v?.[locale] ? locale : v?.nl ? "nl" : "en";
}

const TAG = "content";

const loadPosts = unstable_cache(async (): Promise<Post[]> => {
  const sb = serviceClient();
  if (!sb) return seedPosts as Post[];
  const { data, error } = await sb.from("posts").select("*").eq("published", true).order("date", { ascending: false });
  if (error || !data) return seedPosts as Post[];
  return data.map((r) => ({
    slug: r.slug, date: r.date, kind: r.kind, isNews: r.is_news, tags: r.tags ?? [], image: r.image,
    lang: r.lang, title: r.title, excerpt: r.excerpt, body: r.body, published: r.published, author: r.author ?? "plant-e",
  }));
}, ["posts"], { tags: [TAG], revalidate: 300 });

const loadProducts = unstable_cache(async (): Promise<Product[]> => {
  const sb = serviceClient();
  if (!sb) return seedProducts as Product[];
  const { data, error } = await sb.from("products").select("*").order("sort", { ascending: true });
  if (error || !data) return seedProducts as Product[];
  return data.map((r) => ({
    slug: r.slug, title: r.title, short: r.short, body: r.body, priceCents: r.price_cents,
    categories: r.categories ?? [], images: r.images ?? [], stock: r.stock, pickupOnly: r.pickup_only,
    active: r.active, sort: r.sort,
  }));
}, ["products"], { tags: [TAG], revalidate: 300 });

const loadJobs = unstable_cache(async (): Promise<Job[]> => {
  const sb = serviceClient();
  if (!sb) return [];
  const { data } = await sb.from("jobs").select("*").eq("published", true).order("date", { ascending: false });
  return (data ?? []).map((r) => ({
    slug: r.slug, date: r.date, title: r.title, body: r.body, location: r.location, hours: r.hours, published: r.published,
  }));
}, ["jobs"], { tags: [TAG], revalidate: 300 });

export const getShipping = unstable_cache(async (): Promise<ShippingSettings> => {
  const sb = serviceClient();
  if (!sb) return defaultShipping;
  const { data } = await sb.from("settings").select("value").eq("key", "shipping").maybeSingle();
  return { ...defaultShipping, ...(data?.value ?? {}) };
}, ["shipping"], { tags: [TAG], revalidate: 300 });

export async function getPosts(kind?: "news" | "project") {
  const all = await loadPosts();
  if (kind === "project") return all.filter((p) => p.kind === "project");
  if (kind === "news") return all.filter((p) => p.isNews || p.kind === "news");
  return all;
}
export async function getPost(slug: string) {
  return (await loadPosts()).find((p) => p.slug === slug) ?? null;
}
export async function getProducts(category?: string) {
  const all = (await loadProducts()).filter((p) => p.active);
  return category ? all.filter((p) => p.categories.includes(category)) : all;
}
export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug) ?? null;
}
export async function getJobs() { return loadJobs(); }
export async function getJob(slug: string) {
  return (await loadJobs()).find((j) => j.slug === slug) ?? null;
}

export type LegalKey = "privacy-statement" | "cookies" | "bezorg-retour-voorwaarden" | "algemene-voorwaarden";
export function getLegal(key: LegalKey) {
  return (seedLegal as Record<string, { title: string; body: string }>)[key];
}

export const CONTENT_TAG = TAG;

export function readMinutes(md: string): number {
  const words = (md ?? "").replace(/!\[[^\]]*\]\([^)]*\)|<[^>]+>|https?:\/\/\S+/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
