export type Locale = "nl" | "en";
export const locales: Locale[] = ["nl", "en"];

export type RouteKey =
  | "home" | "groundwater" | "soil" | "waterquality" | "technology" | "projects" | "news"
  | "post" | "about" | "team" | "careers" | "job" | "contact" | "faq" | "newsletter"
  | "privacy" | "cookies" | "shipping" | "terms"
  | "shop" | "shopCategory" | "product" | "cart" | "thanks";

// Each pattern uses :param for a dynamic segment. NL keeps the old WordPress URLs.
export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { nl: "/", en: "/en" },
  groundwater: { nl: "/water-level-sensorstick", en: "/en/groundwater-sensorstick" },
  soil: { nl: "/bodemvocht-sensorstick", en: "/en/soil-moisture-sensorstick" },
  waterquality: { nl: "/waterkwaliteit-sensorstick", en: "/en/water-quality-sensorstick" },
  technology: { nl: "/technologie", en: "/en/technology" },
  projects: { nl: "/projecten", en: "/en/projects" },
  news: { nl: "/over/nieuws", en: "/en/news" },
  post: { nl: "/actueel/:slug", en: "/en/news/:slug" },
  about: { nl: "/over", en: "/en/about" },
  team: { nl: "/over/team", en: "/en/about/team" },
  careers: { nl: "/over/vacatures", en: "/en/about/careers" },
  job: { nl: "/over/vacatures/:slug", en: "/en/about/careers/:slug" },
  contact: { nl: "/contact", en: "/en/contact" },
  faq: { nl: "/faq", en: "/en/faq" },
  newsletter: { nl: "/nieuwsbrief", en: "/en/newsletter" },
  privacy: { nl: "/privacy-statement", en: "/en/privacy-statement" },
  cookies: { nl: "/cookies", en: "/en/cookies" },
  shipping: { nl: "/bezorg-retour-voorwaarden", en: "/en/shipping-returns" },
  terms: { nl: "/algemene-voorwaarden", en: "/en/terms" },
  shop: { nl: "/shop", en: "/en/shop" },
  shopCategory: { nl: "/shop/categorie/:cat", en: "/en/shop/category/:cat" },
  product: { nl: "/shop/product/:slug", en: "/en/shop/product/:slug" },
  cart: { nl: "/shop/winkelwagen", en: "/en/shop/cart" },
  thanks: { nl: "/shop/bedankt", en: "/en/shop/thank-you" },
};

export const shopCategories = {
  home: { nl: "thuis", en: "home" },
  work: { nl: "werk", en: "work" },
  school: { nl: "school", en: "school" },
} as const;
export type ShopCategory = keyof typeof shopCategories;

export function href(key: RouteKey, locale: Locale, params: Record<string, string> = {}) {
  let p = routes[key][locale];
  for (const [k, v] of Object.entries(params)) p = p.replace(`:${k}`, encodeURIComponent(v));
  return p;
}

export type Match = { key: RouteKey; locale: Locale; params: Record<string, string> };

export function matchPath(segments: string[]): Match | null {
  const path = "/" + segments.map(decodeURIComponent).join("/");
  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const locale of locales) {
      const pattern = routes[key][locale];
      const ps = pattern.split("/").filter(Boolean);
      const ss = path.split("/").filter(Boolean);
      if (ps.length !== ss.length) continue;
      const params: Record<string, string> = {};
      let ok = true;
      ps.forEach((p, i) => {
        if (p.startsWith(":")) params[p.slice(1)] = ss[i];
        else if (p !== ss[i]) ok = false;
      });
      if (ok) {
        if (key === "shopCategory") {
          const found = (Object.keys(shopCategories) as ShopCategory[]).find(
            (c) => shopCategories[c][locale] === params.cat,
          );
          if (!found) continue;
          params.cat = found;
        }
        return { key, locale, params };
      }
    }
  }
  return null;
}

export function alternate(m: Match): Record<Locale, string> {
  const out = {} as Record<Locale, string>;
  for (const l of locales) {
    const params = { ...m.params };
    if (m.key === "shopCategory") params.cat = shopCategories[m.params.cat as ShopCategory][l];
    out[l] = href(m.key, l, params);
  }
  return out;
}

export function allStaticPaths(): string[][] {
  const out: string[][] = [];
  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const l of locales) {
      const p = routes[key][l];
      if (p.includes(":")) continue;
      out.push(p.split("/").filter(Boolean));
    }
  }
  return out;
}
