"use client";

import { useEffect } from "react";
import Link from "next/link";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import CtaSection from "@/components/site/CtaSection";
import { useLanguage } from "@/providers/LanguageProvider";
import { addHeadingAnchors } from "@/lib/utils";

interface ServiceDetailClientProps {
    service: any;
    categoryData: any;
    relatedServices: any[];
    gallery: { url: string; alt?: string }[];
    serviceSchema: any;
    category: string;
}

export default function ServiceDetailClient({
    service,
    categoryData,
    relatedServices,
    gallery,
    serviceSchema,
}: ServiceDetailClientProps) {
    const { language, t, setAlternateUrl } = useLanguage();

    useEffect(() => {
        const trUrl = `/hizmetler/${categoryData.slug}/${service.slug}`;
        const enUrl = (service.slug_en && categoryData.slug_en)
            ? `/en/services/${categoryData.slug_en}/${service.slug_en}`
            : "/en/services";
        setAlternateUrl(trUrl, enUrl);
    }, [service.slug, service.slug_en, categoryData.slug, categoryData.slug_en]);

    const title = language === "en" ? (service.title_en || service.title) : service.title;
    const seoTitle = language === "en"
        ? (service.metaTitle_en || service.metaTitle || title)
        : (service.metaTitle || title);
    const categoryName = language === "en" ? (categoryData.name_en || categoryData.name) : categoryData.name;
    const description = language === "en" ? (service.description_en || service.description) : service.description;
    const content = language === "en" ? (service.content_en || service.content) : service.content;

    return (
        <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />

            <div className="mx-auto max-w-[840px] px-6 sm:px-8">
                {/* Breadcrumb */}
                <nav
                    className="mb-8 flex items-center gap-2 text-[rgba(255,255,255,.4)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                >
                    <Link href="/" className="hover:text-white transition-colors">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span>/</span>
                    <Link href="/hizmetler" className="hover:text-white transition-colors">
                        {t("Hizmetler", "Services")}
                    </Link>
                    <span>/</span>
                    <span className="text-white/70">{title}</span>
                </nav>

                {/* Service Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-5">
                        <span className="h-[7px] w-[7px] rounded-full bg-[var(--acc)]" style={{ boxShadow: "0 0 10px var(--acc)" }} />
                        <span
                            className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {categoryName}
                        </span>
                    </div>
                    <h1
                        className="text-white font-bold tracking-[-0.02em] leading-[1.05]"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 6vw, 56px)" }}
                    >
                        {seoTitle}
                    </h1>
                    {description && (
                        <p
                            className="mt-6 max-w-[640px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.6 }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* Video Section */}
                {service.video && (
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Tanıtım Videosu", "Promotional Video")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <VideoPlayer
                            src={service.video}
                            thumbnailTime={service.videoThumbnailTime}
                            fallbackPoster={service.image}
                            title={service.title}
                        />
                    </div>
                )}

                {/* Content Section */}
                {content && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Hizmet Hakkında", "About Service")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-a:text-[var(--acc)] prose-a:no-underline hover:prose-a:underline"
                            style={{ fontFamily: "var(--font-manrope)" }}
                            dangerouslySetInnerHTML={{
                                __html: addHeadingAnchors(content?.replace(/&nbsp;/g, ' ') || '')
                            }}
                        />
                    </div>
                )}

                {/* Specs Section */}
                {service.specs && (() => {
                    const items: { label: string; value: string }[] = JSON.parse(service.specs);
                    if (!items.length) return null;
                    return (
                        <div className="mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <h2
                                    className="text-[var(--acc)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                                >
                                    {t("Teknik Özellikler", "Technical Specifications")}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/[0.08]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[20px] overflow-hidden border border-white/[0.08]" style={{ background: "rgba(255,255,255,.06)" }}>
                                {items.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 px-6 py-4 bg-[#0e0e15]">
                                        <span
                                            className="w-32 shrink-0 pt-0.5 text-[rgba(255,255,255,.4)]"
                                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                                        >
                                            {item.label}
                                        </span>
                                        <span className="text-[rgba(255,255,255,.75)]" style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.55 }}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}

                {/* FAQ Section */}
                {service.faq && (() => {
                    const items: { q: string; a: string }[] = JSON.parse(service.faq);
                    if (!items.length) return null;
                    return (
                        <div className="mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <h2
                                    className="text-[var(--acc)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                                >
                                    {t("Sıkça Sorulan Sorular", "Frequently Asked Questions")}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/[0.08]" />
                            </div>
                            <div className="space-y-3">
                                {items.map((item, i) => (
                                    <details
                                        key={i}
                                        className="group rounded-[16px] overflow-hidden border border-white/[0.08]"
                                        style={{ background: "rgba(255,255,255,.04)" }}
                                    >
                                        <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                                            <span className="text-white pr-4" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 15, fontWeight: 600 }}>
                                                {item.q}
                                            </span>
                                            <span className="text-[rgba(255,255,255,.4)] group-open:rotate-45 transition-transform duration-200 text-2xl leading-none shrink-0">+</span>
                                        </summary>
                                        <div
                                            className="px-6 pb-5 pt-4 border-t border-white/[0.08] text-[rgba(255,255,255,.55)]"
                                            style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.6 }}
                                        >
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    );
                })()}

                {/* Gallery Section */}
                {gallery.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Görsel Galeri", "Image Gallery")}
                            </h2>
                            <span
                                className="rounded-full border border-white/10 px-3 py-1.5 text-[rgba(255,255,255,.5)]"
                                style={{ background: "rgba(255,255,255,.04)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                            >
                                {t("Kaydırınız →", "Swipe →")}
                            </span>
                        </div>
                        <GalleryLightbox images={gallery} title={service.title} />
                    </div>
                )}

                {/* Contact & Related Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/[0.08]">
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
                                "Bu hizmet veya diğer çözümlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.",
                                "You can contact us to get more information about this service or our other solutions."
                            )}
                        </p>
                        <Link
                            href={language === "en" ? "/en/contact" : "/iletisim"}
                            className="inline-flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-[0.1em] px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(90deg, #7c3aed, var(--acc))", fontFamily: "var(--font-manrope)" }}
                        >
                            {t("Teklif Alın", "Get a Quote")}
                        </Link>
                    </div>

                    {relatedServices.length > 0 && (
                        <div>
                            <h2
                                className="text-[var(--acc)] mb-5"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("İlginizi Çekebilir", "You Might Like")}
                            </h2>
                            <div className="space-y-3">
                                {relatedServices.slice(0, 3).map((related) => (
                                    <Link
                                        key={related.id}
                                        href={
                                            language === "en" && categoryData.slug_en && related.slug_en
                                                ? `/en/services/${categoryData.slug_en}/${related.slug_en}`
                                                : `/hizmetler/${categoryData.slug}/${related.slug}`
                                        }
                                        className="group block p-4 rounded-[14px] border border-white/[0.08] hover:border-white/20 transition-colors"
                                        style={{ background: "rgba(255,255,255,.03)" }}
                                    >
                                        <h3
                                            className="text-white group-hover:text-[var(--acc)] transition-colors"
                                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 15, fontWeight: 600 }}
                                        >
                                            {language === "en" ? (related.title_en || related.title) : related.title}
                                        </h3>
                                        <p
                                            className="mt-1 text-[rgba(255,255,255,.4)]"
                                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                                        >
                                            {categoryName}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Back Link */}
                <div className="mt-16">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 text-[rgba(255,255,255,.4)] hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase" }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("Tüm Hizmetlere Dön", "Back to All Services")}
                    </Link>
                </div>
            </div>

            <CtaSection />
        </div>
    );
}
