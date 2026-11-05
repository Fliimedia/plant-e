import { NextResponse } from "next/server";
import Stripe from "stripe";

/** Order summary for the GA purchase event on the thank-you page. Amounts only, no customer data. */
export async function GET(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  const id = new URL(req.url).searchParams.get("session") ?? "";
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id)) return NextResponse.json({ error: "bad" }, { status: 400 });

  let s: Stripe.Checkout.Session;
  try {
    s = await new Stripe(key).checkout.sessions.retrieve(id, { expand: ["line_items.data.price.product"] });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (s.payment_status !== "paid") return NextResponse.json({ error: "unpaid" }, { status: 404 });

  const items = (s.line_items?.data ?? []).map((li) => {
    const product = li.price?.product;
    const slug = product && typeof product === "object" && !("deleted" in product && product.deleted) ? (product as Stripe.Product).metadata?.slug : undefined;
    const qty = li.quantity ?? 1;
    return { item_id: slug || li.description || "item", item_name: li.description ?? "", price: Math.round(li.amount_total / qty) / 100, quantity: qty };
  });
  return NextResponse.json({
    transaction_id: s.id,
    currency: (s.currency ?? "eur").toUpperCase(),
    value: (s.amount_subtotal ?? 0) / 100,
    shipping: (s.shipping_cost?.amount_total ?? 0) / 100,
    tax: (s.total_details?.amount_tax ?? 0) / 100,
    items,
  }, { headers: { "cache-control": "no-store" } });
}
