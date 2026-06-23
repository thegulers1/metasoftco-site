import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/site";
import { getSectorBySlug, sectors } from "../data";

interface PageProps {
    params: Promise<{ sektor: string }>;
}

export async function generateStaticParams() {
    return sectors.map((s) => ({ sektor: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { sektor } = await params;
    const sector = getSectorBySlug(sektor);
    if (!sector) return {};

    const url = `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`;
    const image = `${siteConfig.url}/og?title=${encodeURIComponent(sector.name)}&desc=${encodeURIComponent(sector.heroSubtitle)}`;

    return {
        title: sector.metaTitle,
        description: sector.metaDescription,
        keywords: sector.keywords,
        openGraph: {
            title: sector.metaTitle,
            description: sector.metaDescription,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: siteConfig.locale,
            type: "website",
        },
        twitter: { card: "summary_large_image", title: sector.metaTitle, description: sector.metaDescription },
        alternates: {
            canonical: url,
            languages: {
                tr: url,
                en: `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}`,
                "x-default": url,
            },
        },
    };
}

export default async function SektorPage({ params }: PageProps) {
    const { sektor } = await params;
    const sector = getSectorBySlug(sektor);
    if (!sector) notFound();

    const faqSchema = generateFAQSchema(sector.faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Çözümler", url: `${siteConfig.url}/sektorel-yazilim-cozumleri` },
        { name: sector.name, url: `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}` },
    ]);

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-black/50">
                    <Link href="/" className="hover:text-black transition uppercase tracking-widest text-[10px] font-bold">
                        Anasayfa
                    </Link>
                    <span className="text-black/20">/</span>
                    <Link href="/sektorel-yazilim-cozumleri" className="hover:text-black transition uppercase tracking-widest text-[10px] font-bold">
                        Sektörel Çözümler
                    </Link>
                    <span className="text-black/20">/</span>
                    <span className="text-black font-bold uppercase tracking-widest text-[10px]">{sector.name}</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 border border-red-600/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        Sektörel Çözüm
                    </span>
                    <h1
                        className="text-4xl sm:text-6xl font-light text-black tracking-tighter mt-2 leading-[1.1] uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {sector.title}
                    </h1>
                    <p className="mt-6 text-xl text-black/60 leading-relaxed font-normal max-w-2xl">
                        {sector.intro}
                    </p>
                </div>

                {/* Deep Dive Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">{sector.name} Sektöründe Yaklaşımımız</h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <div className="space-y-5 max-w-3xl">
                        {sector.deepDive.map((paragraph, i) => (
                            <p key={i} className="text-black/60 leading-relaxed">{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">{sector.name} İçin Sunduğumuz Hizmetler</h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sector.services.map((service, i) => (
                            <Link
                                key={i}
                                href={service.href}
                                className="group block p-6 bg-black/[0.02] hover:bg-black/[0.05] transition border border-black/5"
                            >
                                <h3 className="font-bold text-black uppercase tracking-tight group-hover:text-red-600 transition mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-sm text-black/60 leading-relaxed">{service.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">{sector.name} Hakkında Sık Sorulan Sorular</h2>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                    <div className="space-y-6">
                        {sector.faqs.map((faq, i) => (
                            <div key={i} className="border-b border-black/10 pb-6">
                                <h3 className="font-bold text-black mb-3">{faq.question}</h3>
                                <p className="text-black/60 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA grid */}
                <div className="pt-16 border-t border-black/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold mb-6">İletişime Geçin</h2>
                            <p className="text-black/60 mb-8 leading-relaxed">
                                {sector.cta}
                            </p>
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                            >
                                TEKLİF ALIN
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold mb-6">Tüm Hizmetlerimiz</h2>
                            <p className="text-black/60 mb-8 leading-relaxed">
                                Etkinlikleriniz için sunduğumuz tüm interaktif dijital aktivasyon çözümlerini keşfedin.
                            </p>
                            <Link
                                href="/hizmetler"
                                className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-black/80 transition uppercase tracking-widest text-xs"
                            >
                                HİZMETLERİ GÖR
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="mt-20 bg-black rounded-2xl px-8 sm:px-14 py-14 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">Etkinliğinizi Planlayalım</p>
                    <p
                        className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        Projeniz için<br />
                        <span className="font-bold">Hemen Teklif Alın</span>
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-8">
                        Markanıza özel çözümler için ekibimizle hemen iletişime geçin. Size 24 saat içinde geri döneceğiz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                        >
                            ETKİNLİĞİMİZİ PLANLAYALIM
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
                        href="/sektorel-yazilim-cozumleri"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        TÜM SEKTÖREL ÇÖZÜMLER
                    </Link>
                </div>
            </div>
        </div>
    );
}
