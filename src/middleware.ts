import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function shopRedirect(req: NextRequest) {
  const p = req.nextUrl.pathname.replace(/\/$/, "");
  let to = "/shop";
  const m = p.match(/^\/(product|categorie)\/([^/]+)/);
  if (m) to = m[1] === "product" ? `/shop/product/${m[2]}` : `/shop/categorie/${m[2]}`;
  else if (p === "/cart" || p === "/checkout") to = "/shop/winkelwagen";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plant-e.com";
  return NextResponse.redirect(new URL(to, site), 301);
}

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("shop.")) return shopRedirect(req);
  if (host.startsWith("www.")) {
    const url = req.nextUrl.clone(); url.host = host.slice(4); url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = req.nextUrl;

  // First visit to the Dutch home page from a non-Dutch browser goes to English.
  if (pathname === "/" && !req.cookies.get("lang")) {
    const al = (req.headers.get("accept-language") ?? "").toLowerCase();
    const first = al.split(",")[0]?.trim() ?? "";
    const isBot = /bot|crawl|spider|slurp|facebookexternalhit|linkedin/i.test(req.headers.get("user-agent") ?? "");
    if (first && !first.startsWith("nl") && !isBot) {
      const res = NextResponse.redirect(new URL("/en", req.url));
      res.cookies.set("lang", "en", { path: "/", maxAge: 31536000, sameSite: "lax" });
      return res;
    }
  }

  if (pathname.startsWith("/beheer") && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    let res = NextResponse.next({ request: req });
    const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({ request: req });
          list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    });
    await sb.auth.getUser();
    return res;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/|api/|media/|favicon.ico).*)"] };
