"use client";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/routes";

export default function ProductGallery({ images, alt, locale }: { images: string[]; alt: string; locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;
  const label = locale === "nl"
    ? { prev: "Vorige afbeelding", next: "Volgende afbeelding", show: "Toon afbeelding" }
    : { prev: "Previous image", next: "Next image", show: "Show image" };

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + images.length) % images.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    setIndex(n);
  };
  const onScroll = () => {
    const el = track.current;
    if (el && el.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (!images.length) return <div className="aspect-square w-full rounded-[2rem] bg-mist" aria-hidden />;

  const arrow = "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white";
  return (
    <div className="grid gap-3">
      <div className="relative">
        <div ref={track} onScroll={onScroll} className="no-scrollbar flex aspect-square w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[2rem] bg-mist">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => many && go(i + 1)} className={`h-full w-full shrink-0 snap-center ${many ? "cursor-pointer" : "cursor-default"}`} aria-label={many ? label.next : alt} tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={i === 0 ? alt : ""} loading={i === 0 ? "eager" : "lazy"} decoding="async" draggable={false} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        {many && (
          <>
            <button type="button" onClick={() => go(index - 1)} className={`${arrow} left-3`} aria-label={label.prev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" onClick={() => go(index + 1)} className={`${arrow} right-3`} aria-label={label.next}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      {many && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => go(i)} aria-label={`${label.show} ${i + 1}`} aria-current={i === index}
              className={`overflow-hidden rounded-2xl bg-mist ring-2 ring-offset-2 transition ${i === index ? "ring-lime" : "ring-transparent opacity-70 hover:opacity-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
