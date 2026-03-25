"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import GalleryLightbox from "@/components/site/GalleryLightbox";

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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AlternateUrlSetter trUrl={trUrl} enUrl={enUrl} />

            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-black/50">
                <Link href={lang === "en" ? "/en" : "/"} className="hover:text-black transition uppercase tracking-widest text-[10px] font-bold">
                    {t("Ana Sayfa", "Home")}
                </Link>
                <span className="text-black/20">/</span>
                <Link href={sectorHref} className="hover:text-black transition uppercase tracking-widest text-[10px] font-bold">
                    {t("Sektörel Çözümler", "Sector Solutions")}
                </Link>
            </nav>

            {/* H1 + Excerpt */}
            <div className="mb-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 border border-red-600/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    {t("Sektörel Çözüm", "Sector Solution")}
                </span>
                {h1 && (
                    <h1 className="text-4xl sm:text-6xl font-light text-black tracking-tighter mt-2 leading-[1.1] uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}>
                        {h1}
                    </h1>
                )}
                {excerpt && (
                    <p className="mt-6 text-xl text-black/60 leading-relaxed font-normal max-w-2xl">{excerpt}</p>
                )}
            </div>

            {/* WYSIWYG İçerik */}
            {content && (
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                            {t("Detaylar", "Details")}
                        </h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <div
                        className="prose prose-lg max-w-none text-black/80 leading-relaxed font-light
                            prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight prose-headings:uppercase
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2
                            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-black prose-strong:font-bold
                            prose-li:text-black/70"
                        dangerouslySetInnerHTML={{ __html: content.replace(/&nbsp;/g, " ") }}
                    />
                </div>
            )}

            {/* Önerilen Hizmetler */}
            {relatedServices.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                            {t("Önerilen Aktiviteler", "Recommended Activities")}
                        </h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <div className="columns-2 md:columns-3 gap-4 space-y-4">
                        {relatedServices.map((service) => {
                            const serviceTitle = lang === "en" ? (service.title_en || service.title) : service.title;
                            const catName = lang === "en"
                                ? (service.category?.name_en || service.category?.name)
                                : service.category?.name;
                            const href = lang === "en"
                                ? `/en/services/${service.category?.slug_en || service.category?.slug}/${service.slug_en || service.slug}`
                                : `/hizmetler/${service.category?.slug}/${service.slug}`;
                            return (
                                <div key={service.id} className="break-inside-avoid">
                                    <Link href={href} className="group block relative overflow-hidden bg-black/5">
                                        {service.image ? (
                                            <img src={service.image} alt={serviceTitle}
                                                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                                                loading="lazy" />
                                        ) : (
                                            <div className="aspect-[4/3] bg-black flex items-center justify-center p-6">
                                                <span className="text-white text-xl font-bold uppercase tracking-tight text-center leading-tight">
                                                    {serviceTitle}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                                        <div className="absolute left-0 bottom-3 bg-white px-4 py-3 border-y border-r border-black/5 max-w-[90%]">
                                            <h3 className="text-sm font-bold text-black uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors">
                                                {serviceTitle}
                                            </h3>
                                            {catName && (
                                                <p className="text-[10px] text-black/40 uppercase tracking-widest mt-0.5">{catName}</p>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Görsel Galeri */}
            {imageUrls.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                            {t("Görsel Galeri", "Image Gallery")}
                        </h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <GalleryLightbox images={imageUrls} title={h1 || page.title} />
                </div>
            )}

            {/* CTA */}
            <div className="pt-16 border-t border-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold mb-6">
                            {t("İletişime Geçin", "Get in Touch")}
                        </h2>
                        <p className="text-black/60 mb-8 leading-relaxed">
                            {t(
                                "Bu sektöre özel çözümler veya diğer aktivasyon hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.",
                                "Contact us to learn more about our sector-specific solutions or other activation services."
                            )}
                        </p>
                        <Link href={contactHref}
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs">
                            {t("TEKLİF ALIN", "GET A QUOTE")}
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold mb-6">
                            {t("Tüm Hizmetlerimiz", "All Services")}
                        </h2>
                        <p className="text-black/60 mb-8 leading-relaxed">
                            {t(
                                "Etkinlikleriniz için sunduğumuz tüm interaktif dijital aktivasyon çözümlerini keşfedin.",
                                "Explore all our interactive digital activation solutions for your events."
                            )}
                        </p>
                        <Link href={servicesHref}
                            className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-black/80 transition uppercase tracking-widest text-xs">
                            {t("HİZMETLERİ GÖR", "VIEW SERVICES")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 bg-black rounded-2xl px-8 sm:px-14 py-14 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                    {t("Etkinliğinizi Planlayalım", "Let's Plan Your Event")}
                </p>
                <p className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                    style={{ fontFamily: "var(--font-inter-tight)" }}>
                    {t("Projeniz için", "Ready for your")}
                    <br />
                    <span className="font-bold">{t("Hemen Teklif Alın", "Get a Quote Now")}</span>
                </p>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-8">
                    {t(
                        "Markanıza özel çözümler için ekibimizle hemen iletişime geçin. Size 24 saat içinde geri döneceğiz.",
                        "Contact our team for custom solutions tailored to your brand. We'll get back to you within 24 hours."
                    )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href={contactHref}
                        className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs">
                        {t("ETKİNLİĞİMİZİ PLANLAYALIM", "PLAN MY EVENT")}
                    </Link>
                    <a href="tel:+905342334051"
                        className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase tracking-widest text-xs">
                        +90 534 233 4051
                    </a>
                </div>
            </div>

            {/* Back */}
            <div className="mt-10">
                <Link href={sectorHref}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t("TÜM SEKTÖREL ÇÖZÜMLER", "ALL SECTOR SOLUTIONS")}
                </Link>
            </div>
        </div>
    );
}
