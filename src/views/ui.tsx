import Link from "next/link";
import { href, type Locale } from "@/lib/routes";
import { ui, partners as homePartners, projectLocations, type Partner } from "@/content/site";
import { t, type Post, type Product } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/markdown";

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
);

/** The water table: a level line with the ▽ marker used in soil profiles. */
export const Waterline = ({ light = false, className = "" }: { light?: boolean; className?: string }) => (
  <div className={`waterline ${light ? "waterline-light" : ""} ${className}`} aria-hidden />
);

export function Btn({ to, children, variant = "dark", external }: { to: string; children: React.ReactNode; variant?: "dark" | "lime" | "outline" | "light"; external?: boolean }) {
  const cls = {
    dark: "bg-forest text-white hover:bg-water",
    lime: "bg-lime text-forest hover:bg-white",
    outline: "border border-forest text-forest hover:bg-forest hover:text-white",
    light: "border border-white/70 text-white hover:bg-white hover:text-forest",
  }[variant];
  const c = `inline-flex items-center gap-2 rounded-[3px] px-5 py-3 text-[15px] font-medium transition-colors ${cls}`;
  return external || /^(https?:|mailto:)|\.pdf$/.test(to)
    ? <a href={to} className={c} target={to.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
    : <Link href={to} className={c}>{children}</Link>;
}

export function PageHero({ title, intro, eyebrow, image, children }: { title: string; intro?: string; eyebrow?: string; image?: string; children?: React.ReactNode }) {
  if (image)
    return (
      <section className="relative overflow-hidden bg-forest text-white">
        <Img src={image} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-forest/20" aria-hidden />
        <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-40">
          {eyebrow && <p className="mb-4 text-[15px] text-white/70">{eyebrow}</p>}
          <h1 className="max-w-4xl text-[2.4rem] sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-white/80">{intro}</p>}
          {children}
        </Container>
      </section>
    );
  return (
    <section className="bg-mist">
      <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
        {eyebrow && <p className="mb-4 text-[15px] text-stone">{eyebrow}</p>}
        <h1 className="max-w-4xl text-[2.4rem] text-forest sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-stone">{intro}</p>}
        {children}
        <Waterline className="mt-12" />
      </Container>
    </section>
  );
}

export function Img({ src, alt = "", className = "" }: { src: string | null | undefined; alt?: string; className?: string }) {
  if (!src) return <div className={`bg-mist ${className}`} aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
}

/** A post as a line in a field log: date, place, title, short summary. */
export function LogRow({ post, locale }: { post: Post; locale: Locale }) {
  const to = href("post", locale, { slug: post.slug });
  const place = projectLocations[post.slug]?.place;
  return (
    <li className="border-t border-line">
      <Link href={to} className="group grid gap-4 py-6 sm:grid-cols-[140px_1fr] lg:grid-cols-[150px_200px_1fr]">
        <div className="text-[14px] text-stone">
          <time className="num block text-forest">{formatDate(post.date, locale)}</time>
          {place && <span className="block">{place}</span>}
          <span className="block">{post.kind === "project" ? ui.nav.projects[locale] : ui.nav.news[locale]}</span>
        </div>
        <div className="hidden aspect-[4/3] overflow-hidden bg-mist lg:block">
          <Img src={post.image} className="h-full w-full object-cover" />
        </div>
        <div className="max-w-2xl">
          <h3 className="text-xl text-forest group-hover:text-water sm:text-2xl" lang={post.title[locale] ? locale : post.lang}>{t(post.title, locale)}</h3>
          <p className="mt-2 line-clamp-2 text-[15px] text-stone" lang={post.excerpt[locale] ? locale : post.lang}>{t(post.excerpt, locale)}</p>
        </div>
      </Link>
    </li>
  );
}

export const LogList = ({ posts, locale }: { posts: Post[]; locale: Locale }) => (
  <ul className="border-b border-line">{posts.map((p) => <LogRow key={p.slug} post={p} locale={locale} />)}</ul>
);

/* Kept for places that show posts as tiles (related articles). */
export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const to = href("post", locale, { slug: post.slug });
  return (
    <Link href={to} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-mist"><Img src={post.image} className="h-full w-full object-cover" /></div>
      <time className="num mt-4 block text-[14px] text-stone">{formatDate(post.date, locale)}</time>
      <h3 className="mt-1 text-lg text-forest group-hover:text-water" lang={post.title[locale] ? locale : post.lang}>{t(post.title, locale)}</h3>
    </Link>
  );
}

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const s = ui.shop;
  const stock = product.stock === "in_stock" ? s.inStock : product.stock === "backorder" ? s.backorder : s.outOfStock;
  return (
    <Link href={href("product", locale, { slug: product.slug })} className="group flex flex-col">
      <div className="aspect-square overflow-hidden bg-mist">
        <Img src={product.images[0]} alt={t(product.title, locale)} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-lg text-forest group-hover:text-water">{t(product.title, locale)}</h3>
        <span className="num shrink-0 text-forest">{formatPrice(product.priceCents, locale)}</span>
      </div>
      <p className={`mt-1 text-[14px] ${product.stock === "out_of_stock" ? "text-stone" : "text-lime-dark"}`}>
        {stock[locale]}{product.pickupOnly ? `, ${s.pickupOnly[locale].toLowerCase()}` : ""}
      </p>
    </Link>
  );
}

export function PartnerWall({ locale, list = homePartners }: { locale: Locale; list?: Partner[] }) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-2xl text-forest">{ui.partners[locale]}</h2>
        <div className="mt-10 grid grid-cols-3 items-center gap-x-10 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {list.map((p) => {
            const logo = <Img src={p.logo} alt={p.name} className="max-h-12 w-auto max-w-full object-contain opacity-70 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0" />;
            return p.href
              ? <a key={p.logo} href={p.href} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center">{logo}</a>
              : <div key={p.logo} className="flex h-14 items-center justify-center">{logo}</div>;
          })}
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <section className="mt-20 bg-forest text-white">
      <Container className="py-16">
        <Waterline light className="mb-12" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl">{ui.collaborate[locale]}</h2>
            <p className="mt-3 text-lg text-white/70">{ui.collaborateText[locale]}</p>
          </div>
          <Btn to={href("contact", locale)} variant="lime">{ui.contactUs[locale]}</Btn>
        </div>
      </Container>
    </section>
  );
}
