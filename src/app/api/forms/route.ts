import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { serviceClient } from "@/lib/supabase";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now); hits.set(ip, list);
  return list.length > 8;
}

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

async function mailchimp(email: string, locale: string) {
  const key = process.env.MAILCHIMP_API_KEY, list = process.env.MAILCHIMP_LIST_ID;
  if (!key || !list) return false;
  const dc = key.split("-").pop();
  const hash = createHash("md5").update(email.toLowerCase()).digest("hex");
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${hash}`, {
    method: "PUT",
    headers: { authorization: `Basic ${Buffer.from(`any:${key}`).toString("base64")}`, "content-type": "application/json" },
    body: JSON.stringify({ email_address: email, status_if_new: "pending", language: locale }),
  });
  return res.ok;
}

async function notify(subject: string, text: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY, to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM ?? "Plant-e website <website@plant-e.com>", to: to.split(","), subject, text, reply_to: replyTo }),
  }).catch(() => {});
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }

  // Bots fill the hidden field or submit instantly. Pretend success so they learn nothing.
  if (str(body.website) || Number(body.elapsed) < 1500) return NextResponse.json({ ok: true });

  const type = str(body.type, 20);
  const email = str(body.email, 200).toLowerCase();
  const locale = body.locale === "en" ? "en" : "nl";
  if (!["contact", "brochure", "newsletter"].includes(type) || !isEmail(email)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const lead = {
    type, email, locale,
    name: str(body.name, 200) || null, phone: str(body.phone, 50) || null, company: str(body.company, 200) || null,
    message: str(body.message, 5000) || null, product: str(body.product, 200) || null, consent: body.consent === "yes",
  };
  if (type === "contact" && !lead.message) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (type === "brochure" && (!lead.name || !lead.company || !lead.consent)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  if (type === "newsletter") {
    const ok = await mailchimp(email, locale);
    const sb = serviceClient();
    if (sb) await sb.from("leads").insert(lead);
    if (!ok && !sb) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    return NextResponse.json({ ok: true });
  }

  const sb = serviceClient();
  if (sb) {
    const { error } = await sb.from("leads").insert(lead);
    if (error) return NextResponse.json({ error: "store" }, { status: 500 });
  }
  const lines = Object.entries(lead).filter(([, v]) => v !== null && v !== "").map(([k, v]) => `${k}: ${v}`).join("\n");
  await notify(type === "contact" ? `Nieuw contactbericht van ${lead.name ?? email}` : `Brochure aangevraagd: ${lead.product}`, lines, email);
  if (!sb && !process.env.RESEND_API_KEY) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
