import { NextResponse } from "next/server";
import manifest from "../../../../../data/media-manifest.json";
import { serviceClient } from "@/lib/supabase";
import { migrateOne } from "@/lib/media";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const BATCH = 25;
type State = { next: number; failed: string[]; total?: number; done?: string };

/** Vercel cron: copies the old WordPress media into Supabase Storage, a batch per run, until all are done. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const allowed = secret
    ? req.headers.get("authorization") === `Bearer ${secret}`
    : (req.headers.get("user-agent") ?? "").startsWith("vercel-cron");
  if (!allowed) return new NextResponse("Unauthorized", { status: 401 });

  const sb = serviceClient();
  if (!sb) return NextResponse.json({ skipped: "supabase not configured" });

  const list = manifest as string[];
  const { data } = await sb.from("settings").select("value").eq("key", "media_migration").maybeSingle();
  const state: State = { next: 0, failed: [], ...(data?.value ?? {}) };
  if (state.next >= list.length) return NextResponse.json({ done: true, total: list.length, failed: state.failed.length });

  const batch = list.slice(state.next, state.next + BATCH);
  const failed = [...state.failed];
  for (const path of batch) {
    const r = await migrateOne(path).catch(() => ({ ok: false }));
    if (!r.ok) failed.push(path);
  }
  const next = state.next + batch.length;
  const value: State = { next, failed: failed.slice(-300), total: list.length, ...(next >= list.length ? { done: new Date().toISOString() } : {}) };
  await sb.from("settings").upsert({ key: "media_migration", value });
  return NextResponse.json({ next, total: list.length, failed: failed.length });
}
