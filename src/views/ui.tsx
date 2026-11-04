import Link from "next/link";
import { href, type Locale } from "@/lib/routes";
import { ui, partners as homePartners, projectLocations, type Partner } from "@/content/site";
import { t, type Post, type Product } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/markdown";

/*
  Shape system: page sections sit as soft inset panels (2rem radius), media inside them
  at 1.5rem, small thumbnails at 1rem, and every button and chip is a pill.
*/

export const Container = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/** The water table: a level line with the ▽ marker used in soil profiles. */
export const Waterline = ({ light = false, className = "" }: { light?: boolean; className?: string }) => (
  <div className={`waterline ${light ? "waterline-light" : ""} ${className}`} aria-hidden />
);

export function Btn({ to, children, variant = "dark", external }: { to: string; children: React.ReactNode; variant?: "dark" | "lime" | "outline" | "light"; external?: boolean }) {
  const cls = {
    dark: "bg-forest text-white hover:bg-water",
    lime: "bg-lime text-forest hover:bg-white",
    outline: "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-white",
    light: "border border-white/50 text-white backdrop-blur-sm hover:bg-white hover:text-forest",
  }[variant];
  const c = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors ${cls}`;
  return external || /^(https?:|mailto:)|\.pdf$/.test(to)
    ? <a href={to} className={c} target={to.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
    : <Link href={to} className={c}>{children}</Link>;
}

export function PageHero({ title, intro, eyebrow, image, children }: { title: string; intro?: string; eyebrow?: string; image?: string; children?: React.ReactNode }) {
  if (image)
    return (
      <div className="px-3 pt-3 sm:px-4">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-forest text-white">
          <Img src={image} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/90 via-forest/40 to-forest/10" aria-hidden />
          <Container className="pb-12 pt-24 sm:pb-16 sm:pt-36">
            {eyebrow && <p className="mb-4 text-[15px] text-white/75">{eyebrow}</p>}
            <h1 className="max-w-4xl text-[2.3rem] sm:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg text-white/80">{intro}</p>}
            {children}
          </Container>
        </section>
      </div>
    );
  return (
    <div className="px-3 pt-3 sm:px-4">
      <section className="rounded-[2rem] bg-mist">
        <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
          {eyebrow && <p className="mb-4 text-[15px] text-stone">{eyebrow}</p>}
          <h1 className="max-w-4xl text-[2.3rem] text-forest sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-stone">{intro}</p>}
          {children}
        </Container>
      </section>
    </div>
  );
}

export function Img({ src, alt = "", className = "" }: { src: string | null | undefined; alt?: string; className?: string }) {
  if (!src) return <div className={`bg-mist ${className}`} aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
}

/** A post as an entry in the field log: thumbnail, date and place, title, short summary. */
export function LogRow({ post, locale }: { post: Post; locale: Locale }) {
  const to = href("post", locale, { slug: post.slug });
  const place = projectLocations[post.slug]?.place;
  return (
    <li>
      <Link href={to} className="group grid grid-cols-[88px_1fr] gap-4 rounded-[1.5rem] p-3 transition-colors hover:bg-mist sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-4">
        <div className="aspect-square overflow-hidden rounded-2xl bg-mist sm:aspect-[4/3]">
          <Img src={post.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="min-w-0 self-center">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-stone">
            <span className="rounded-full bg-mist px-2.5 py-0.5 text-forest group-hover:bg-white">{post.kind === "project" ? ui.nav.projects[locale] : ui.nav.news[locale]}</span>
            <time className="num">{formatDate(post.date, locale)}</time>
            {place && <span>{place}</span>}
          </p>
          <h3 className="mt-2 text-lg leading-snug text-forest sm:text-xl" lang={post.title[locale] ? locale : post.lang}>{t(post.title, locale)}</h3>
          <p className="mt-1 hidden line-clamp-2 text-[15px] text-stone sm:block" lang={post.excerpt[locale] ? locale : post.lang}>{t(post.excerpt, locale)}</p>
        </div>
      </Link>
    </li>
  );
}

export const LogList = ({ posts, locale }: { posts: Post[]; locale: Locale }) => (
  <ul className="-mx-3 space-y-1 sm:-mx-4">{posts.map((p) => <LogRow key={p.slug} post={p} locale={locale} />)}</ul>
);

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const to = href("post", locale, { slug: post.slug });
  return (
    <Link href={to} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist"><Img src={post.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
      <time className="num mt-4 block text-[14px] text-stone">{formatDate(post.date, locale)}</time>
      <h3 className="mt-1 text-lg leading-snug text-forest group-hover:text-water" lang={post.title[locale] ? locale : post.lang}>{t(post.title, locale)}</h3>
    </Link>
  );
}

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const s = ui.shop;
  const stock = product.stock === "in_stock" ? s.inStock : product.stock === "backorder" ? s.backorder : s.outOfStock;
  return (
    <Link href={href("product", locale, { slug: product.slug })} className="group flex flex-col">
      <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-mist">
        <Img src={product.images[0]} alt={t(product.title, locale)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <h3 className="text-lg leading-snug text-forest group-hover:text-water">{t(product.title, locale)}</h3>
        <span className="num shrink-0 text-forest">{formatPrice(product.priceCents, locale)}</span>
      </div>
      <p className={`mt-1 px-1 text-[14px] ${product.stock === "out_of_stock" ? "text-stone" : "text-lime-dark"}`}>
        {stock[locale]}{product.pickupOnly ? `, ${s.pickupOnly[locale].toLowerCase()}` : ""}
      </p>
    </Link>
  );
}

export function PartnerWall({ locale, list = homePartners }: { locale: Locale; list?: Partner[] }) {
  return (
    <Container className="py-12 sm:py-16">
      <section className="rounded-[2rem] bg-mist px-6 py-12 sm:px-12">
        <h2 className="text-2xl text-forest">{ui.partners[locale]}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {list.map((p) => {
            const logo = <Img src={p.logo} alt={p.name} className="max-h-11 w-auto max-w-full object-contain opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />;
            const cls = "group flex h-20 items-center justify-center rounded-2xl bg-white px-4";
            return p.href
              ? <a key={p.logo} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{logo}</a>
              : <div key={p.logo} className={cls}>{logo}</div>;
          })}
        </div>
      </section>
    </Container>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <Container className="mt-12 sm:mt-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-white sm:px-12 sm:py-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl">{ui.collaborate[locale]}</h2>
            <p className="mt-3 text-lg text-white/70">{ui.collaborateText[locale]}</p>
          </div>
          <Btn to={href("contact", locale)} variant="lime">{ui.contactUs[locale]}</Btn>
        </div>
      </section>
    </Container>
  );
}
