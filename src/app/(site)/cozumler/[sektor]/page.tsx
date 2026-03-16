import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/site";
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

    const url = `${siteConfig.url}/cozumler/${sector.slug}`;
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
        alternates: { canonical: url },
    };
}

export default async function SektorPage({ params }: PageProps) {
    const { sektor } = await params;
    const sector = getSectorBySlug(sektor);
    if (!sector) notFound();

    const faqSchema = generateFAQSchema(sector.faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Çözümler", url: `${siteConfig.url}/cozumler` },
        { name: sector.name, url: `${siteConfig.url}/cozumler/${sector.slug}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="bg-white min-h-screen">
                {/* Hero */}
                <section className="pt-32 pb-20 bg-black text-white">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
                            <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
                            <span>/</span>
                            <Link href="/cozumler" className="hover:text-white transition-colors">Çözümler</Link>
                            <span>/</span>
                            <span className="text-white/70">{sector.name}</span>
                        </nav>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">Sektörel Çözüm</p>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 max-w-4xl">
                            {sector.title}
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                            {sector.intro}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 transition-colors text-sm uppercase tracking-widest"
                            >
                                {sector.cta}
                            </Link>
                            <Link
                                href="/hizmetler"
                                className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-medium px-8 py-4 transition-colors text-sm"
                            >
                                Tüm Hizmetleri Gör
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-4">{sector.name} için Çözümler</p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-12">
                            Sunduğumuz Hizmetler
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sector.services.map((service, i) => (
                                <div key={i} className="border border-black/10 p-8 hover:border-red-600 transition-colors group">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-black tracking-tight">{service.name}</h3>
                                        <span className="text-2xl font-black text-black/10 group-hover:text-red-600/20 transition-colors">
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <p className="text-black/60 leading-relaxed mb-4">{service.desc}</p>
                                    <Link
                                        href={service.href}
                                        className="text-xs font-semibold uppercase tracking-widest text-red-600 hover:underline underline-offset-4"
                                    >
                                        Detayları Gör →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-black/[0.03]">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-4">Sıkça Sorulan Sorular</p>
                        <h2 className="text-4xl font-black tracking-tighter text-black mb-12">
                            {sector.name} Hakkında<br />Merak Edilenler
                        </h2>
                        <div className="max-w-3xl space-y-6">
                            {sector.faqs.map((faq, i) => (
                                <div key={i} className="border-b border-black/10 pb-6">
                                    <h3 className="text-lg font-bold text-black mb-3">{faq.question}</h3>
                                    <p className="text-black/60 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-red-600 text-white">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-3">
                                Projenizi Hayata<br />Geçirelim
                            </h2>
                            <p className="text-white/80">{sector.cta}</p>
                        </div>
                        <Link
                            href="/iletisim"
                            className="shrink-0 inline-flex items-center gap-2 bg-white text-red-600 hover:bg-white/90 font-bold px-10 py-5 transition-colors text-sm uppercase tracking-widest"
                        >
                            İletişime Geç →
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
