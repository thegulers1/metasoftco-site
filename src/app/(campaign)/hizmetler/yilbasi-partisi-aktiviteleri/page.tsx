import { notFound } from "next/navigation";
import { occasionMetadata } from "@/app/(site)/hizmetler/_occasion/OccasionPage";
import Campaign from "@/components/campaigns/yilbasi-2027/Campaign";
import { loadCampaign } from "@/components/campaigns/yilbasi-2027/load";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";
const SLUG = "yilbasi-partisi-aktiviteleri";
export const metadata = occasionMetadata(SLUG);

export default async function YilbasiPartisiPage() {
  const data = await loadCampaign();
  if (!data) notFound();
  const url = `${siteConfig.url}/hizmetler/${SLUG}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kiralama",
        item: `${siteConfig.url}/hizmetler`,
      },
      { "@type": "ListItem", position: 3, name: data.occasion.name, item: url },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.occasion.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faq).replace(/</g, "\\u003c"),
        }}
      />
      <Campaign {...data} />
    </>
  );
}
