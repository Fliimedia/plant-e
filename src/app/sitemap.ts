import type { MetadataRoute } from "next";
import { routes, href, locales, shopCategories, type RouteKey, type ShopCategory } from "@/lib/routes";
import { getPosts, getProducts, getJobs } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entry = (key: RouteKey, params: Record<string, string> = {}, lastModified?: string) => {
    const alt = Object.fromEntries(locales.map((l) => {
      const p = { ...params };
      if (key === "shopCategory") p.cat = shopCategories[params.cat as ShopCategory][l];
      return [l, `${SITE}${href(key, l, p)}`];
    }));
    return { url: alt.nl, lastModified, alternates: { languages: alt } };
  };
  const skip: RouteKey[] = ["cart", "thanks", "post", "product", "job", "shopCategory"];
  const out: MetadataRoute.Sitemap = (Object.keys(routes) as RouteKey[]).filter((k) => !skip.includes(k)).map((k) => entry(k));
  (Object.keys(shopCategories) as ShopCategory[]).forEach((c) => out.push(entry("shopCategory", { cat: c })));
  (await getPosts()).forEach((p) => out.push(entry("post", { slug: p.slug }, p.date)));
  (await getProducts()).forEach((p) => out.push(entry("product", { slug: p.slug })));
  (await getJobs()).forEach((j) => out.push(entry("job", { slug: j.slug }, j.date)));
  return out;
}
