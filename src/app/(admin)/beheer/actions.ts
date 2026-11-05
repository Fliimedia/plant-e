"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient, currentAdmin, serviceClient, adminEmails } from "@/lib/supabase";
import { BUCKET, migrateOne } from "@/lib/media";
import { CONTENT_TAG } from "@/lib/data";
import { importSeed as importSeedRows } from "@/lib/seed";
import { sendMail, mailConfigured } from "@/lib/mail";

async function guard() {
  const email = await currentAdmin();
  const sb = serviceClient();
  if (!email || !sb) redirect("/beheer/login");
  return sb;
}
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const slugify = (v: string) => v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
const lines = (v: string) => v.split(/\r?\n|,/).map((x) => x.trim()).filter(Boolean);

export async function sendLoginLink(_: unknown, f: FormData) {
  const email = s(f, "email").toLowerCase();
  if (!adminEmails().includes(email)) return { msg: "Als dit adres toegang heeft, ontvang je een inloglink per e-mail." };
  const sb = await authClient();
  const admin = serviceClient();
  if (!sb || !admin) return { msg: "Supabase is nog niet ingesteld." };
  const h = await headers();
  const origin = `https://${h.get("host")}`;
  if (mailConfigured()) {
    // Our own e-mail: works for any address and needs no redirect settings in Supabase.
    await admin.auth.admin.createUser({ email, email_confirm: true }).catch(() => null);
    const { data } = await admin.auth.admin.generateLink({ type: "magiclink", email });
    const token = data?.properties?.hashed_token;
    if (token) {
      const link = `${origin}/beheer/auth?token_hash=${encodeURIComponent(token)}&type=magiclink`;
      await sendMail({
        to: email,
        subject: "Inloggen op Plant-e beheer",
        text: `Klik op deze link om in te loggen op het beheer van plant-e.com:\n\n${link}\n\nDe link werkt één keer en verloopt na een uur. Heb je niet om deze link gevraagd? Dan kun je deze e-mail negeren.`,
      });
    }
  } else {
    await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/beheer/auth`, shouldCreateUser: true } });
  }
  return { msg: "Als dit adres toegang heeft, ontvang je een inloglink per e-mail." };
}

export async function logout() {
  const sb = await authClient();
  await sb?.auth.signOut();
  redirect("/beheer/login");
}

export async function uploadImage(f: FormData): Promise<string> {
  const sb = await guard();
  const file = f.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Geen bestand");
  if (file.size > 15 * 1024 * 1024) throw new Error("Bestand is groter dan 15 MB");
  if (!/^(image\/(jpeg|png|webp|gif)|application\/pdf|video\/mp4)$/.test(file.type)) throw new Error("Alleen JPG, PNG, WebP, GIF, PDF of MP4");
  const now = new Date();
  const name = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`;
  const { error } = await sb.storage.from(BUCKET).upload(name, await file.arrayBuffer(), { contentType: file.type, cacheControl: "31536000" });
  if (error) throw new Error(error.message);
  return `/media/${name}`;
}

export async function savePost(f: FormData) {
  const sb = await guard();
  const id = s(f, "id");
  const slug = slugify(s(f, "slug") || s(f, "title_nl") || s(f, "title_en"));
  const row = {
    slug, kind: s(f, "kind") === "project" ? "project" : "news", is_news: f.get("is_news") === "on",
    date: s(f, "date") || new Date().toISOString().slice(0, 10), image: s(f, "image") || null,
    tags: lines(s(f, "tags")), lang: s(f, "title_nl") ? "nl" : "en", published: f.get("published") === "on",
    author: s(f, "author") || "plant-e",
    title: { nl: s(f, "title_nl") || undefined, en: s(f, "title_en") || undefined },
    excerpt: { nl: s(f, "excerpt_nl") || undefined, en: s(f, "excerpt_en") || undefined },
    body: { nl: s(f, "body_nl") || undefined, en: s(f, "body_en") || undefined },
  };
  const q = id ? sb.from("posts").update(row).eq("id", id) : sb.from("posts").insert(row);
  const { error } = await q;
  if (error) redirect(`/beheer/berichten/${id || "nieuw"}?fout=${encodeURIComponent(error.message)}`);
  revalidateTag(CONTENT_TAG);
  redirect("/beheer/berichten?opgeslagen=1");
}

export async function saveProduct(f: FormData) {
  const sb = await guard();
  const id = s(f, "id");
  const row = {
    slug: slugify(s(f, "slug") || s(f, "title_nl")),
    title: { nl: s(f, "title_nl") || undefined, en: s(f, "title_en") || undefined },
    short: { nl: s(f, "short_nl") || undefined, en: s(f, "short_en") || undefined },
    body: { nl: s(f, "body_nl") || undefined, en: s(f, "body_en") || undefined },
    price_cents: Math.round(parseFloat(s(f, "price").replace(",", ".") || "0") * 100),
    categories: ["home", "work", "school"].filter((c) => f.get(`cat_${c}`) === "on"),
    images: lines(s(f, "images")), stock: ["in_stock", "out_of_stock", "backorder"].includes(s(f, "stock")) ? s(f, "stock") : "in_stock",
    pickup_only: f.get("pickup_only") === "on", active: f.get("active") === "on", sort: parseInt(s(f, "sort") || "0", 10),
  };
  const { error } = id ? await sb.from("products").update(row).eq("id", id) : await sb.from("products").insert(row);
  if (error) redirect(`/beheer/producten/${id || "nieuw"}?fout=${encodeURIComponent(error.message)}`);
  revalidateTag(CONTENT_TAG);
  redirect("/beheer/producten?opgeslagen=1");
}

export async function saveJob(f: FormData) {
  const sb = await guard();
  const id = s(f, "id");
  const row = {
    slug: slugify(s(f, "slug") || s(f, "title_nl")), date: s(f, "date") || new Date().toISOString().slice(0, 10),
    title: { nl: s(f, "title_nl") || undefined, en: s(f, "title_en") || undefined },
    body: { nl: s(f, "body_nl") || undefined, en: s(f, "body_en") || undefined },
    location: s(f, "location") || null, hours: s(f, "hours") || null, published: f.get("published") === "on",
  };
  const { error } = id ? await sb.from("jobs").update(row).eq("id", id) : await sb.from("jobs").insert(row);
  if (error) redirect(`/beheer/vacatures/${id || "nieuw"}?fout=${encodeURIComponent(error.message)}`);
  revalidateTag(CONTENT_TAG);
  redirect("/beheer/vacatures?opgeslagen=1");
}

export async function deleteRow(f: FormData) {
  const sb = await guard();
  const table = s(f, "table");
  if (!["posts", "products", "jobs"].includes(table)) return;
  await sb.from(table).delete().eq("id", s(f, "id"));
  revalidateTag(CONTENT_TAG);
  redirect(`/beheer/${{ posts: "berichten", products: "producten", jobs: "vacatures" }[table]}`);
}

export async function saveShipping(f: FormData) {
  const sb = await guard();
  const eur = (k: string) => Math.round(parseFloat(s(f, k).replace(",", ".") || "0") * 100);
  const value = { nlCents: eur("nl"), euCents: eur("eu"), countries: lines(s(f, "countries").toUpperCase()) };
  await sb.from("settings").upsert({ key: "shipping", value });
  revalidateTag(CONTENT_TAG);
  redirect("/beheer/instellingen?opgeslagen=1");
}

export async function setOrderStatus(f: FormData) {
  const sb = await guard();
  await sb.from("orders").update({ fulfilment: s(f, "fulfilment") }).eq("id", s(f, "id"));
  redirect("/beheer/bestellingen");
}

/** One-time import of the WordPress content into the database. Skips slugs that already exist. */
export async function importSeed() {
  const sb = await guard();
  await importSeedRows(sb);
  revalidateTag(CONTENT_TAG);
  redirect("/beheer/instellingen?import=1");
}

/** Copies a batch of old WordPress files into storage. Call repeatedly until done. */
export async function migrateMedia(paths: string[]): Promise<{ ok: number; failed: string[] }> {
  const sb = await guard();
  let ok = 0; const failed: string[] = [];
  for (const p of paths.slice(0, 15)) {
    const { data } = await sb.storage.from(BUCKET).list(p.split("/").slice(0, -1).join("/"), { search: p.split("/").pop() });
    if (data?.some((x) => x.name === p.split("/").pop())) { ok++; continue; }
    const r = await migrateOne(p).catch(() => ({ ok: false }));
    if (r.ok) ok++; else failed.push(p);
  }
  return { ok, failed };
}
