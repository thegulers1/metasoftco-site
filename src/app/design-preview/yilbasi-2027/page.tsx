import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Yılbaşı 2027 — Kampanya Tasarım Önizlemesi",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null, languages: {} },
};

export default async function Preview() {
  // Block before importing the database or reading public content.
  if (process.env.NODE_ENV !== "development") notFound();
  const [{ loadCampaign }, { default: Campaign }] = await Promise.all([
    import("@/components/campaigns/yilbasi-2027/load"),
    import("@/components/campaigns/yilbasi-2027/Campaign"),
  ]);
  const data = await loadCampaign();
  if (!data) notFound();
  return <Campaign {...data} preview />;
}
