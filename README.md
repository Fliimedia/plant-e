# plant-e.com

Next.js site voor Plant-e (plant-e.com + shop), vervangt de twee WordPress-installaties.

- Publieke site NL (`/`) en EN (`/en`), oude WordPress-URL's blijven werken of worden doorgestuurd.
- Shop met Stripe Checkout, `shop.plant-e.com` stuurt door naar `/shop`.
- Beheer op `/beheer` (inloggen met e-mail link, alleen adressen in `ADMIN_EMAILS`).
- Content, aanvragen, bestellingen en media in Supabase (`supabase/schema.sql`).

## Live zetten

1. Supabase: voer `supabase/schema.sql` uit.
2. Vercel: zet de variabelen uit `.env.example`.
3. Stripe: webhook naar `https://plant-e.com/api/stripe-webhook` met event `checkout.session.completed`.
4. `/beheer/instellingen`: importeer content en zet media over, zolang de oude site nog online is.
5. DNS van plant-e.com, www en shop naar Vercel.
