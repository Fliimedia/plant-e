import { NextResponse } from "next/server";
import Stripe from "stripe";
import { serviceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY, secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !secret) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const stripe = new Stripe(key);
  const sig = req.headers.get("stripe-signature") ?? "";
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await req.text(), sig, secret); }
  catch { return NextResponse.json({ error: "signature" }, { status: 400 }); }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const s = event.data.object as Stripe.Checkout.Session;
    const full = await stripe.checkout.sessions.retrieve(s.id, { expand: ["line_items"] });
    const sb = serviceClient();
    if (sb) {
      await sb.from("orders").upsert({
        stripe_session_id: full.id,
        status: full.payment_status === "paid" ? "paid" : full.payment_status,
        email: full.customer_details?.email ?? null,
        name: full.customer_details?.name ?? null,
        phone: full.customer_details?.phone ?? null,
        amount_total: full.amount_total,
        pickup: full.metadata?.pickup === "yes",
        items: (full.line_items?.data ?? []).map((li) => ({ name: li.description, qty: li.quantity, total: li.amount_total })),
        shipping: full.collected_information?.shipping_details ?? null,
        billing: full.customer_details?.address ?? null,
      }, { onConflict: "stripe_session_id" });
    }
  }
  return NextResponse.json({ received: true });
}
