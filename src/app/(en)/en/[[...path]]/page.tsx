import { CatchAll, metadataFor, staticParams } from "@/views/catchall";

type Props = { params: Promise<{ path?: string[] }> };
export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() { return staticParams("en"); }
export async function generateMetadata({ params }: Props) { return metadataFor("en", (await params).path); }
export default async function Page({ params }: Props) { return <CatchAll locale="en" path={(await params).path} />; }
