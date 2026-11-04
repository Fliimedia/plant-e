import Link from "next/link";
import { notFound } from "next/navigation";
import { href, shopCategories, type Locale, type Match, type ShopCategory } from "@/lib/routes";
import {
  ui, home, sensorPages, sensorShared, technology, about, team, careers, contact, newsletter, newsPage, projectsPage, faq,
  shopCategoryText, productPartners, aboutPartners, newsHighlights, inTheNews, faqImage, shopImages, shopExtra, contactMap,
  heroes, projectLocations, mapText, keyFigures, authors, articleText,
} from "@/content/site";
import { mapShapes, mapSize, mapProjection } from "@/content/map-data";
import { getPosts, getPost, getProducts, getProduct, getJobs, getJob, getLegal, t, shownLang, readMinutes, type LegalKey, type Post } from "@/lib/data";
import { renderMarkdown, formatDate, formatPrice } from "@/lib/markdown";
import { Container, Btn, PageHero, Img, LogList, PostCard, ProductCard, PartnerWall, CtaBand } from "./ui";
import { ContactForm, BrochureForm, NewsletterForm } from "@/components/Forms";
import { AddToCart, CartView, ClearCart, type CartProduct } from "@/components/ShopClient";
import ShareBar from "@/components/ShareBar";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com";

const Prose = ({ md, lang }: { md: string; lang?: string }) => (
  <div className="prose-plant" lang={lang} dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
);

const Icon = ({ d, className }: { d: string; className?: string }) => (
  <svg viewBox="0 0 512 545.5" fill="currentColor" className={className} aria-hidden><path d={d} /></svg>
);

/** Plays the hero video when one is set, otherwise shows the still. */
function HeroMedia({ image, video, className = "" }: { image: string; video: string | null; className?: string }) {
  return video
    ? <video src={video} poster={image} autoPlay muted loop playsInline preload="metadata" className={className} aria-hidden />
    : <Img src={image} className={className} />;
}

/**
 * Rounded hero that always shows the whole 16:9 video and, together with the header, fits the viewport.
 * When the window is wider than the video, the video is contained and a blurred copy of its poster fills the sides.
 * Below lg the video sits on top and the text follows inside the same panel.
 */
function VideoHero({ image, video, side, children }: { image: string; video: string | null; side: "left" | "right"; children: React.ReactNode }) {
  return (
    <div className="px-3 pt-3 sm:px-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-forest text-white lg:h-[min(calc(100svh-5.75rem),calc((100vw-2rem)*0.5625))]">
        <div className="relative aspect-video w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
          <Img src={image} className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-2xl brightness-50 lg:block" />
          <HeroMedia image={image} video={video} className="absolute inset-0 h-full w-full object-contain" />
          <div className={`absolute inset-0 hidden lg:block ${side === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-forest/80 via-forest/25 to-transparent`} aria-hidden />
        </div>
        <Container className="relative py-8 sm:py-10 lg:absolute lg:inset-0 lg:flex lg:items-end lg:py-0 lg:pb-12 xl:pb-16">
          <div className={side === "right" ? "lg:ml-auto lg:max-w-xl" : "lg:max-w-2xl"}>{children}</div>
        </Container>
      </section>
    </div>
  );
}

