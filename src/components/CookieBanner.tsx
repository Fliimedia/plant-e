"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { href } from "@/lib/routes";
import { ui } from "@/content/site";
import { CONSENT_KEY as KEY } from "@/lib/analytics";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

// The consent defaults (including an earlier choice) are set by the bootstrap script in <head>.
function grant(all: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: all ? "granted" : "denied",
    ad_storage: all ? "granted" : "denied",
    ad_user_data: all ? "granted" : "denied",
    ad_personalization: all ? "granted" : "denied",
  });
}

export default function CookieBanner() {
  const pathname = usePathname();
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
  const [show, setShow] = useState(false);
  useEffect(() => {
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch { /* storage unavailable */ }
    if (!v) setShow(true);
  }, []);
  const choose = (all: boolean) => {
    try { localStorage.setItem(KEY, all ? "all" : "functional"); } catch { /* storage unavailable */ }
    grant(all); setShow(false);
  };
  if (pathname.startsWith("/beheer")) return null;
  const c = ui.cookie;
  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}</Script>
      )}
      {show && (
        <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-forest/15 sm:inset-x-6 sm:bottom-6" role="dialog" aria-label="Cookies">
          <p className="text-sm leading-relaxed text-stone">{c.text[locale]} <Link href={href("cookies", locale)} className="underline">{c.more[locale]}</Link></p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => choose(true)} className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white hover:bg-moss">{c.accept[locale]}</button>
            <button onClick={() => choose(false)} className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-forest hover:bg-mist">{c.decline[locale]}</button>
          </div>
        </div>
      )}
    </>
  );
}
