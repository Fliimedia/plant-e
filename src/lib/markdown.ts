import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function renderMarkdown(md: string): string {
  const html = marked.parse(md ?? "", { async: false, breaks: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "video", "source", "h1", "h2", "figure", "figcaption"]),
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading"],
      video: ["src", "controls", "playsinline", "preload", "poster"],
      source: ["src", "type"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy" } }),
      a: (tag, attribs) =>
        /^https?:/.test(attribs.href ?? "")
          ? { tagName: "a", attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } }
          : { tagName: "a", attribs },
    },
  });
}

export function formatPrice(cents: number, locale: "nl" | "en") {
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function formatDate(d: string, locale: "nl" | "en") {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}