function ProjectMap({ l, posts }: { l: Locale; posts: Post[] }) {
  const { k, tx, ty } = mapProjection;
  const project = (lat: number, lng: number) => {
    const x = k * (lng * Math.PI) / 180 + tx;
    const y = ty - k * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
    return [x, y];
  };
  const placed = posts
    .map((p) => ({ p, loc: projectLocations[p.slug] }))
    .filter((x) => x.loc)
    .map((x) => ({ ...x, xy: project(x.loc.lat, x.loc.lng) }));
  const inside = placed.filter(({ xy: [x, y] }) => x >= 0 && x <= mapSize.w && y >= 0 && y <= mapSize.h);
  const outside = placed.filter((x) => !inside.includes(x));
  return (
    <figure>
      <svg viewBox={`0 0 ${mapSize.w} ${mapSize.h}`} className="h-auto w-full rounded-[1.5rem] bg-[#d9e3e0]" role="img" aria-label={mapText.title[l]}>
        {mapShapes.map((s) => <path key={s.name} d={s.d} fill="#f6f8f6" stroke="#c9d2ce" strokeWidth="1" strokeLinejoin="round" />)}
        {inside.map(({ p, xy: [x, y] }) => (
          <a key={p.slug} href={href("post", l, { slug: p.slug })}>
            <title>{`${projectLocations[p.slug].place}: ${t(p.title, l)}`}</title>
            <circle cx={x} cy={y} r="14" fill="#aad75d" opacity="0.3" />
            <circle cx={x} cy={y} r="6.5" fill="#aad75d" stroke="#2a2420" strokeWidth="2" />
          </a>
        ))}
      </svg>
      {outside.length > 0 && (
        <figcaption className="mt-3 text-[14px] text-stone">
          {mapText.outside[l]}:{" "}
          {outside.map(({ p }, i) => (
            <span key={p.slug}>{i > 0 && ", "}<Link href={href("post", l, { slug: p.slug })} className="text-water underline underline-offset-2">{projectLocations[p.slug].place}</Link></span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

const Figures = ({ k, l, size = "sm" }: { k: "groundwater" | "soil" | "waterquality"; l: Locale; size?: "sm" | "lg" }) => (
  <dl className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
    {keyFigures[k].map((f) => (
      <div key={f.label.nl} className="rounded-2xl bg-white px-4 py-4">
        <dt className={`num text-forest ${size === "lg" ? "text-2xl sm:text-3xl" : "text-xl"}`}>{f.value[l]}</dt>
        <dd className="mt-1 text-[13px] leading-snug text-stone">{f.label[l]}</dd>
      </div>
    ))}
  </dl>
);

/* ---------- Home ---------- */
async function Home({ l }: { l: Locale }) {
  const all = await getPosts();
  const projects = await getPosts("project");
  const sensors = (["groundwater", "soil", "waterquality"] as const).map((k) => ({ k, ...home.sensors[k] }));
  return (
    <>
      <VideoHero image={heroes.home.image} video={heroes.home.video} side="left">
        <p className="text-[15px] text-white/75">{home.subtitle[l]}</p>
        <h1 className="mt-3 max-w-2xl text-[2.2rem] sm:text-5xl xl:text-6xl">{home.title[l]}</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn to={href("groundwater", l)} variant="lime">{ui.nav.products[l]}</Btn>
          <Btn to={href("technology", l)} variant="light">{ui.nav.technology[l]}</Btn>
        </div>
      </VideoHero>

      <Container className="space-y-4 py-12 sm:space-y-6 sm:py-16">
        {sensors.map((s, i) => (
          <article key={s.k} className="grid items-center gap-6 rounded-[2rem] bg-mist p-3 sm:p-4 lg:grid-cols-2 lg:gap-12">
            <div className={`overflow-hidden rounded-[1.5rem] ${i % 2 ? "lg:order-2" : ""}`}>
              <Img src={s.image} alt={s.label[l]} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className={`px-3 pb-5 sm:px-6 lg:py-8 ${i % 2 ? "lg:order-1 lg:pl-10" : "lg:pr-10"}`}>
              <h2 className="text-3xl text-forest sm:text-4xl">{s.label[l]}</h2>
              <p className="mt-4 text-stone">{s.text[l]}</p>
              <div className="mt-6"><Figures k={s.k} l={l} /></div>
              <div className="mt-6"><Btn to={href(s.k, l)}>{ui.readMore[l]}</Btn></div>
            </div>
          </article>
        ))}
      </Container>

      <Container>
        <section className="grid overflow-hidden rounded-[2rem] bg-forest text-white lg:grid-cols-12">
          <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto">
            <Img src={heroes.technology.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-6 py-12 sm:px-12 lg:col-span-5 lg:py-20">
            <h2 className="text-3xl sm:text-4xl">{home.techTitle[l]}</h2>
            <p className="mt-5 text-lg text-white/75">{home.techText[l]}</p>
            <div className="mt-8"><Btn to={href("technology", l)} variant="lime">{home.techCta[l]}</Btn></div>
          </div>
        </section>
      </Container>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="rounded-[2rem] bg-mist p-6 sm:p-10 lg:col-span-5">
            <h2 className="text-3xl text-forest sm:text-4xl">{home.projectsTitle[l]}</h2>
            <p className="mt-4 text-stone">{home.projectsText[l]}</p>
            <div className="mt-8"><ProjectMap l={l} posts={projects} /></div>
          </section>
          <section className="rounded-[2rem] border border-line p-3 sm:p-6 lg:col-span-7">
            <LogList posts={all.slice(0, 4)} locale={l} />
            <div className="px-3 pb-3 pt-4"><Btn to={href("projects", l)} variant="outline">{ui.allProjects[l]}</Btn></div>
          </section>
        </div>
      </Container>

      <PartnerWall locale={l} />
    </>
  );
}

/* ---------- Sensor product pages ---------- */
async function Sensor({ l, k }: { l: Locale; k: "groundwater" | "soil" | "waterquality" }) {
  const p = sensorPages[k];
  const projects = (await getPosts("project")).filter((x) => x.tags.some((tg) => /sensor|waterkwaliteit/i.test(tg))).slice(0, 4);
  return (
    <>
      <div className="px-3 pt-3 sm:px-4">
        <section className="rounded-[2rem] bg-mist">
          <Container className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[15px] text-stone">SensorStick</p>
              <h1 className="mt-3 text-[2.3rem] text-forest sm:text-6xl">{p.title[l]}</h1>
              <p className="mt-6 max-w-2xl text-lg text-stone">{p.intro[0][l]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn to="#brochure">{ui.forms.downloadBrochure[l]}</Btn>
                <Btn to={href("contact", l)} variant="outline">{ui.contactUs[l]}</Btn>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] lg:col-span-5">
              <Img src={p.heroImage} alt={p.title[l]} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="lg:col-span-12"><Figures k={k} l={l} size="lg" /></div>
          </Container>
        </section>
      </div>

      <Container className="grid gap-10 py-16 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          {p.intro.slice(1).map((para, i) => <p key={i} className="max-w-[68ch]">{para[l]}</p>)}
        </div>
        <aside className="h-fit rounded-[1.5rem] bg-forest p-8 text-white lg:col-span-4 lg:col-start-9">
          <h2 className="text-xl">{sensorShared.applications[l]}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.applications.map((a) => <li key={a.nl} className="rounded-full bg-white/10 px-4 py-2 text-[15px]">{a[l]}</li>)}
          </ul>
        </aside>
      </Container>

      <Container><Img src={p.dashboardImage} alt="Dashboard" className="w-full rounded-[2rem] border border-line" /></Container>

      <Container className="py-16">
        <h2 className="text-3xl text-forest sm:text-4xl">{sensorShared.specs[l]}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {p.specs.map((g) => (
            <div key={g.title.nl} className="rounded-[1.5rem] bg-mist p-6">
              <h3 className="text-lg text-forest">{g.title[l]}</h3>
              <dl className="mt-3 divide-y divide-line">
                {g.rows.map((r) => (
                  <div key={r.label.nl} className="grid grid-cols-[1fr_1.2fr] gap-4 py-3 text-[15px]">
                    <dt className="text-stone">{r.label[l]}</dt>
                    <dd className="num text-forest">{r.values.map((v) => <span key={v.nl} className="block">{v[l]}</span>)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.useCases.map((u) => (
            <figure key={u.title.nl} className="overflow-hidden rounded-[1.5rem] bg-mist">
              <Img src={u.image} alt="" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-5">
                <h3 className="text-lg text-forest">{u.title[l]}</h3>
                {u.items && <p className="mt-1 text-[14px] text-stone">{u.items.map((i) => i[l]).join(", ")}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <Container id="brochure" className="scroll-mt-24 pt-16">
        <section className="grid gap-8 rounded-[2rem] bg-mist p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl text-forest">{sensorShared.brochureTitle[l]}</h2>
            <p className="mt-4 text-stone">{sensorShared.brochureText[l]}</p>
          </div>
          <div className="lg:col-span-7"><BrochureForm locale={l} product={p.brochure.label.nl} pdf={p.brochure.pdf} /></div>
        </section>
      </Container>

      {projects.length > 0 && (
        <Container className="pt-16">
          <h2 className="text-3xl text-forest">{sensorShared.projectsTitle[l]}</h2>
          <p className="mt-4 max-w-3xl text-stone">{sensorShared.projectsText[l]}</p>
          <div className="mt-8"><LogList posts={projects} locale={l} /></div>
          <div className="mt-6"><Btn to={href("projects", l)} variant="outline">{sensorShared.allProjects[l]}</Btn></div>
        </Container>
      )}
      <PartnerWall locale={l} list={productPartners} />
      <CtaBand locale={l} />
    </>
  );
}

/* ---------- Technology ---------- */
function Technology({ l }: { l: Locale }) {
  const tch = technology;
  return (
    <>
      <VideoHero image={heroes.technology.image} video={heroes.technology.video} side="right">
        <p className="text-[15px] text-white/75">{ui.nav.technology[l]}</p>
        <h1 className="mt-3 text-[2.1rem] sm:text-5xl">{tch.title[l]}</h1>
        <p className="mt-5 text-[17px] text-white/80">{tch.intro[l]}</p>
      </VideoHero>

      <Container className="py-16 sm:py-20">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-lime/30"><Icon d={tch.icon} className="h-7 w-7 text-lime-dark" /></span>
          <h2 className="text-3xl text-forest sm:text-4xl">{tch.explainedTitle[l]}</h2>
        </div>
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {tch.explained.map((s, i) => (
            <li key={i} className="rounded-[1.5rem] bg-mist p-7">
              <span className="num grid h-11 w-11 place-items-center rounded-full bg-forest text-lg text-white">{i + 1}</span>
              <p className="mt-5 text-[17px]">{s[l]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tch.images.map((src) => <Img key={src} src={src} alt="" className="w-full rounded-[1.5rem] bg-mist" />)}
        </div>
      </Container>

      <Container>
        <section className="rounded-[2rem] bg-forest px-6 py-14 text-white sm:px-12 sm:py-16">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">{tch.impactTitle[l]}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tch.impact.map((x) => (
              <div key={x.title.nl} className="rounded-[1.5rem] bg-white/[0.06] p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-lime/15"><Icon d={x.icon} className="h-7 w-7 text-lime" /></span>
                <h3 className="mt-5 text-xl">{x.title[l]}</h3>
                <p className="mt-3 text-[15px] text-white/70">{x.text[l]}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <CtaBand locale={l} />
    </>
  );
}

/* ---------- Projects & news ---------- */
async function PostList({ l, kind }: { l: Locale; kind: "project" | "news" }) {
  const posts = await getPosts(kind);
  const page = kind === "project" ? projectsPage : newsPage;
  return (
    <>
      <PageHero title={page.title[l]} intro={page.intro[l]} />
      {kind === "project" && (
        <Container className="pt-6">
          <section className="rounded-[2rem] border border-line p-4 sm:p-8">
            <h2 className="px-2 text-2xl text-forest">{mapText.title[l]}</h2>
            <div className="mt-6"><ProjectMap l={l} posts={posts} /></div>
          </section>
        </Container>
      )}
      {kind === "news" && (
        <>
          <Container className="pt-10">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {newsHighlights.map((h) => {
                const card = (
                  <figure className="relative overflow-hidden rounded-[1.5rem] bg-forest">
                    <Img src={h.image} alt="" className="aspect-[4/5] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" aria-hidden />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 text-lg leading-snug text-white">{h.title[l]}</figcaption>
                  </figure>
                );
                return (
                  <div key={h.image} className="w-[78%] shrink-0 snap-start sm:w-auto">
                    {h.post ? <Link href={href("post", l, { slug: h.post })} className="block transition hover:-translate-y-0.5">{card}</Link> : card}
                  </div>
                );
              })}
            </div>
          </Container>
          <Container className="pt-14">
            <h2 className="text-3xl text-forest">{inTheNews.title[l]}</h2>
            <div className="mt-4"><Prose md={inTheNews.intro[l]} /></div>
          </Container>
        </>
      )}
      <Container className="py-12">
        {kind === "news" && <h2 className="mb-4 text-2xl text-forest">{inTheNews.postsTitle[l]}</h2>}
        <LogList posts={posts} locale={l} />
      </Container>
      <NewsletterBand l={l} />
    </>
  );
}

function NewsletterBand({ l }: { l: Locale }) {
  return (
    <Container>
      <section className="flex flex-col gap-6 rounded-[2rem] bg-mist px-6 py-10 sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl text-forest sm:text-3xl">{newsletter.title[l]}</h2>
          <p className="mt-2 text-stone">{newsletter.text[l]}</p>
        </div>
        <NewsletterForm locale={l} />
      </section>
    </Container>
  );
}

async function PostDetail({ l, slug }: { l: Locale; slug: string }) {
  const post = await getPost(slug);
  if (!post) notFound();
  const lang = shownLang(post.body, l);
  const body = t(post.body, l);
  const place = projectLocations[post.slug]?.place;
  const author = authors[post.author ?? "plant-e"] ?? authors["plant-e"];
  const more = (await getPosts(post.kind)).filter((p) => p.slug !== slug).slice(0, 3);
  const url = `${SITE}${href("post", l, { slug })}`;
  const a = articleText;
  return (
    <>
      <article>
        <header>
          <Container className="max-w-4xl pb-8 pt-12 sm:pt-16">
            <Link href={href(post.kind === "project" ? "projects" : "news", l)} className="inline-block rounded-full bg-mist px-4 py-1.5 text-[14px] text-forest hover:bg-line">{post.kind === "project" ? ui.nav.projects[l] : ui.nav.news[l]}</Link>
            <h1 className="mt-6 text-[2rem] text-forest sm:text-5xl" lang={shownLang(post.title, l)}>{t(post.title, l)}</h1>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[1.5rem] bg-mist px-5 py-4">
              <div className="flex items-center gap-3">
                {author.avatar
                  ? <Img src={author.avatar} alt="" className="h-12 w-12 rounded-full bg-white object-contain p-1.5" />
                  : <span className="grid h-12 w-12 place-items-center rounded-full bg-water text-[15px] text-white" aria-hidden>{author.initials}</span>}
                <div className="leading-tight">
                  <p className="text-[15px] text-forest">
                    {a.by[l]}{" "}
                    {author.linkedin
                      ? <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-forest/30 underline-offset-4 hover:text-water">{author.name}</a>
                      : author.name}
                  </p>
                  <p className="mt-1 text-[14px] text-stone">{author.role[l]}</p>
                </div>
              </div>
              <p className="flex flex-wrap gap-2 text-[14px]">
                <time className="num rounded-full bg-white px-3 py-1 text-forest">{formatDate(post.date, l)}</time>
                <span className="rounded-full bg-white px-3 py-1 text-forest"><span className="num">{readMinutes(body)}</span> {a.readTime[l]}</span>
                {place && <span className="rounded-full bg-white px-3 py-1 text-forest">{place}</span>}
              </p>
            </div>
            <div className="mt-4 px-1"><ShareBar url={url} title={t(post.title, l)} labels={{ share: a.share[l], copy: a.copy[l], copied: a.copied[l], email: a.email[l] }} /></div>
          </Container>
          {post.image && <Container className="max-w-5xl"><Img src={post.image} alt="" className="max-h-[620px] w-full rounded-[2rem] object-cover" /></Container>}
        </header>
        <Container className="max-w-3xl py-12 sm:py-16">
          <div className="article-body"><Prose md={body} lang={lang} /></div>
          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tg) => <li key={tg} className="rounded-full bg-mist px-4 py-1.5 text-[14px] text-forest">{tg}</li>)}
            </ul>
          )}
        </Container>
      </article>
      {more.length > 0 && (
        <Container>
          <div className="grid gap-6 md:grid-cols-3">{more.map((p) => <PostCard key={p.slug} post={p} locale={l} />)}</div>
        </Container>
      )}
      <CtaBand locale={l} />
    </>
  );
}

/* ---------- About ---------- */
function About({ l }: { l: Locale }) {
  return (
    <>
      <PageHero eyebrow={about.missionLabel[l]} title={about.missionTitle[l]} intro={about.mission[l]} />
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-12">
        <Img src={about.image} alt="" className="w-full rounded-[2rem] object-cover lg:col-span-6" />
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="text-2xl text-forest">{about.visionLabel[l]}</h2>
          <div className="mt-5 space-y-5">{about.vision.map((v, i) => <p key={i}>{v[l]}</p>)}</div>
        </div>
      </Container>
      <Container className="grid gap-4 md:grid-cols-3">
        {([["technology", ui.nav.technology], ["team", ui.nav.team], ["careers", ui.nav.careers]] as const).map(([k, lab]) => (
          <Link key={k} href={href(k, l)} className="group flex items-center justify-between rounded-[1.5rem] bg-mist p-7 transition-colors hover:bg-lime">
            <span className="text-2xl text-forest">{lab[l]}</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-forest transition group-hover:translate-x-1" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </span>
          </Link>
        ))}
      </Container>
      <PartnerWall locale={l} list={aboutPartners} />
    </>
  );
}

function Team({ l }: { l: Locale }) {
  return (
    <>
      <PageHero title={team.title[l]} intro={team.intro[l]} />
      <Container className="py-10"><Img src={team.image} alt={team.title[l]} className="w-full rounded-[2rem] object-cover" /></Container>
      <Container>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map(([name, role, linkedin]) => (
            <li key={name} className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-mist px-6 py-5">
              <div>
                <p className="text-lg text-forest">{name}</p>
                <p className="mt-0.5 text-[14px] text-stone">{role}</p>
              </div>
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-forest transition-colors hover:bg-forest hover:text-white" aria-label={`${name} op LinkedIn`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand locale={l} />
    </>
  );
}

async function Careers({ l }: { l: Locale }) {
  const jobs = await getJobs();
  return (
    <>
      <PageHero title={careers.title[l]} intro={careers.intro[l]} />
      <Container className="max-w-4xl py-12">
        {jobs.length === 0 ? (
          <p className="rounded-[1.5rem] bg-mist p-8 text-xl text-forest">{careers.none[l]}</p>
        ) : (
          <ul className="space-y-3">
            {jobs.map((j) => (
              <li key={j.slug}>
                <Link href={href("job", l, { slug: j.slug })} className="block rounded-[1.5rem] bg-mist p-6 transition-colors hover:bg-line">
                  <h2 className="text-2xl text-forest">{t(j.title, l)}</h2>
                  <p className="mt-1 text-[15px] text-stone">{[j.location, j.hours].filter(Boolean).join(", ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-stone">{careers.open[l]}</p>
        <div className="mt-6"><Btn to="mailto:hr@plant-e.com?subject=Sollicitatie">{careers.apply[l]}</Btn></div>
      </Container>
    </>
  );
}

async function JobDetail({ l, slug }: { l: Locale; slug: string }) {
  const j = await getJob(slug);
  if (!j) notFound();
  return (
    <>
      <PageHero eyebrow={careers.title[l]} title={t(j.title, l)} intro={[j.location, j.hours].filter(Boolean).join(", ")} />
      <Container className="max-w-3xl py-12">
        <Prose md={t(j.body, l)} lang={shownLang(j.body, l)} />
        <div className="mt-10"><Btn to={`mailto:hr@plant-e.com?subject=${encodeURIComponent(t(j.title, l))}`}>{careers.apply[l]}</Btn></div>
      </Container>
    </>
  );
}

/* ---------- Contact, FAQ, newsletter, legal ---------- */
function Contact({ l }: { l: Locale }) {
  return (
    <>
      <PageHero title={contact.title[l]} intro={ui.collaborateText[l]} />
      <Container className="grid gap-8 py-12 lg:grid-cols-12">
        <div className="rounded-[2rem] border border-line p-6 sm:p-10 lg:col-span-7"><ContactForm locale={l} /></div>
        <aside className="h-fit rounded-[2rem] bg-forest p-8 text-white lg:col-span-5">
          <h2 className="text-xl">{contact.info[l]}</h2>
          <a href={`mailto:${contact.email}`} className="mt-5 block text-lime">{contact.email}</a>
          <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="mt-2 block text-white/80 hover:text-white">{contact.address}</a>
        </aside>
      </Container>
      <Container>
        <iframe src={contactMap} title={contact.address} loading="lazy" className="block h-[440px] w-full rounded-[2rem] border-0 bg-mist" />
      </Container>
    </>
  );
}

function Faq({ l }: { l: Locale }) {
  return (
    <>
      <PageHero title={faq.title[l]} />
      <Container className="max-w-4xl py-12">
        {faq.groups.map((g) => (
          <section key={g.title.nl} className="mb-12">
            <div className="mb-4 flex items-center gap-4">
              <Img src={faqImage} alt="" className="h-12 w-12 object-contain" />
              <h2 className="text-2xl text-forest">{g.title[l]}</h2>
            </div>
            <div className="space-y-2">
              {g.items.map((it) => (
                <details key={it.q.nl} className="group rounded-[1.25rem] bg-mist px-6 py-5 open:bg-white open:ring-1 open:ring-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg text-forest">
                    {it.q[l]}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xl leading-none text-forest transition group-open:rotate-45 group-open:bg-mist" aria-hidden>+</span>
                  </summary>
                  <div className="mt-4 pr-10"><Prose md={it.a[l]} /></div>
                </details>
              ))}
            </div>
          </section>
        ))}
        <section className="rounded-[2rem] bg-mist p-8">
          <h2 className="text-2xl text-forest">{inTheNews.title[l]}</h2>
          <p className="mt-3 text-stone">{inTheNews.faqText[l]}</p>
          <div className="mt-6"><Btn to={href("news", l)}>{inTheNews.faqCta[l]}</Btn></div>
        </section>
      </Container>
      <CtaBand locale={l} />
    </>
  );
}

function Newsletter({ l }: { l: Locale }) {
  return (
    <>
      <PageHero title={newsletter.title[l]} intro={newsletter.text[l]} />
      <Container className="py-12"><NewsletterForm locale={l} /></Container>
    </>
  );
}

function Legal({ k }: { k: LegalKey }) {
  const page = getLegal(k);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} />
      <Container className="max-w-3xl py-12"><Prose md={page.body} lang="nl" /></Container>
    </>
  );
}

/* ---------- Shop ---------- */
async function Shop({ l, cat }: { l: Locale; cat?: ShopCategory }) {
  const products = await getProducts(cat);
  const s = ui.shop;
  const cats = Object.keys(shopCategoryText) as ShopCategory[];
  const tab = (active: boolean) => `rounded-full px-5 py-2.5 text-[15px] transition-colors ${active ? "bg-forest text-white" : "bg-mist text-forest hover:bg-line"}`;
  return (
    <>
      <PageHero eyebrow={s.title[l]} title={cat ? shopCategoryText[cat].title[l] : s.all[l]} intro={cat ? shopCategoryText[cat].text[l] : s.intro[l]} image={shopImages.hero} />
      <Container className="py-10">
        <nav className="flex flex-wrap gap-2">
          <Link href={href("shop", l)} className={tab(!cat)}>{s.all[l]}</Link>
          {cats.map((c) => (
            <Link key={c} href={href("shopCategory", l, { cat: shopCategories[c][l] })} className={tab(cat === c)}>{shopCategoryText[c].title[l]}</Link>
          ))}
        </nav>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.slug} product={p} locale={l} />)}
        </div>
      </Container>
      {!cat && (
        <Container className="mt-6">
          <h2 className="text-3xl text-forest">{s.categories[l]}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cats.map((c) => (
              <Link key={c} href={href("shopCategory", l, { cat: shopCategories[c][l] })} className="group overflow-hidden rounded-[1.5rem] bg-mist">
                <div className="overflow-hidden"><Img src={shopImages.categories[c]} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-6">
                  <h3 className="text-xl text-forest">{shopCategoryText[c].title[l]}</h3>
                  <p className="mt-1 text-[15px] text-stone">{shopCategoryText[c].text[l]}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}
      <Container className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-[1.5rem] bg-mist">
          <Img src={shopImages.custom} alt="" className="aspect-[16/10] w-full object-cover" />
          <div className="p-6">
            <h2 className="text-2xl text-forest">{s.customTitle[l]}</h2>
            <p className="mt-2 text-stone">{s.customText[l]}</p>
            <div className="mt-5"><Btn to={href("contact", l)}>{ui.contactUs[l]}</Btn></div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] bg-mist">
          <Img src={shopImages.expo} alt="" className="aspect-[16/10] w-full object-cover" />
          <div className="p-6">
            <h2 className="text-2xl text-forest">{shopExtra.expoTitle[l]}</h2>
            <p className="mt-2 text-stone">{shopExtra.expoText[l]}</p>
            <div className="mt-5"><Btn to={href("news", l)}>{shopExtra.discover[l]}</Btn></div>
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-forest p-8 text-white">
          <h2 className="text-2xl">{newsletter.title[l]}</h2>
          <p className="mb-6 mt-2 text-white/70">{newsletter.text[l]}</p>
          <NewsletterForm locale={l} dark />
        </div>
      </Container>
    </>
  );
}

async function ProductPage({ l, slug }: { l: Locale; slug: string }) {
  const p = await getProduct(slug);
  if (!p) notFound();
  const s = ui.shop;
  const stock = p.stock === "in_stock" ? s.inStock : p.stock === "backorder" ? s.backorder : s.outOfStock;
  const lang = shownLang(p.body, l);
  return (
    <>
      <div className="px-3 pt-3 sm:px-4">
        <div className="relative h-32 overflow-hidden rounded-[2rem] bg-forest sm:h-48">
          <Img src={shopImages.productHeader} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        </div>
      </div>
      <Container className="py-10 sm:py-14">
        <Link href={href("shop", l)} className="inline-block rounded-full bg-mist px-4 py-1.5 text-[14px] text-forest hover:bg-line">{s.all[l]}</Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="grid gap-3">
            <Img src={p.images[0]} alt={t(p.title, l)} className="aspect-square w-full rounded-[2rem] bg-mist object-cover" />
            {p.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {p.images.slice(1, 9).map((src) => <a key={src} href={src} target="_blank" rel="noopener"><Img src={src} alt="" className="aspect-square w-full rounded-2xl bg-mist object-cover" /></a>)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl text-forest sm:text-4xl" lang={shownLang(p.title, l)}>{t(p.title, l)}</h1>
            <p className="num mt-5 text-2xl text-forest">{formatPrice(p.priceCents, l)} <span className="text-[14px] text-stone">{s.vat[l]}</span></p>
            <p className="mt-3"><span className={`inline-block rounded-full px-3 py-1 text-[14px] ${p.stock === "out_of_stock" ? "bg-mist text-stone" : "bg-lime/25 text-lime-dark"}`}>{stock[l]}{p.pickupOnly ? `, ${s.pickupOnly[l].toLowerCase()}` : ""}</span></p>
            {t(p.short, l) && <div className="mt-6"><Prose md={t(p.short, l)} lang={shownLang(p.short, l)} /></div>}
            <div className="mt-8">
              {p.stock === "out_of_stock"
                ? <Btn to={href("contact", l)} variant="outline">{s.contactForStock[l]}</Btn>
                : <AddToCart slug={p.slug} locale={l} />}
            </div>
            {t(p.body, l) && <div className="mt-10 rounded-[1.5rem] bg-mist p-6"><Prose md={t(p.body, l)} lang={lang} /></div>}
            <p className="mt-6 text-[14px] text-stone"><Link href={href("shipping", l)} className="underline">{ui.footer.shipping[l]}</Link></p>
          </div>
        </div>
      </Container>
    </>
  );
}

async function Cart({ l }: { l: Locale }) {
  const products = await getProducts();
  const list: CartProduct[] = products.map((p) => ({
    slug: p.slug, title: t(p.title, l), priceCents: p.priceCents, image: p.images[0] ?? null, pickupOnly: p.pickupOnly,
    buyable: p.stock !== "out_of_stock",
  }));
  return (
    <>
      <PageHero title={ui.shop.cart[l]} />
      <Container className="py-10"><CartView locale={l} products={list} /></Container>
    </>
  );
}

function Thanks({ l }: { l: Locale }) {
  return (
    <Container className="max-w-3xl py-16">
      <ClearCart />
      <Img src={shopImages.thanks} alt="" className="mb-10 aspect-[16/9] w-full rounded-[2rem] object-cover" />
      <h1 className="text-4xl text-forest">{ui.shop.thanksTitle[l]}</h1>
      <p className="mt-5 text-lg text-stone">{ui.shop.thanksText[l]}</p>
      <div className="mt-10"><Btn to={href("home", l)}>{ui.shop.toHome[l]}</Btn></div>
    </Container>
  );
}

/* ---------- Router ---------- */
export async function View({ m }: { m: Match }) {
  const l = m.locale;
  switch (m.key) {
    case "home": return <Home l={l} />;
    case "groundwater": case "soil": case "waterquality": return <Sensor l={l} k={m.key} />;
    case "technology": return <Technology l={l} />;
    case "projects": return <PostList l={l} kind="project" />;
    case "news": return <PostList l={l} kind="news" />;
    case "post": return <PostDetail l={l} slug={m.params.slug} />;
    case "about": return <About l={l} />;
    case "team": return <Team l={l} />;
    case "careers": return <Careers l={l} />;
    case "job": return <JobDetail l={l} slug={m.params.slug} />;
    case "contact": return <Contact l={l} />;
    case "faq": return <Faq l={l} />;
    case "newsletter": return <Newsletter l={l} />;
    case "privacy": return <Legal k="privacy-statement" />;
    case "cookies": return <Legal k="cookies" />;
    case "shipping": return <Legal k="bezorg-retour-voorwaarden" />;
    case "terms": return <Legal k="algemene-voorwaarden" />;
    case "shop": return <Shop l={l} />;
    case "shopCategory": return <Shop l={l} cat={m.params.cat as ShopCategory} />;
    case "product": return <ProductPage l={l} slug={m.params.slug} />;
    case "cart": return <Cart l={l} />;
    case "thanks": return <Thanks l={l} />;
  }
}

/* ---------- Metadata ---------- */
export async function titleFor(m: Match): Promise<{ title: string; description?: string; image?: string | null }> {
  const l = m.locale;
  switch (m.key) {
    case "home": return { title: "Plant-e", description: home.metaDescription[l], image: heroes.home.image };
    case "groundwater": case "soil": case "waterquality": {
      const p = sensorPages[m.key]; return { title: p.title[l], description: p.metaDescription[l], image: p.heroImage };
    }
    case "technology": return { title: ui.nav.technology[l], description: technology.metaDescription[l], image: heroes.technology.image };
    case "projects": return { title: projectsPage.title[l], description: projectsPage.intro[l] };
    case "news": return { title: newsPage.title[l], description: newsPage.intro[l] };
    case "post": { const p = await getPost(m.params.slug); return p ? { title: t(p.title, l), description: t(p.excerpt, l), image: p.image } : { title: "Plant-e" }; }
    case "about": return { title: about.title[l], description: about.mission[l] };
    case "team": return { title: team.title[l], description: team.intro[l] };
    case "careers": return { title: careers.title[l], description: careers.intro[l] };
    case "job": { const j = await getJob(m.params.slug); return { title: j ? t(j.title, l) : careers.title[l] }; }
    case "contact": return { title: contact.title[l] };
    case "faq": return { title: faq.title[l] };
    case "newsletter": return { title: newsletter.title[l] };
    case "privacy": return { title: ui.footer.privacy[l] };
    case "cookies": return { title: ui.footer.cookies[l] };
    case "shipping": return { title: ui.footer.shipping[l] };
    case "terms": return { title: ui.footer.terms[l] };
    case "shop": return { title: ui.shop.title[l], description: ui.shop.intro[l] };
    case "shopCategory": return { title: `${shopCategoryText[m.params.cat].title[l]} | Shop` };
    case "product": { const p = await getProduct(m.params.slug); return p ? { title: t(p.title, l), image: p.images[0] } : { title: "Shop" }; }
    case "cart": return { title: ui.shop.cart[l] };
    case "thanks": return { title: ui.shop.thanksTitle[l] };
  }
}
