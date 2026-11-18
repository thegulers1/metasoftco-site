import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MsCrumbs, MsFacts, MsFaq, MsSectionHead, MsSteps, MsWords, upperMixed } from "@/components/site-ms/parts";
import { siteConfig, generateBreadcrumbSchema, ogImageUrl } from "@/lib/site";
import { getNewYearProduct, newYearProducts } from "@/lib/new-year-products";
import { rentalAreaServed } from "@/lib/rental-ops";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";

// Yılbaşı ürün sayfaları (/hizmetler/yilbasi-<urun>-kiralama): içerik
// src/lib/new-year-products.ts dosyasında, her ürünün ince bir page.tsx'i var.

const NEW_YEAR_HUB = "/hizmetler/yilbasi-partisi-aktiviteleri";

export function newYearProductMetadata(slug: string): Metadata {
    const item = getNewYearProduct(slug);
    if (!item) return {};
    const url = `${siteConfig.url}/hizmetler/${slug}`;
    const image = ogImageUrl(item.h1, item.trName);
    return {
        title: { absolute: item.metaTitle },
        description: item.metaDescription,
        keywords: item.keywords,
        alternates: { canonical: url },
        openGraph: { title: item.metaTitle, description: item.metaDescription, url, siteName: siteConfig.name, locale: "tr_TR", type: "website", images: [{ url: image, width: 1200, height: 630 }] },
        twitter: { card: "summary_large_image", title: item.metaTitle, description: item.metaDescription, images: [image] },
    };
}

export function NewYearProductPage({ slug }: { slug: string }) {
    const item = getNewYearProduct(slug);
    if (!item) notFound();

    const path = `/hizmetler/${slug}`;
    const url = `${siteConfig.url}${path}`;
    const others = newYearProducts.filter((other) => other.slug !== slug);
    const schemas = [
        generateBreadcrumbSchema([
            { name: "Ana Sayfa", url: siteConfig.url },
            { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
            { name: "Yılbaşı Partisi Aktiviteleri", url: `${siteConfig.url}${NEW_YEAR_HUB}` },
            { name: item.h1, url },
        ]),
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: item.h1,
            alternateName: `Yılbaşı ${item.trName} Kiralama`,
            description: item.metaDescription,
            url,
            image: item.image.url,
            serviceType: `${item.trName} kiralama`,
            provider: { "@id": `${siteConfig.url}/#organization` },
            areaServed: rentalAreaServed(),
            isRelatedTo: { "@type": "Service", url: `${siteConfig.url}${item.product.href}` },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })),
        },
    ];

    return (
        <article className="ms-page">
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
            ))}
            <AlternateUrl trUrl={path} />
            <section className="ms-hero ms-hero--split">
                <div className="ms-hero__col">
                    <MsCrumbs items={[{ href: "/", label: "ANA SAYFA" }, { href: "/hizmetler", label: "HİZMETLER" }, { href: NEW_YEAR_HUB, label: "YILBAŞI" }, { label: upperMixed(item.h1) }]} />
                    <h1 className="ms-h1 ms-h1--detail ms-h1--long" aria-label={item.h1}><MsWords text={item.h1} accent="last" /></h1>
                    <p className="ms-mono">{upperMixed(item.trName)} · KURUMSAL YILBAŞI PARTİSİ</p>
                    <p className="ms-lede">{item.lede}</p>
                    <div className="ms-actions">
                        <Link href={`/iletisim?durum=yilbasi-partisi-aktiviteleri`} className="ms-pill ms-pill--acc">YILBAŞI İÇİN TEKLİF ALIN ↗</Link>
                        <Link href={item.product.href} className="ms-pill ms-pill--line">{upperMixed(item.product.label)}</Link>
                    </div>
                </div>
                <div className="ms-hero__media">
                    <Image src={item.image.url} alt={item.image.alt} fill priority sizes="(max-width: 800px) 100vw, 45vw" />
                </div>
            </section>

            <section className="ms-section" aria-labelledby="ny-angle">
                <MsSectionHead id="ny-angle" title={item.angleTitle} meta="YILBAŞI" />
                <div className="ms-cards">
                    {item.angle.map((card) => (
                        <div key={card.title} className="ms-card">
                            <h3 className="ms-card__title">{card.title}</h3>
                            <p className="ms-card__body">{card.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-labelledby="ny-facts">
                <MsSectionHead id="ny-facts" title="Alan, kapasite ve kurulum" meta="TEKNİK" />
                <MsFacts facts={item.facts} />
                <p className="ms-lede" style={{ maxWidth: 760 }}>
                    Nakliye, kurulum, söküm, etkinlik boyunca teknik personel ve şirketinize özel yılbaşı tasarımı kiralamaya dahildir. Ürünün tüm teknik ayrıntıları için <Link href={item.product.href} className="ms-acc">{item.product.label}</Link> sayfasına; partinin bütün akışı ve diğer deneyimler için <Link href={NEW_YEAR_HUB} className="ms-acc">yılbaşı partisi aktiviteleri</Link> sayfasına bakabilirsiniz.
                </p>
            </section>

            <section className="ms-section" aria-labelledby="ny-flow">
                <MsSectionHead id="ny-flow" title={item.flowTitle} meta="AKIŞ" />
                <MsSteps steps={item.flow} />
            </section>

            {item.reference && (
                <section className="ms-section" aria-labelledby="ny-ref">
                    <MsSectionHead id="ny-ref" title="Sahadan" meta="REFERANS" />
                    <div className="ms-cards">
                        <div className="ms-card">
                            <h3 className="ms-card__title">{item.reference.title}</h3>
                            <p className="ms-card__body">{item.reference.body}</p>
                            <Link href={item.reference.href} className="ms-hero__jump">Projeyi inceleyin ↗</Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="ms-section" aria-labelledby="ny-faq">
                <MsSectionHead id="ny-faq" title="Sık sorulan sorular" meta="SORULAR" />
                <MsFaq items={item.faq} />
            </section>

            <section className="ms-section" aria-labelledby="ny-more">
                <MsSectionHead id="ny-more" title="Diğer yılbaşı deneyimleri" meta="YILBAŞI" />
                <div className="ms-cards">
                    {others.map((other) => (
                        <div key={other.slug} className="ms-card">
                            <h3 className="ms-card__title">{other.h1}</h3>
                            <p className="ms-card__body">{other.trName}</p>
                            <Link href={`/hizmetler/${other.slug}`} className="ms-hero__jump">İnceleyin ↗</Link>
                        </div>
                    ))}
                </div>
                <div className="ms-actions">
                    <Link href={`/iletisim?durum=yilbasi-partisi-aktiviteleri`} className="ms-pill ms-pill--acc">YILBAŞI İÇİN TEKLİF ALIN ↗</Link>
                    <Link href={NEW_YEAR_HUB} className="ms-pill ms-pill--line">TÜM YILBAŞI AKTİVİTELERİ</Link>
                </div>
            </section>
        </article>
    );
}
