import Link from "next/link";
import { notFoundText as n } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-28 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={n.image} alt="Plant-e" className="mx-auto h-16 w-auto" />
      <p className="mt-10 font-display text-7xl font-extrabold text-lime">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-forest">{n.title.en}</h1>
      <p className="mt-3 text-stone">{n.text.en}</p>
      <Link href="/en" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-bold text-white">{n.cta.en}</Link>
    </main>
  );
}
