"use client";
import { useState } from "react";

type Labels = { share: string; copy: string; copied: string; email: string };

const icons: Record<string, React.ReactNode> = {
  linkedin: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />,
  x: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2z" />,
  facebook: <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0014.3 4.3c-2.3 0-3.86 1.4-3.86 3.97v2.23H7.8v3h2.64V21h3.06z" />,
  whatsapp: <path d="M12.04 2a9.9 9.9 0 00-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1012.04 2zm5.8 14.05c-.24.68-1.42 1.3-1.95 1.36-.5.06-1.13.09-1.83-.12a16.6 16.6 0 01-1.66-.61c-2.92-1.26-4.83-4.2-4.98-4.4-.14-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.3.59-.37.78-.37h.57c.18 0 .43-.07.67.51.24.6.83 2.04.9 2.19.08.15.12.32.03.52-.1.2-.15.32-.3.5-.14.17-.3.38-.43.51-.15.15-.3.3-.13.6.18.29.78 1.28 1.67 2.08 1.15 1.02 2.12 1.34 2.42 1.49.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.34.07.13.07.71-.17 1.39z" />,
  mail: <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1 2.3V17h16V7.3l-8 5.4-8-5.4zM5.2 7l6.8 4.6L18.8 7H5.2z" />,
  link: <path d="M10.6 13.4a1 1 0 010-1.4l3.5-3.5a3 3 0 114.2 4.2l-2 2a1 1 0 11-1.4-1.4l2-2a1 1 0 10-1.4-1.4l-3.5 3.5a1 1 0 01-1.4 0zm2.8-2.8a1 1 0 010 1.4l-3.5 3.5a3 3 0 11-4.2-4.2l2-2a1 1 0 111.4 1.4l-2 2a1 1 0 101.4 1.4l3.5-3.5a1 1 0 011.4 0z" />,
};

export default function ShareBar({ url, title, labels }: { url: string; title: string; labels: Labels }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), tt = encodeURIComponent(title);
  const links: [string, string, string][] = [
    ["linkedin", "LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ["x", "X", `https://x.com/intent/post?url=${u}&text=${tt}`],
    ["facebook", "Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ["whatsapp", "WhatsApp", `https://wa.me/?text=${tt}%20${u}`],
    ["mail", labels.email, `mailto:?subject=${tt}&body=${u}`],
  ];
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };
  const btn = "grid h-10 w-10 place-items-center border border-line text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white";
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={labels.share}>
      <span className="mr-2 text-[14px] text-stone">{labels.share}</span>
      {links.map(([k, name, to]) => (
        <a key={k} href={to} target={k === "mail" ? undefined : "_blank"} rel="noopener noreferrer" className={btn} aria-label={name} title={name}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{icons[k]}</svg>
        </a>
      ))}
      <button type="button" onClick={copy} className={btn} aria-label={labels.copy} title={copied ? labels.copied : labels.copy}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{icons.link}</svg>
      </button>
      <span className="text-[14px] text-lime-dark" role="status">{copied ? labels.copied : ""}</span>
    </div>
  );
}
