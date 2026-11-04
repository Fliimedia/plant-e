import Link from "next/link";
import { notFound } from "next/navigation";
import { href, shopCategories, type Locale, type Match, type ShopCategory } from "@/lib/routes";
import {
  ui, home, sensorPages, sensorShared, technology, about, team, careers, contact, newsletter, newsPage, projectsPage, faq,
  shopCategoryText, productPartners, aboutPartners, newsHighlights, inTheNews, faqImage, shopImages, shopExtra, contactMap,
} from "@/content/site";
import { getPosts, getPost, getProducts, getProduct, getJobs, getJob, getLegal, t, shownLang, type LegalKey } from "@/lib/data";
import { renderMarkdown, formatDate, formatPrice } from "@/lib/markdown";
import { Container, Btn, Eyebrow, PageHero, Img, PostCard, ProductCard, PartnerWall, CtaBand } from "./ui";
import { ContactForm, BrochureForm, NewsletterForm } from "@/components/Forms";
import { AddToCart, CartView, ClearCart, type CartProduct } from "@/components/ShopClient";

const Prose = ({ md, lang }: { md: string; lang?: string }) => (
  <div className="prose-plant text-[17px]" lang={lang} dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
);

const Icon = ({ d, className }: { d: string; className?: string }) => (
  <svg viewBox="0 0 512 545.5" fill="currentColor" className={className} aria-hidden><path d={d} /></svg>
);

/* ---------- Home ---------- */
async function Home({ l }: { l: Locale }) {
  const projects = (await getPosts()).slice(0, 3);
  const sensors = (["groundwater", "soil", "waterquality"] as const).map((k) => ({ k, ...home.sensors[k] }));
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-white">
        <Img src={home.sensors.groundwater.image} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/20" aria-hidden />
        <Container className="relative py-24 sm:py-32 lg:py-40">
          <Eyebrow light>{home.subtitle[l]}</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">{home.title[l]}</h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn to={href("groundwater", l)} variant="lime">{ui.nav.products[l]}</Btn>
            <Btn to={href("technology", l)} variant="light">{ui.nav.technology[l]}</Btn>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {sensors.map((s) => (
            <article key={s.k} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
              <div className="aspect-[4/3] overflow-hidden bg-mist">
                <Img src={s.image} alt={s.label[l]} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <Eyebrow>SensorStick</Eyebrow>
                <h2 className="text-2xl font-extrabold text-forest">{s.label[l]}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-stone">{s.text[l]}</p>
                <div className="mt-auto pt-6"><Btn to={href(s.k, l)} variant="outline">{ui.readMore[l]}</Btn></div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <section className="bg-mist">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>{ui.nav.technology[l]}</Eyebrow>
            <h2 className="text-3xl font-extrabold text-forest sm:text-4xl">{home.techTitle[l]}</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone">{home.techText[l]}</p>
            <div className="mt-8"><Btn to={href("technology", l)}>{home.techCta[l]}</Btn></div>
          </div>
          <Img src="/media/2023/10/Plant-e-technology-teaser-1.png" alt="" className="w-full rounded-3xl" />
        </Container>
      </section>

      <Container className="py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{home.projectsTitle[l]}</Eyebrow>
            <p className="text-lg leading-relaxed text-stone">{home.projectsText[l]}</p>
          </div>
          <Btn to={href("projects", l)} variant="outline">{ui.allProjects[l]}</Btn>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => <PostCard key={p.slug} post={p} locale={l} />)}
        </div>
      </Container>

      <PartnerWall locale={l} />
    </>
  );
}

