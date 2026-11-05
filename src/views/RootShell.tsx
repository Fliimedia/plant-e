import type { Metadata } from "next";
import Script from "next/script";
import "../app/globals.css";
import { CartProvider } from "@/components/Cart";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { GA_ID, bootstrapScript } from "@/lib/analytics";

export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com"),
  title: { default: "Plant-e", template: "%s | Plant-e" },
  icons: { icon: "/media/2023/11/cropped-Tekengebied-3-270x270.png" },
};

// Only the live site reports to GA, so previews and local builds do not pollute the data.
const ga = process.env.VERCEL_ENV === "production" || process.env.GA_ALWAYS === "1";
const gtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

export default function RootShell({ lang, children }: { lang: "nl" | "en"; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        {(ga || gtm) && <script dangerouslySetInnerHTML={{ __html: bootstrapScript({ ga }) }} />}
      </head>
      <body>
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
