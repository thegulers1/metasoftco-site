import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FASHION_MIRROR_PROFILE as profile } from "@/lib/service-template/fashion-mirror";
import { loadServiceTemplate } from "@/lib/service-template/load";
import ProductDetail from "@/components/services/template/ProductDetail";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "AI Fashion Mirror — Tasarım Pilotu",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null, languages: {} },
};

/** Development-only pilot: the AI Photobooth layout fed with Fashion Mirror data. The live service page, its metadata and JSON-LD are untouched. */
export default async function Preview() {
  if (process.env.NODE_ENV !== "development") notFound();
  const [{ default: Layout }, data] = await Promise.all([
    import("@/app/(site)/layout"),
    loadServiceTemplate(profile),
  ]);
  if (!data) notFound();
  return (
    <Layout>
      <ProductDetail
        profile={profile}
        service={data.service}
        category={data.category}
        projects={data.projects}
        related={data.related}
      />
    </Layout>
  );
}
