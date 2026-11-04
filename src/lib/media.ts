import "server-only";
import { serviceClient } from "./supabase";

export const BUCKET = "media";
const ORIGIN = process.env.MEDIA_ORIGIN ?? "https://plant-e.com";
const SHOP_ORIGIN = process.env.MEDIA_SHOP_ORIGIN ?? "https://shop.plant-e.com";

export function safePath(parts: string[]): string | null {
  const p = parts.map((s) => decodeURIComponent(s)).join("/");
  if (!/^[\w@.\-/ ()]+$/.test(p) || p.includes("..") || p.startsWith("/")) return null;
  return p;
}

export function originUrl(path: string) {
  return path.startsWith("shop/")
    ? `${SHOP_ORIGIN}/wp-content/uploads/${path.slice(5)}`
    : `${ORIGIN}/wp-content/uploads/${path}`;
}

export const contentType = (p: string) => {
  const ext = p.split(".").pop()?.toLowerCase();
  return ({ jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml", pdf: "application/pdf", mp4: "video/mp4" } as Record<string, string>)[ext ?? ""] ?? "application/octet-stream";
};

/** Copies one file from the old WordPress uploads into Supabase Storage. */
export async function migrateOne(path: string): Promise<{ ok: boolean; bytes?: ArrayBuffer; status?: number }> {
  const sb = serviceClient();
  const res = await fetch(originUrl(path), { cache: "no-store" });
  if (!res.ok) return { ok: false, status: res.status };
  const bytes = await res.arrayBuffer();
  if (sb) await sb.storage.from(BUCKET).upload(path, bytes, { contentType: contentType(path), upsert: true, cacheControl: "31536000" });
  return { ok: true, bytes };
}
