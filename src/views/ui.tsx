import Link from "next/link";
import { href, type Locale } from "@/lib/routes";
import { ui, partners } from "@/content/site";
import { t, type Post, type Product } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/markdown";

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>
);

export function Btn({ to, children, variant = "dark", external }: { to: string; children: React.ReactNode; variant?: "dark" | "lime" | "outline" | "light"; external?: boolean }) {
  const cls = {
    dark: "bg-forest text-white hover:bg-moss",
    lime: "bg-lime text-forest hover:bg-white",
    outline: "border border-forest text-forest hover:bg-forest hover:text-white",
    light: "bg-white text-forest hover:bg-lime",
  }[variant];
  const c = `inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-colors ${cls}`;
  const arrow = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
  return external || /^(https?:|mailto:)|\.pdf$/.test(to)
    ? <a href={to} className={c} target={to.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}{arrow}</a>
    : <Link href={to} className={c}>{children}{arrow}</Link>;
}

export const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] ${light ? "text-lime" : "text-lime-dark"}`}>
    <span className="h-2 w-2 rounded-full bg-lime" aria-hidden />{children}
  </p>
);

export function PageHero({ title, intro, eyebrow }: { title: string; intro?: string; eyebrow?: string }) {
  return (
    <section className="bg-mist">
      <Container className="py-14 sm:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] text-forest sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone">{intro}</p>}
      </Container>
    </section>
  );
}

export function Img({ src, alt = "", className = "" }: { src: string | null | undefined; alt?: string; className?: string }) {
  if (!src) return <div className={`bg-mist ${className}`} aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
}

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const to = href("post", locale, { slug: post.slug });
  return (
    <Link href={to} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/5">
      <div className="aspect-[4/3] overflow-hidden bg-mist">
        <Img src={post.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-dark">
          <span>{post.kind === "project" ? ui.nav.projects[locale] : ui.nav.news[locale]}</span>
          <span className="text-line">•</span>
          <time className="text-stone">{formatDate(post.date, locale)}</time>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-forest" lang={post.title[locale] ? locale : post.lang}>{t(post.title, locale)}</h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-stone" lang={post.excerpt[locale] ? locale : post.lang}>{t(post.excerpt, locale)}</p>
        <span className="mt-auto pt-5 text-sm font-bold text-forest">{ui.readMore[locale]} →</span>
      </div>
    </Link>
  );
}

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const s = ui.shop;
  const stock = product.stock === "in_stock" ? s.inStock : product.stock === "backorder" ? s.backorder : s.outOfStock;
  return (
    <Link href={href("product", locale, { slug: product.slug })} className="group flex flex-col">
      <div className="aspect-square overflow-hidden rounded-3xl bg-mist">
        <Img src={product.images[0]} alt={t(product.title, locale)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-bold leading-snug text-forest">{t(product.title, locale)}</h3>
        <span className="shrink-0 font-bold text-forest">{formatPrice(product.priceCents, locale)}</span>
      </div>
      <p className={`mt-1 text-sm ${product.stock === "out_of_stock" ? "text-stone" : "text-lime-dark"}`}>
        {stock[locale]}{product.pickupOnly ? ` • ${s.pickupOnly[locale]}` : ""}
      </p>
    </Link>
  );
}

export function PartnerWall({ locale }: { locale: Locale }) {
  return (
    <section className="py-20">
      <Container>
        <Eyebrow>{ui.partners[locale]}</Eyebrow>
        <div className="mt-8 grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {partners.map((p) => (
            <div key={p.name} className="flex h-16 items-center justify-center">
              <Img src={p.logo} alt={p.name} className="max-h-14 w-auto max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <Container className="mt-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-white sm:px-14">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{ui.collaborate[locale]}</h2>
            <p className="mt-3 text-lg text-white/75">{ui.collaborateText[locale]}</p>
          </div>
          <Btn to={href("contact", locale)} variant="lime">{ui.contactUs[locale]}</Btn>
        </div>
      </div>
    </Container>
  );
}
