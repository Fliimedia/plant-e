import { NextResponse } from "next/server";
import { serviceClient } from "@/lib/supabase";
import { BUCKET, safePath, originUrl, contentType, migrateOne } from "@/lib/media";

const CACHE = "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400";

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const path = safePath((await params).path);
  if (!path) return new NextResponse("Not found", { status: 404 });
  const sb = serviceClient();
  if (!sb) return NextResponse.redirect(originUrl(path), 302);

  const { data } = await sb.storage.from(BUCKET).download(path);
  if (data) return new NextResponse(data, { headers: { "content-type": contentType(path), "cache-control": CACHE } });

  // Not migrated yet: pull it from the old site once, store it, serve it.
  if (new URL(originUrl(path)).host === new URL(req.url).host) return new NextResponse("Not found", { status: 404 });
  const r = await migrateOne(path).catch(() => ({ ok: false as const, bytes: undefined }));
  if (!r.ok || !r.bytes) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(r.bytes, { headers: { "content-type": contentType(path), "cache-control": CACHE } });
}