/* ---------- Sensor product pages ---------- */
async function Sensor({ l, k }: { l: Locale; k: "groundwater" | "soil" | "waterquality" }) {
  const p = sensorPages[k];
  const projects = (await getPosts("project")).filter((x) => x.tags.some((tg) => /sensor|waterkwaliteit/i.test(tg))).slice(0, 3);
  return (
    <>
      <section className="bg-mist">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>SensorStick</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.1] text-forest sm:text-5xl">{p.title[l]}</h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">{p.intro[0][l]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="#brochure">{ui.forms.downloadBrochure[l]}</Btn>
              <Btn to={href("contact", l)} variant="outline">{ui.contactUs[l]}</Btn>
            </div>
          </div>
          <Img src={p.heroImage} alt={p.title[l]} className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
        </Container>
      </section>

      <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink/85">
          {p.intro.slice(1).map((para, i) => <p key={i}>{para[l]}</p>)}
        </div>
        <aside className="h-fit rounded-3xl bg-forest p-8 text-white">
          <h2 className="text-xl font-extrabold">{sensorShared.applications[l]}</h2>
          <ul className="mt-5 space-y-3">
            {p.applications.map((a) => (
              <li key={a.nl} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-lime" aria-hidden />{a[l]}</li>
            ))}
          </ul>
        </aside>
      </Container>

      <Container>
        <Img src={p.dashboardImage} alt="Dashboard" className="w-full rounded-[2rem] border border-line" />
      </Container>

      <Container className="py-20">
        <h2 className="text-3xl font-extrabold text-forest sm:text-4xl">{sensorShared.specs[l]}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {p.specs.map((g) => (
            <div key={g.title.nl} className="rounded-3xl border border-line p-7">
              <h3 className="mb-5 text-lg font-extrabold text-forest">{g.title[l]}</h3>
              <dl className="divide-y divide-line">
                {g.rows.map((r) => (
                  <div key={r.label.nl} className="grid grid-cols-[1fr_1.2fr] gap-4 py-3 text-[15px]">
                    <dt className="text-stone">{r.label[l]}</dt>
                    <dd className="font-semibold text-forest">{r.values.map((v) => <span key={v.nl} className="block">{v[l]}</span>)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.useCases.map((u) => (
            <div key={u.title.nl} className="overflow-hidden rounded-3xl bg-mist">
              <Img src={u.image} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-extrabold text-forest">{u.title[l]}</h3>
                {u.items && <ul className="mt-3 space-y-1 text-sm text-stone">{u.items.map((i) => <li key={i.nl}>{i[l]}</li>)}</ul>}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <section id="brochure" className="mt-20 scroll-mt-24 bg-mist">
        <Container className="grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>Brochure</Eyebrow>
            <h2 className="text-3xl font-extrabold text-forest">{sensorShared.brochureTitle[l]}</h2>
            <p className="mt-4 text-lg text-stone">{sensorShared.brochureText[l]}</p>
          </div>
          <BrochureForm locale={l} product={p.brochure.label.nl} pdf={p.brochure.pdf} />
        </Container>
      </section>

      {projects.length > 0 && (
        <Container className="pt-20">
          <h2 className="text-3xl font-extrabold text-forest">{sensorShared.projectsTitle[l]}</h2>
          <p className="mt-4 max-w-3xl text-lg text-stone">{sensorShared.projectsText[l]}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{projects.map((x) => <PostCard key={x.slug} post={x} locale={l} />)}</div>
          <div className="mt-8"><Btn to={href("projects", l)} variant="outline">{sensorShared.allProjects[l]}</Btn></div>
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
      <PageHero eyebrow={ui.nav.technology[l]} title={tch.title[l]} intro={tch.intro[l]}>
        <Icon d={tch.icon} className="mt-8 h-12 w-12 text-lime-dark" />
      </PageHero>
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        {tch.images.map((src) => <Img key={src} src={src} alt="" className="w-full rounded-3xl bg-mist" />)}
      </Container>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-3xl font-extrabold text-forest">{tch.explainedTitle[l]}</h2>
        <ol className="space-y-6">
          {tch.explained.map((s, i) => (
            <li key={i} className="flex gap-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime font-display font-extrabold text-forest">{i + 1}</span>
              <p className="pt-1.5 text-[17px] leading-relaxed text-ink/85">{s[l]}</p>
            </li>
          ))}
        </ol>
      </Container>
      <section className="mt-20 bg-forest text-white">
        <Container className="py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{tch.impactTitle[l]}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tch.impact.map((x) => (
              <div key={x.title.nl} className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                <Icon d={x.icon} className="mb-5 h-10 w-10 text-lime" />
                <h3 className="text-xl font-extrabold text-lime">{x.title[l]}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{x.text[l]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
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
      <PageHero eyebrow={kind === "project" ? ui.nav.projects[l] : ui.nav.news[l]} title={page.title[l]} intro={page.intro[l]} />
      {kind === "news" && (
        <>
          <Container className="pt-12">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {newsHighlights.map((h) => {
                const card = (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest">
                    <Img src={h.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" aria-hidden />
                    <h2 className="absolute inset-x-0 bottom-0 p-6 font-display text-xl font-extrabold leading-snug text-white">{h.title[l]}</h2>
                  </div>
                );
                return (
                  <div key={h.image} className="w-[78%] shrink-0 snap-start sm:w-auto">
                    {h.post ? <Link href={href("post", l, { slug: h.post })} className="block transition hover:-translate-y-0.5">{card}</Link> : card}
                  </div>
                );
              })}
            </div>
          </Container>
          <Container className="max-w-4xl pt-14">
            <h2 className="text-3xl font-extrabold text-forest">{inTheNews.title[l]}</h2>
            <div className="mt-4"><Prose md={inTheNews.intro[l]} /></div>
            <h2 className="mt-12 text-2xl font-extrabold text-forest">{inTheNews.postsTitle[l]}</h2>
          </Container>
        </>
      )}
      <Container className={kind === "news" ? "py-8" : "py-16"}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} locale={l} />)}</div>
      </Container>
      <NewsletterBand l={l} />
    </>
  );
}

function NewsletterBand({ l }: { l: Locale }) {
  return (
    <Container>
      <div className="flex flex-col gap-6 rounded-[2rem] bg-forest px-6 py-12 text-white sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">{newsletter.title[l]}</h2>
          <p className="mt-2 text-white/75">{newsletter.text[l]}</p>
        </div>
        <NewsletterForm locale={l} dark />
      </div>
    </Container>
  );
}

async function PostDetail({ l, slug }: { l: Locale; slug: string }) {
  const post = await getPost(slug);
  if (!post) notFound();
  const lang = shownLang(post.body, l);
  const more = (await getPosts(post.kind)).filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <>
      <article>
        <Container className="max-w-4xl py-14 sm:py-20">
          <Link href={href(post.kind === "project" ? "projects" : "news", l)} className="text-sm font-bold text-lime-dark">← {post.kind === "project" ? ui.nav.projects[l] : ui.nav.news[l]}</Link>
          <p className="mt-6 text-sm font-semibold text-stone"><time>{formatDate(post.date, l)}</time>{post.tags.length > 0 && ` • ${post.tags.join(", ")}`}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-forest sm:text-5xl" lang={shownLang(post.title, l)}>{t(post.title, l)}</h1>
        </Container>
        {post.image && <Container className="max-w-5xl"><Img src={post.image} alt="" className="max-h-[560px] w-full rounded-[2rem] object-cover" /></Container>}
        <Container className="max-w-3xl py-14"><Prose md={t(post.body, l)} lang={lang} /></Container>
      </article>
      {more.length > 0 && (
        <Container className="border-t border-line pt-16">
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
      <PageHero eyebrow={ui.nav.about[l]} title={about.missionTitle[l]} intro={about.mission[l]} />
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
        <Img src={about.image} alt="" className="w-full rounded-[2rem] object-cover" />
        <div>
          <Eyebrow>{about.visionLabel[l]}</Eyebrow>
          <div className="space-y-5 text-[17px] leading-relaxed text-ink/85">{about.vision.map((v, i) => <p key={i}>{v[l]}</p>)}</div>
        </div>
      </Container>
      <Container className="grid gap-6 md:grid-cols-3">
        {([["technology", ui.nav.technology], ["team", ui.nav.team], ["careers", ui.nav.careers]] as const).map(([k, lab]) => (
          <Link key={k} href={href(k, l)} className="group flex items-center justify-between rounded-3xl bg-mist p-8 transition hover:bg-lime">
            <span className="font-display text-2xl font-extrabold text-forest">{lab[l]}</span>
            <span className="text-2xl text-forest transition group-hover:translate-x-1">→</span>
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
      <PageHero eyebrow={ui.nav.team[l]} title={team.title[l]} intro={team.intro[l]} />
      <Container className="py-16"><Img src={team.image} alt={team.title[l]} className="w-full rounded-[2rem] object-cover" /></Container>
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {team.members.map(([name, role, linkedin]) => (
            <div key={name} className="flex flex-col rounded-3xl border border-line p-6">
              <h3 className="font-display text-lg font-extrabold text-forest">{name}</h3>
              <p className="mt-1 text-sm text-stone">{role}</p>
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-bold text-forest hover:text-lime-dark" aria-label={`${name} op LinkedIn`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
      <CtaBand locale={l} />
    </>
  );
}

async function Careers({ l }: { l: Locale }) {
  const jobs = await getJobs();
  return (
    <>
      <PageHero eyebrow={ui.nav.careers[l]} title={careers.title[l]} intro={careers.intro[l]} />
      <Container className="max-w-4xl py-16">
        {jobs.length === 0 ? (
          <p className="rounded-3xl bg-mist p-8 text-lg font-semibold text-forest">{careers.none[l]}</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {jobs.map((j) => (
              <li key={j.slug}>
                <Link href={href("job", l, { slug: j.slug })} className="flex items-center justify-between gap-4 py-6">
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-forest">{t(j.title, l)}</h2>
                    <p className="mt-1 text-sm text-stone">{[j.location, j.hours].filter(Boolean).join(" • ")}</p>
                  </div>
                  <span className="text-2xl text-forest">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-[17px] leading-relaxed text-stone">{careers.open[l]}</p>
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
      <PageHero eyebrow={ui.nav.careers[l]} title={t(j.title, l)} intro={[j.location, j.hours].filter(Boolean).join(" • ")} />
      <Container className="max-w-3xl py-14">
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
      <PageHero eyebrow={ui.nav.contact[l]} title={contact.title[l]} intro={ui.collaborateText[l]} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr]">
        <ContactForm locale={l} />
        <aside className="h-fit rounded-3xl bg-forest p-8 text-white">
          <h2 className="text-xl font-extrabold">{contact.info[l]}</h2>
          <a href={`mailto:${contact.email}`} className="mt-5 block font-semibold text-lime">{contact.email}</a>
          <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="mt-3 block text-white/80 underline-offset-4 hover:underline">{contact.address}</a>
        </aside>
      </Container>
      <Container>
        <iframe src={contactMap} title={contact.address} loading="lazy" className="h-[420px] w-full rounded-[2rem] border-0 bg-mist" />
      </Container>
    </>
  );
}

function Faq({ l }: { l: Locale }) {
  return (
    <>
      <PageHero eyebrow="FAQ" title={faq.title[l]} />
      <Container className="max-w-4xl py-16">
        {faq.groups.map((g) => (
          <section key={g.title.nl} className="mb-14">
            <div className="mb-5 flex items-center gap-4">
              <Img src={faqImage} alt="" className="h-14 w-14 object-contain" />
              <h2 className="text-2xl font-extrabold text-forest">{g.title[l]}</h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {g.items.map((it) => (
                <details key={it.q.nl} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-bold text-forest">
                    {it.q[l]}
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mist text-lg transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <div className="mt-4 pr-10"><Prose md={it.a[l]} /></div>
                </details>
              ))}
            </div>
          </section>
        ))}
        <section className="rounded-3xl bg-mist p-8">
          <h2 className="text-2xl font-extrabold text-forest">{inTheNews.title[l]}</h2>
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
      <PageHero eyebrow={ui.footer.newsletter[l]} title={newsletter.title[l]} intro={newsletter.text[l]} />
      <Container className="py-16"><NewsletterForm locale={l} /></Container>
    </>
  );
}

function Legal({ k }: { k: LegalKey }) {
  const page = getLegal(k);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} />
      <Container className="max-w-3xl py-14"><Prose md={page.body} lang="nl" /></Container>
    </>
  );
}

/* ---------- Shop ---------- */
async function Shop({ l, cat }: { l: Locale; cat?: ShopCategory }) {
  const products = await getProducts(cat);
  const s = ui.shop;
  const cats = Object.keys(shopCategoryText) as ShopCategory[];
  return (
    <>
      <PageHero eyebrow={s.title[l]} title={cat ? shopCategoryText[cat].title[l] : s.all[l]} intro={cat ? shopCategoryText[cat].text[l] : s.intro[l]} image={shopImages.hero} />
      <Container className="py-10">
        <div className="flex flex-wrap gap-2">
          <Link href={href("shop", l)} className={`rounded-full px-5 py-2.5 text-sm font-bold ${!cat ? "bg-forest text-white" : "bg-mist text-forest hover:bg-line"}`}>{s.all[l]}</Link>
          {cats.map((c) => (
            <Link key={c} href={href("shopCategory", l, { cat: shopCategories[c][l] })}
              className={`rounded-full px-5 py-2.5 text-sm font-bold ${cat === c ? "bg-forest text-white" : "bg-mist text-forest hover:bg-line"}`}>{shopCategoryText[c].title[l]}</Link>
          ))}
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.slug} product={p} locale={l} />)}
        </div>
      </Container>
      {!cat && (
        <Container className="mt-10">
          <h2 className="text-3xl font-extrabold text-forest">{s.categories[l]}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {cats.map((c) => (
              <Link key={c} href={href("shopCategory", l, { cat: shopCategories[c][l] })} className="group overflow-hidden rounded-3xl border border-line bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-mist"><Img src={shopImages.categories[c]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-extrabold text-forest">{shopCategoryText[c].title[l]}</h3>
                  <p className="mt-2 text-[15px] text-stone">{shopCategoryText[c].text[l]}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-forest">{shopExtra.discover[l]} →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}
      <Container className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-3xl bg-mist">
          <Img src={shopImages.custom} alt="" className="aspect-[16/9] w-full object-cover" />
          <div className="p-8">
            <h2 className="text-2xl font-extrabold text-forest">{s.customTitle[l]}</h2>
            <p className="mt-3 text-stone">{s.customText[l]}</p>
            <div className="mt-6"><Btn to={href("contact", l)}>{ui.contactUs[l]}</Btn></div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-mist">
          <Img src={shopImages.expo} alt="" className="aspect-[16/9] w-full object-cover" />
          <div className="p-8">
            <h2 className="text-2xl font-extrabold text-forest">{shopExtra.expoTitle[l]}</h2>
            <p className="mt-3 text-stone">{shopExtra.expoText[l]}</p>
            <div className="mt-6"><Btn to={href("news", l)}>{shopExtra.discover[l]}</Btn></div>
          </div>
        </div>
        <div className="rounded-3xl bg-forest p-8 text-white">
          <h2 className="text-2xl font-extrabold">{newsletter.title[l]}</h2>
          <p className="mb-6 mt-3 text-white/75">{newsletter.text[l]}</p>
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
    <div className="relative h-40 overflow-hidden bg-forest sm:h-56">
      <Img src={shopImages.productHeader} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
    </div>
    <Container className="py-12 sm:py-16">
      <Link href={href("shop", l)} className="text-sm font-bold text-lime-dark">← {s.all[l]}</Link>
      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <div className="grid gap-3">
          <Img src={p.images[0]} alt={t(p.title, l)} className="aspect-square w-full rounded-[2rem] bg-mist object-cover" />
          {p.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {p.images.slice(1, 9).map((src) => <a key={src} href={src} target="_blank" rel="noopener"><Img src={src} alt="" className="aspect-square w-full rounded-2xl bg-mist object-cover" /></a>)}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-forest sm:text-4xl" lang={shownLang(p.title, l)}>{t(p.title, l)}</h1>
          <p className="mt-4 text-2xl font-bold text-forest">{formatPrice(p.priceCents, l)} <span className="text-sm font-normal text-stone">{s.vat[l]}</span></p>
          <p className={`mt-2 text-sm font-semibold ${p.stock === "out_of_stock" ? "text-stone" : "text-lime-dark"}`}>{stock[l]}{p.pickupOnly ? ` • ${s.pickupOnly[l]}` : ""}</p>
          {t(p.short, l) && <div className="mt-6"><Prose md={t(p.short, l)} lang={shownLang(p.short, l)} /></div>}
          <div className="mt-8">
            {p.stock === "out_of_stock"
              ? <Btn to={href("contact", l)} variant="outline">{s.contactForStock[l]}</Btn>
              : <AddToCart slug={p.slug} locale={l} />}
          </div>
          {t(p.body, l) && <div className="mt-10 border-t border-line pt-8"><Prose md={t(p.body, l)} lang={lang} /></div>}
          <p className="mt-8 text-sm text-stone"><Link href={href("shipping", l)} className="underline">{ui.footer.shipping[l]}</Link></p>
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
      <Container className="py-12"><CartView locale={l} products={list} /></Container>
    </>
  );
}

function Thanks({ l }: { l: Locale }) {
  return (
    <Container className="max-w-2xl py-24 text-center">
      <ClearCart />
      <Img src={shopImages.thanks} alt="" className="mx-auto mb-10 aspect-[16/9] w-full rounded-[2rem] object-cover" />
      <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full bg-lime text-3xl text-forest">✓</div>
      <h1 className="text-4xl font-extrabold text-forest">{ui.shop.thanksTitle[l]}</h1>
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
    case "home": return { title: "Plant-e", description: home.metaDescription[l], image: home.sensors.groundwater.image };
    case "groundwater": case "soil": case "waterquality": {
      const p = sensorPages[m.key]; return { title: p.title[l], description: p.metaDescription[l], image: p.heroImage };
    }
    case "technology": return { title: ui.nav.technology[l], description: technology.metaDescription[l] };
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
