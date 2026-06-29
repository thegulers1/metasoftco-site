"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import CtaSection from "@/components/site/CtaSection";
import { addHeadingAnchors } from "@/lib/utils";

interface SectorImage { url: string; alt: string; }

interface RelatedService {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
    category: { name: string; name_en: string | null; slug: string; slug_en: string | null } | null;
}

interface SectorPageClientProps {
    page: {
        title: string;
        slug: string;
        slug_en: string | null;
        h1: string | null;
        h1_en: string | null;
        excerpt: string | null;
        excerpt_en: string | null;
        content: string | null;
        content_en: string | null;
        customSchema: string | null;
    };
    images: SectorImage[];
    relatedServices: RelatedService[];
    lang: "tr" | "en";
    trUrl: string;
    enUrl: string;
}

// Küçük bileşen — sadece alternate URL'i ayarlar
function AlternateUrlSetter({ trUrl, enUrl }: { trUrl: string; enUrl: string }) {
    const { setAlternateUrl } = useLanguage();
    useEffect(() => {
        setAlternateUrl(trUrl, enUrl);
    }, [trUrl, enUrl, setAlternateUrl]);
    return null;
}

export default function SectorPageClient({ page, images, relatedServices, lang, trUrl, enUrl }: SectorPageClientProps) {
    const t = (tr: string, en: string) => lang === "en" ? en : tr;

    const h1 = lang === "en" ? (page.h1_en || page.h1) : page.h1;
    const excerpt = lang === "en" ? (page.excerpt_en || page.excerpt) : page.excerpt;
    const content = lang === "en" ? (page.content_en || page.content) : page.content;
    const imageUrls = images.map((img) => img.url);
    const servicesHref = lang === "en" ? "/en/services" : "/hizmetler";
    const contactHref = lang === "en" ? "/en/contact" : "/iletisim";
    const sectorHref = lang === "en" ? "/en" : "/sektorel-cozumler";

    return (
        <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20">
            <div className="mx-auto max-w-[840px] px-6 sm:px-8">
                <AlternateUrlSetter trUrl={trUrl} enUrl={enUrl} />

                {/* Breadcrumb */}
                <nav
                    className="mb-8 flex items-center gap-2 text-[rgba(255,255,255,.4)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                >
                    <Link href={lang === "en" ? "/en" : "/"} className="hover:text-white transition-colors">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span>/</span>
                    <Link href={sectorHref} className="hover:text-white transition-colors">
                        {t("Sektörel Çözümler", "Sector Solutions")}
                    </Link>
                </nav>

                {/* H1 + Excerpt */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-5">
                        <span className="h-[7px] w-[7px] rounded-full bg-[var(--acc)]" style={{ boxShadow: "0 0 10px var(--acc)" }} />
                        <span
                            className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {t("Sektörel Çözüm", "Sector Solution")}
                        </span>
                    </div>
                    {h1 && (
                        <h1
                            className="text-white font-bold tracking-[-0.02em] leading-[1.05]"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 6vw, 56px)" }}
                        >
                            {h1}
                        </h1>
                    )}
                    {excerpt && (
                        <p
                            className="mt-6 max-w-[640px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.6 }}
                        >
                            {excerpt}
                        </p>
                    )}
                </div>

                {/* WYSIWYG İçerik */}
                {content && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Detaylar", "Details")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <div
                            className="prose prose-lg prose-invert max-w-none
                                prose-headings:font-bold prose-headings:tracking-tight
                                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2
                                prose-a:text-[var(--acc)] prose-a:no-underline hover:prose-a:underline"
                            style={{ fontFamily: "var(--font-manrope)" }}
                            dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, " ")) }}
                        />
                    </div>
                )}

                {/* Önerilen Hizmetler */}
                {relatedServices.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Önerilen Aktiviteler", "Recommended Activities")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {relatedServices.map((service) => {
                                const serviceTitle = lang === "en" ? (service.title_en || service.title) : service.title;
                                const catName = lang === "en"
                                    ? (service.category?.name_en || service.category?.name)
                                    : service.category?.name;
                                const href = lang === "en"
                                    ? `/en/services/${service.category?.slug_en || service.category?.slug}/${service.slug_en || service.slug}`
                                    : `/hizmetler/${service.category?.slug}/${service.slug}`;
                                return (
                                    <Link
                                        key={service.id}
                                        href={href}
                                        className="group relative flex flex-col rounded-[16px] overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
                                        style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                            {service.image ? (
                                                <img
                                                    src={service.image}
                                                    alt={serviceTitle}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ backgroundImage: "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)" }}
                                                />
                                            )}
                                        </div>
                                        <div className="px-3.5 py-3">
                                            <h3
                                                className="text-white leading-tight"
                                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 13.5, fontWeight: 600 }}
                                            >
                                                {serviceTitle}
                                            </h3>
                                            {catName && (
                                                <p
                                                    className="mt-1 text-[rgba(255,255,255,.4)]"
                                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase" }}
                                                >
                                                    {catName}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Görsel Galeri */}
                {imageUrls.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Görsel Galeri", "Image Gallery")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <GalleryLightbox images={imageUrls} title={h1 || page.title} />
                    </div>
                )}

                {/* İletişim + Hizmetler */}
                <div className="pt-16 border-t border-white/[0.08]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2
                                className="text-[var(--acc)] mb-5"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("İletişime Geçin", "Get in Touch")}
                            </h2>
                            <p
                                className="mb-7 text-[rgba(255,255,255,.55)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.6 }}
                            >
                                {t(
                                    "Bu sektöre özel çözümler veya diğer aktivasyon hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.",
                                    "Contact us to learn more about our sector-specific solutions or other activation services."
                                )}
                            </p>
                            <Link
                                href={contactHref}
                                className="inline-flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-[0.1em] px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
                                style={{ background: "linear-gradient(90deg, #7c3aed, var(--acc))", fontFamily: "var(--font-manrope)" }}
                            >
                                {t("Teklif Alın", "Get a Quote")}
                            </Link>
                        </div>
                        <div>
                            <h2
                                className="text-[var(--acc)] mb-5"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Tüm Hizmetlerimiz", "All Services")}
                            </h2>
                            <p
                                className="mb-7 text-[rgba(255,255,255,.55)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.6 }}
                            >
                                {t(
                                    "Etkinlikleriniz için sunduğumuz tüm interaktif dijital aktivasyon çözümlerini keşfedin.",
                                    "Explore all our interactive digital activation solutions for your events."
                                )}
                            </p>
                            <Link
                                href={servicesHref}
                                className="inline-flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-[0.1em] px-7 py-3.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                {t("Hizmetleri Gör", "View Services")}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-16">
                    <Link
                        href={sectorHref}
                        className="inline-flex items-center gap-2 text-[rgba(255,255,255,.4)] hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase" }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("Tüm Sektörel Çözümler", "All Sector Solutions")}
                    </Link>
                </div>
            </div>

            <CtaSection />
        </div>
    );
}
