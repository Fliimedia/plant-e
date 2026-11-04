import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/beheer", "/api/", "/shop/winkelwagen", "/en/shop/cart", "/shop/bedankt", "/en/shop/thank-you"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
