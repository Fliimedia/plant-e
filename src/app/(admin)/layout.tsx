import "../globals.css";

export const metadata = { title: "Beheer | Plant-e", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-sand">{children}</body>
    </html>
  );
}
