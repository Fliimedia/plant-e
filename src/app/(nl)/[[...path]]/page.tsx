import { CatchAll, metadataFor, staticParams } from "@/views/catchall";

type Props = { params: Promise<{ path?: string[] }> };
export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() { return staticParams("nl"); }
export async function generateMetadata({ params }: Props) { return metadataFor("nl", (await params).path); }
export default async function Page({ params }: Props) { return <CatchAll locale="nl" path={(await params).path} />; }
