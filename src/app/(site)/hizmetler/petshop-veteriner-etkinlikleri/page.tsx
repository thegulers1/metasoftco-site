import type { Metadata } from "next";
import { generateBreadcrumbSchema, generateFaqSchema, siteConfig } from "@/lib/site";
import { description, faqs, path, title, activities } from "./content";
import PetEventsExperience from "./Experience";

const url = siteConfig.url + path;
const image = siteConfig.url + "/images/pet-events/pati-art-v2-960.webp";
export const metadata: Metadata = {
  title: { absolute: `${title} | MetasoftCo` },
  description,
  keywords: ["petshop açılış etkinlikleri", "veteriner kliniği açılış aktiviteleri", "hayvanları koruma günü etkinlikleri", "4 Ekim etkinlik fikirleri", "pet marka aktivasyonu", "petshop interaktif aktiviteler", "veteriner kongresi aktiviteleri", "AI pati portresi", "veteriner fuaye etkinlikleri"],
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: siteConfig.name, locale: "tr_TR", type: "website", images: [{ url: image, width: 960, height: 960, alt: "Patili dostlarla interaktif etkinlik ve fotoğraf konsepti" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};
const schemas = [
  generateBreadcrumbSchema([{ name: "Ana Sayfa", url: siteConfig.url }, { name: "Hizmetler", url: siteConfig.url + "/hizmetler" }, { name: "Petshop ve Veteriner Etkinlikleri", url }]),
  { "@context": "https://schema.org", "@type": "Service", name: "Petshop, Veteriner ve Hayvanları Koruma Günü Etkinlikleri", description, url, image, serviceType: "Pet temalı interaktif etkinlik aktiviteleri", areaServed: { "@type": "Country", name: "Türkiye" }, provider: { "@id": siteConfig.url + "/#organization" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Pet temalı etkinlik aktiviteleri", itemListElement: activities.map(item => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.name, description: item.description, url: url + "#aktiviteler" } })) } },
  generateFaqSchema(faqs),
];
export default function PetEventsPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
    <PetEventsExperience />
  </>;
}
