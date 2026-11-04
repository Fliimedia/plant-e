import type { Metadata } from "next";
import "../app/globals.css";
import { CartProvider } from "@/components/Cart";
import CookieBanner from "@/components/CookieBanner";

export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com"),
  title: { default: "Plant-e", template: "%s | Plant-e" },
  icons: { icon: "/media/2023/11/cropped-Tekengebied-3-270x270.png" },
};

export default function RootShell({ lang, children }: { lang: "nl" | "en"; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body>
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
