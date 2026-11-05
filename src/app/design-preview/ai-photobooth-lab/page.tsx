import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "AI Photobooth — Tasarım Önizlemesi",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null, languages: {} },
};

/** Preview the same page and existing site chrome; never a second design fork. */
export default async function Preview() {
  if (process.env.NODE_ENV !== "development") notFound();
  const [{ default: Page }, { default: Layout }] = await Promise.all([
    import("@/app/(site)/hizmetler/[category]/[service]/page"),
    import("@/app/(site)/layout"),
  ]);
  return (
    <Layout>
      <Page
        params={Promise.resolve({
          category: "yapay-zeka-etkinlik-cozumleri",
          service: "ai-photobooth-kirala",
        })}
      />
    </Layout>
  );
}
