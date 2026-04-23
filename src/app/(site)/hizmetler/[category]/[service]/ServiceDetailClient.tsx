"use client";

import { useEffect } from "react";
import Link from "next/link";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
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
    const categoryName = language === "en" ? (categoryData.name_en || categoryData.name) : categoryData.name;
    const description = language === "en" ? (service.description_en || service.description) : service.description;
    const content = language === "en" ? (service.content_en || service.content) : service.content;

    return (
        <div className="min-h-screen bg-[#0d0d0d] pt-32 pb-20">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
                    <Link href="/" className="hover:text-white transition uppercase tracking-widest text-[10px] font-bold">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span className="text-white/20">/</span>
                    <Link href="/hizmetler" className="hover:text-white transition uppercase tracking-widest text-[10px] font-bold">
                        {t("Hizmetler", "Services")}
                    </Link>
                    <span className="text-white/20">/</span>
                    <span className="text-[#e5e5e5] font-bold uppercase tracking-widest text-[10px]">{title}</span>
                </nav>

                {/* Service Header */}
                <div className="mb-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 border border-red-600/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        {categoryName}
                    </span>
                    <h1
                        className="text-4xl sm:text-6xl font-light text-[#e5e5e5] tracking-tighter mt-2 leading-[1.1] uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-6 text-xl text-white/50 leading-relaxed font-normal max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>

                {/* Video Section */}
                {service.video && (
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Tanıtım Videosu", "Promotional Video")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/5" />
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
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Hizmet Hakkında", "About Service")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/5" />
                        </div>
                        <div
                            className="prose prose-lg prose-invert max-w-none text-white/70 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{
                                __html: addHeadingAnchors(content?.replace(/&nbsp;/g, ' ') || '')
                            }}
                        />
                    </div>
                )}

                {/* Gallery Section */}
                {gallery.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Görsel Galeri", "Image Gallery")}
                            </h2>
                            <span className="text-[10px] uppercase tracking-widest text-black/30 bg-black/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                                {t("Kaydırınız →", "Swipe →")}
                            </span>
                        </div>
                        <GalleryLightbox images={gallery} title={service.title} />
                    </div>
                )}

                {/* CTA & Related Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/10">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold mb-6">
                            {t("İletişime Geçin", "Get in Touch")}
                        </h2>
                        <p className="text-white/50 mb-8 leading-relaxed">
                            {t(
                                "Bu hizmet veya diğer çözümlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.",
                                "You can contact us to get more information about this service or our other solutions."
                            )}
                        </p>
                        <Link
                            href={language === "en" ? "/en/contact" : "/iletisim"}
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                        >
                            {t("TEKLİF ALIN", "GET A QUOTE")}
                        </Link>
                    </div>

                    {relatedServices.length > 0 && (
                        <div>
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold mb-6">
                                {t("İlginizi Çekebilir", "You Might Like")}
                            </h2>
                            <div className="space-y-4">
                                {relatedServices.slice(0, 3).map((related) => (
                                    <Link
                                        key={related.id}
                                        href={
                                            language === "en" && categoryData.slug_en && related.slug_en
                                                ? `/en/services/${categoryData.slug_en}/${related.slug_en}`
                                                : `/hizmetler/${categoryData.slug}/${related.slug}`
                                        }
                                        className="group block p-4 bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/5"
                                    >
                                        <h3 className="font-bold text-[#e5e5e5] uppercase tracking-tight group-hover:text-red-500 transition">
                                            {language === "en" ? (related.title_en || related.title) : related.title}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
                                            {categoryName}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom CTA Banner */}
                <div className="mt-20 bg-[#141414] border border-white/5 rounded-2xl px-8 sm:px-14 py-14 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                        {t("Etkinliğinizi Planlayalım", "Let's Plan Your Event")}
                    </p>
                    <p
                        className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
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
                        <Link
                            href={language === "en" ? "/en/contact" : "/iletisim"}
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                        >
                            {t("ETKİNLİĞİMİZİ PLANLAYALIM", "PLAN MY EVENT")}
                        </Link>
                        <a
                            href="tel:+905342334051"
                            className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase tracking-widest text-xs"
                        >
                            +90 534 233 4051
                        </a>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-10">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition"
                    >
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        {t("TÜM HİZMETLERE DÖN", "BACK TO ALL SERVICES")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
