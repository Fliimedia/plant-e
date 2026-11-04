import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProducts, getShipping, t } from "@/lib/data";
import { href } from "@/lib/routes";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  const stripe = new Stripe(key);

  let body: { locale?: string; lines?: { slug: string; qty: number }[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  const locale = body.locale === "en" ? "en" : "nl";
  const lines = (body.lines ?? []).slice(0, 30);

  // Prices always come from the server, never from the browser.
  const products = await getProducts();
  const items = lines.map((l) => {
    const p = products.find((x) => x.slug === l.slug);
    const qty = Math.max(1, Math.min(99, Math.floor(Number(l.qty) || 0)));
    return p && p.stock !== "out_of_stock" ? { p, qty } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);
  if (items.length === 0) return NextResponse.json({ error: "empty" }, { status: 400 });

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const pickup = items.some((i) => i.p.pickupOnly);
  const shipping = await getShipping();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: locale === "nl" ? "nl" : "en",
    line_items: items.map(({ p, qty }) => ({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: p.priceCents,
        tax_behavior: "inclusive",
        product_data: { name: t(p.title, locale), metadata: { slug: p.slug } },
      },
    })),
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    ...(pickup
      ? { custom_text: { submit: { message: locale === "nl" ? "Deze bestelling haal je op bij Plant-e, Beukenlaan 52, Renkum. We nemen contact op voor een afspraak." : "You collect this order at Plant-e, Beukenlaan 52, Renkum (NL). We will contact you to arrange a time." } } }
      : {
          shipping_address_collection: { allowed_countries: shipping.countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] },
          shipping_options: [
            { shipping_rate_data: { type: "fixed_amount", display_name: locale === "nl" ? "Verzending binnen Nederland (PostNL)" : "Shipping within the Netherlands (PostNL)", fixed_amount: { amount: shipping.nlCents, currency: "eur" }, tax_behavior: "inclusive" } },
            { shipping_rate_data: { type: "fixed_amount", display_name: locale === "nl" ? "Verzending buiten Nederland" : "Shipping outside the Netherlands", fixed_amount: { amount: shipping.euCents, currency: "eur" }, tax_behavior: "inclusive" } },
          ],
        }),
    metadata: { pickup: pickup ? "yes" : "no", locale, items: items.map((i) => `${i.p.slug}x${i.qty}`).join(",").slice(0, 490) },
    success_url: `${site}${href("thanks", locale)}?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}${href("cart", locale)}`,
  });
  return NextResponse.json({ url: session.url });
}
