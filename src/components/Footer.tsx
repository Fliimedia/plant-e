import Link from "next/link";
import { href, type Locale } from "@/lib/routes";
import { ui, brand, contact, shopImages } from "@/content/site";

export default function Footer({ locale, shop = false }: { locale: Locale; shop?: boolean }) {
  const f = ui.footer;
  const col = "flex flex-col gap-2.5 text-[15px] text-white/75";
  const a = "transition-colors hover:text-lime";
  return (
    <footer className="mt-24 bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-10"><div className="waterline waterline-light" aria-hidden /></div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt="Plant-e" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-5 text-[15px] leading-relaxed text-white/70">
            {contact.address}<br />
            <a href={`mailto:${contact.email}`} className={a}>{contact.email}</a>
          </p>
          <a href="https://eic.ec.europa.eu/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-[3px] bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/2023/02/cropped-image001.png" alt={f.eic[locale]} className="h-10 w-auto" />
          </a>
          {shop && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shopImages.euLogo} alt="EU" className="ml-3 mt-6 inline-block h-14 w-auto rounded-[3px] bg-white p-2 align-top" />
          )}
        </div>
        <div>
          <h3 className="mb-4 text-[15px] text-white">{f.products[locale]}</h3>
          <div className={col}>
            <Link className={a} href={href("technology", locale)}>{ui.nav.technology[locale]}</Link>
            <Link className={a} href={href("groundwater", locale)}>{locale === "nl" ? "Grondwaterstand SensorStick" : "Groundwater Level SensorStick"}</Link>
            <Link className={a} href={href("soil", locale)}>{locale === "nl" ? "Bodemvocht SensorStick" : "Soil Moisture SensorStick"}</Link>
            <Link className={a} href={href("waterquality", locale)}>{locale === "nl" ? "Waterkwaliteit SensorStick" : "Water Quality SensorStick"}</Link>
            <Link className={a} href={href("shop", locale)}>{f.webshop[locale]}</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-[15px] text-white">{f.contact[locale]}</h3>
          <div className={col}>
            <Link className={a} href={href("contact", locale)}>{f.form[locale]}</Link>
            <Link className={a} href={href("newsletter", locale)}>{f.newsletter[locale]}</Link>
            <a className={a} href="https://goo.gl/maps/sa81uPWRbTJ52v8D7" target="_blank" rel="noopener noreferrer">{f.route[locale]}</a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-[15px] text-white">{f.about[locale]}</h3>
          <div className={col}>
            <Link className={a} href={href("faq", locale)}>FAQ</Link>
            <Link className={a} href={href("news", locale)}>{ui.nav.news[locale]}</Link>
            <Link className={a} href={href("team", locale)}>{ui.nav.team[locale]}</Link>
            <Link className={a} href={href("careers", locale)}>{ui.nav.careers[locale]}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className={a} href={href("privacy", locale)}>{f.privacy[locale]}</Link>
            <Link className={a} href={href("cookies", locale)}>{f.cookies[locale]}</Link>
            <Link className={a} href={href("shipping", locale)}>{f.shipping[locale]}</Link>
            <Link className={a} href={href("terms", locale)}>{f.terms[locale]}</Link>
          </div>
          <div className="flex items-center gap-5">
            <span>Plant-e BV © {new Date().getFullYear()}</span>
            <a href="https://flii.nl" target="_blank" rel="noopener noreferrer" className="flii-shine font-medium">built by flii</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
