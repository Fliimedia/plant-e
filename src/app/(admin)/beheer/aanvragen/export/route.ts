import { NextResponse } from "next/server";
import { currentAdmin, serviceClient } from "@/lib/supabase";

export async function GET(req: Request) {
  const sb = serviceClient();
  if (!sb || !(await currentAdmin())) return new NextResponse("Forbidden", { status: 403 });
  const type = new URL(req.url).searchParams.get("type");
  let q = sb.from("leads").select("created_at,type,product,name,email,phone,company,message,locale,consent").order("created_at", { ascending: false });
  if (type) q = q.eq("type", type);
  const { data } = await q;
  const cols = ["created_at", "type", "product", "name", "email", "phone", "company", "message", "locale", "consent"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.join(";"), ...(data ?? []).map((r) => cols.map((c) => esc((r as Record<string, unknown>)[c])).join(";"))].join("\n");
  return new NextResponse("﻿" + csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="aanvragen.csv"` } });
}
