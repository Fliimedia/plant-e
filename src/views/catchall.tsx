import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { matchPath, alternate, allStaticPaths, type Locale } from "@/lib/routes";
import { View, titleFor } from "./pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com";

function resolve(locale: Locale, path: string[] | undefined) {
  const segs = locale === "en" ? ["en", ...(path ?? [])] : path ?? [];
  const m = matchPath(segs);
  if (!m || m.locale !== locale) return null;
  return m;
}

export function staticParams(locale: Locale) {
  return allStaticPaths()
    .filter((p) => (locale === "en" ? p[0] === "en" : p[0] !== "en"))
    .map((p) => ({ path: locale === "en" ? p.slice(1) : p }));
}

export async function metadataFor(locale: Locale, path: string[] | undefined): Promise<Metadata> {
  const m = resolve(locale, path);
  if (!m) return {};
  const meta = await titleFor(m);
  const alt = alternate(m);
  const noindex = m.key === "cart" || m.key === "thanks";
  return {
    title: m.key === "home" ? { absolute: locale === "nl" ? "Plant-e | Autonome sensoren op plantenstroom" : "Plant-e | Autonomous plant-powered sensors" } : meta.title,
    description: meta.description,
    alternates: { canonical: alt[locale], languages: { nl: alt.nl, en: alt.en, "x-default": alt.nl } },
    openGraph: {
      title: meta.title, description: meta.description, siteName: "Plant-e", locale: locale === "nl" ? "nl_NL" : "en_GB",
      images: meta.image ? [{ url: meta.image }] : undefined, url: `${SITE}${alt[locale]}`,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: meta.image ? [meta.image] : undefined },
    robots: noindex ? { index: false } : undefined,
  };
}

export async function CatchAll({ locale, path }: { locale: Locale; path: string[] | undefined }) {
  const m = resolve(locale, path);
  if (!m) notFound();
  return (
    <>
      <Header locale={locale} alt={alternate(m)} />
      <main id="main"><View m={m} /></main>
      <Footer locale={locale} shop={["shop", "shopCategory", "product", "cart", "thanks"].includes(m.key)} />
    </>
  );
}
