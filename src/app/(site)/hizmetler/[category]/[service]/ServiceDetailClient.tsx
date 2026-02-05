"use client";

import Link from "next/link";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import { useLanguage } from "@/providers/LanguageProvider";

interface ServiceDetailClientProps {
    service: any;
    categoryData: any;
    relatedServices: any[];
    gallery: string[];
    serviceSchema: any;
    category: string;
}

export default function ServiceDetailClient({
    service,
    categoryData,
    relatedServices,
    gallery,
    serviceSchema,
    category,
}: ServiceDetailClientProps) {
    const { language, t } = useLanguage();

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />

            <div className="min-h-screen bg-[#f5f5f5]">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: service.bgColor
                                ? service.bgColor
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        {/* Breadcrumb */}
                        <nav className="mb-4 text-white/70 text-sm">
                            <Link href="/" className="hover:text-white">
                                {t("Ana Sayfa", "Home")}
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/hizmetler" className="hover:text-white">
                                {t("Hizmetler", "Services")}
                            </Link>
                            <span className="mx-2">/</span>
                            <Link
                                href={`/hizmetler/${category}`}
                                className="hover:text-white"
                            >
                                {language === "en" ? (categoryData.name_en || categoryData.name) : categoryData.name}
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">{language === "en" ? (service.title_en || service.title) : service.title}</span>
                        </nav>

                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {language === "en" ? (service.title_en || service.title) : service.title}
                        </h1>
                        {(service.description || service.description_en) && (
                            <p className="mt-4 text-lg text-white/80 max-w-2xl">
                                {language === "en" ? (service.description_en || service.description) : service.description}
                            </p>
                        )}
                    </div>
                </section>

                {/* Video Section */}
                {service.video && (
                    <section className="py-16 bg-white">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-black mb-8 text-center">
                                {t("Tanıtım Videosu", "Promotional Video")}
                            </h2>
                            <VideoPlayer
                                src={service.video}
                                thumbnailTime={service.videoThumbnailTime}
                                fallbackPoster={service.image}
                                title={service.title}
                            />
                        </div>
                    </section>
                )}

                {/* Content Section */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl p-8 shadow-sm">
                                    <h2 className="text-2xl font-bold text-black mb-6">
                                        {t("Hizmet Detayları", "Service Details")}
                                    </h2>
                                    {(service.content || service.content_en) ? (
                                        <div
                                            className="service-content"
                                            dangerouslySetInnerHTML={{
                                                __html: (language === "en" ? (service.content_en || service.content) : service.content)?.replace(/&nbsp;/g, ' ') || ''
                                            }}
                                        />
                                    ) : (
                                        <p className="text-black/60">
                                            {t(
                                                "Bu hizmet hakkında detaylı bilgi yakında eklenecek.",
                                                "Detailed information about this service will be added soon."
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                {/* CTA Card */}
                                <div className="bg-black text-white rounded-2xl p-8 mb-6">
                                    <h3 className="text-xl font-bold mb-4">
                                        {t("Bu Hizmeti Almak İster misiniz?", "Want This Service?")}
                                    </h3>
                                    <p className="text-white/70 mb-6">
                                        {t(
                                            "Projeniz hakkında bizimle iletişime geçin.",
                                            "Contact us about your project."
                                        )}
                                    </p>
                                    <Link
                                        href="/iletisim"
                                        className="block w-full py-3 bg-white text-black font-medium text-center rounded-lg hover:bg-white/90 transition"
                                    >
                                        {t("İletişime Geç", "Get in Touch")}
                                    </Link>
                                </div>

                                {/* Category Info */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <p className="text-xs uppercase tracking-widest text-black/50 mb-2">
                                        {t("Kategori", "Category")}
                                    </p>
                                    <p className="font-semibold text-black">
                                        {language === "en" ? (categoryData.name_en || categoryData.name) : categoryData.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        {gallery.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-black mb-8">
                                    {t("Çalışma Örnekleri", "Work Samples")}
                                </h2>
                                <GalleryLightbox images={gallery} title={service.title} />
                            </div>
                        )}

                        {/* Related Services */}
                        {relatedServices.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-black mb-8">
                                    {t("Benzer Hizmetler", "Related Services")}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedServices.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={`/hizmetler/${category}/${related.slug}`}
                                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                                        >
                                            <h3 className="font-semibold text-black group-hover:text-black/70 transition">
                                                {language === "en" ? (related.title_en || related.title) : related.title}
                                            </h3>
                                            {(related.description || related.description_en) && (
                                                <p className="mt-2 text-sm text-black/50 line-clamp-2">
                                                    {language === "en" ? (related.description_en || related.description) : related.description}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
