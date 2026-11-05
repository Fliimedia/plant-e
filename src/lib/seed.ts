import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import seedPosts from "../../data/posts.json";
import seedProducts from "../../data/products.json";

/** Rows for the content imported from the old WordPress site. */
export function seedRows() {
  const posts = (seedPosts as Record<string, unknown>[]).map((p) => ({
    slug: p.slug, kind: p.kind, is_news: p.isNews, date: p.date, image: p.image, tags: p.tags, lang: p.lang,
    title: p.title, excerpt: p.excerpt, body: p.body, published: true, author: p.author ?? "plant-e",
  }));
  const products = (seedProducts as Record<string, unknown>[]).map((p, i) => ({
    slug: p.slug, title: p.title, short: p.short, body: p.body, price_cents: p.priceCents, categories: p.categories,
    images: p.images, stock: p.stock, pickup_only: p.pickupOnly, active: p.active, sort: i,
  }));
  return { posts, products };
}

/** Upserts the imported content without overwriting anything that already exists. */
export async function importSeed(sb: SupabaseClient) {
  const { posts, products } = seedRows();
  const a = await sb.from("posts").upsert(posts, { onConflict: "slug", ignoreDuplicates: true });
  const b = await sb.from("products").upsert(products, { onConflict: "slug", ignoreDuplicates: true });
  return !a.error && !b.error;
}

let once: Promise<void> | null = null;

/**
 * First connection to a fresh database: import the old site's content once.
 * The flag in settings makes sure deleted items are never brought back later.
 * Safe to run concurrently, because the import itself never overwrites.
 */
export function ensureSeeded(sb: SupabaseClient): Promise<void> {
  once ??= (async () => {
    const { data, error } = await sb.from("settings").select("key").eq("key", "seeded").maybeSingle();
    if (error || data) return;
    if (await importSeed(sb)) await sb.from("settings").upsert({ key: "seeded", value: { at: new Date().toISOString() } });
  })().catch(() => { once = null; });
  return once;
}
