import Link from "next/link";
export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-32 text-center">
      <p className="font-display text-7xl font-extrabold text-lime">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-forest">Page not found</h1>
      
      <Link href="/en" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-bold text-white">Go to home</Link>
    </main>
  );
}
