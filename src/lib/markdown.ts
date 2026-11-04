import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const embed = (src: string, title: string) =>
  `<div class="embed"><iframe src="${src}" title="${title}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;

/** A YouTube or Vimeo link on its own line becomes a player, like WordPress did. */
function embedVideos(md: string) {
  return md.replace(/^[ \t]*<?(https?:\/\/[^\s>]+)>?[ \t]*$/gm, (line, url: string) => {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) return embed(`https://www.youtube-nocookie.com/embed/${yt[1]}`, "YouTube video");
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return embed(`https://player.vimeo.com/video/${vm[1]}?dnt=1`, "Vimeo video");
    return line;
  });
}

/** Paragraphs that hold only images (a WordPress gallery) become an image grid. */
function galleries(html: string) {
  return html.replace(/<p>((?:\s*<img[^>]*>\s*){2,})<\/p>/g, (_, imgs: string) => {
    const n = (imgs.match(/<img/g) ?? []).length;
    return `<div class="gallery gallery-${Math.min(n, 3)}">${imgs.trim()}</div>`;
  });
}

export function renderMarkdown(md: string): string {
  const html = marked.parse(embedVideos(md ?? ""), { async: false, breaks: false }) as string;
  return galleries(sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "video", "source", "h1", "h2", "figure", "figcaption", "iframe"]),
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading"],
      video: ["src", "controls", "playsinline", "preload", "poster"],
      source: ["src", "type"],
      iframe: ["src", "title", "loading", "allow", "allowfullscreen"],
      div: ["class"],
    },
    allowedClasses: { div: ["embed"] },
    allowedIframeHostnames: ["www.youtube-nocookie.com", "player.vimeo.com"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy" } }),
      a: (tag, attribs) =>
        /^https?:/.test(attribs.href ?? "")
          ? { tagName: "a", attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } }
          : { tagName: "a", attribs },
    },
  }));
}

export function formatPrice(cents: number, locale: "nl" | "en") {
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function formatDate(d: string, locale: "nl" | "en") {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}
