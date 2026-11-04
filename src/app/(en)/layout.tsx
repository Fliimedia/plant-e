import RootShell, { baseMetadata } from "@/views/RootShell";
export const metadata = baseMetadata;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
