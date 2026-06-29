import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/site";
import { getSectorBySlugEn, sectors } from "@/app/(site)/sektorel-yazilim-cozumleri/data";
import CtaSection from "@/components/site/CtaSection";

interface PageProps {
    params: Promise<{ sektor: string }>;
}

export async function generateStaticParams() {
    return sectors.map((s) => ({ sektor: s.slug_en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { sektor } = await params;
    const sector = getSectorBySlugEn(sektor);
    if (!sector) return {};

    const url = `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}`;
    const image = `${siteConfig.url}/og?title=${encodeURIComponent(sector.name_en)}&desc=${encodeURIComponent(sector.title_en)}`;

    return {
        title: sector.metaTitle_en,
        description: sector.metaDescription_en,
        keywords: sector.keywords_en,
        openGraph: {
            title: sector.metaTitle_en,
            description: sector.metaDescription_en,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: "en_US",
            type: "website",
        },
        twitter: { card: "summary_large_image", title: sector.metaTitle_en, description: sector.metaDescription_en },
        alternates: {
            canonical: url,
            languages: {
                tr: `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`,
                en: url,
                "x-default": `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`,
            },
        },
    };
}

export default async function SektorEnPage({ params }: PageProps) {
    const { sektor } = await params;
    const sector = getSectorBySlugEn(sektor);
    if (!sector) notFound();

    const faqSchema = generateFAQSchema(sector.faqs_en);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Sectoral Solutions", url: `${siteConfig.url}/en/industry-software-solutions` },
        { name: sector.name_en, url: `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}` },
    ]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="mx-auto max-w-[840px] px-6 sm:px-8">
                {/* Breadcrumb */}
                <nav
                    className="mb-8 flex items-center gap-2 text-[rgba(255,255,255,.4)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                >
                    <Link href="/en" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/en/industry-software-solutions" className="hover:text-white transition-colors">Sectoral Solutions</Link>
                    <span>/</span>
                    <span className="text-white/70">{sector.name_en}</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-5">
                        <span className="h-[7px] w-[7px] rounded-full bg-[var(--acc)]" style={{ boxShadow: "0 0 10px var(--acc)" }} />
                        <span
                            className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            Sector Solution
                        </span>
                    </div>
                    <h1
                        className="text-white font-bold tracking-[-0.02em] leading-[1.05]"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 6vw, 56px)" }}
                    >
                        {sector.title_en}
                    </h1>
                    <p
                        className="mt-6 max-w-[640px] text-[rgba(255,255,255,.64)]"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.6 }}
                    >
                        {sector.intro_en}
                    </p>
                </div>

                {/* Deep Dive Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2
                            className="text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                        >
                            Our Approach to {sector.name_en}
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/[0.08]" />
                    </div>
                    <div className="space-y-5" style={{ fontFamily: "var(--font-manrope)" }}>
                        {sector.deepDive_en.map((paragraph, i) => (
                            <p key={i} className="text-[rgba(255,255,255,.6)]" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2
                            className="text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                        >
                            Our {sector.name_en} Services
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/[0.08]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sector.services_en.map((service, i) => (
                            <Link
                                key={i}
                                href={service.href}
                                className="group block p-6 rounded-[16px] border border-white/[0.08] hover:border-white/20 transition-colors"
                                style={{ background: "rgba(255,255,255,.04)" }}
                            >
                                <h3
                                    className="text-white group-hover:text-[var(--acc)] transition-colors mb-2"
                                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 16, fontWeight: 600 }}
                                >
                                    {service.name}
                                </h3>
                                <p
                                    className="text-[rgba(255,255,255,.55)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                >
                                    {service.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2
                            className="text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                        >
                            FAQ — {sector.name_en}
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/[0.08]" />
                    </div>
                    <div>
                        {sector.faqs_en.map((faq, i) => (
                            <div key={i} className="border-b border-white/[0.08] py-6">
                                <h3
                                    className="text-white mb-2"
                                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 17, fontWeight: 600 }}
                                >
                                    {faq.question}
                                </h3>
                                <p
                                    className="text-[rgba(255,255,255,.55)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.65 }}
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Get in Touch + Services */}
                <div className="pt-16 border-t border-white/[0.08]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2
                                className="text-[var(--acc)] mb-5"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                Get in Touch
                            </h2>
                            <p
                                className="mb-7 text-[rgba(255,255,255,.55)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.6 }}
                            >
                                {sector.cta_en}
                            </p>
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-[0.1em] px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
                                style={{ background: "linear-gradient(90deg, #7c3aed, var(--acc))", fontFamily: "var(--font-manrope)" }}
                            >
                                Get a Quote
                            </Link>
                        </div>
                        <div>
                            <h2
                                className="text-[var(--acc)] mb-5"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                All Our Services
                            </h2>
                            <p
                                className="mb-7 text-[rgba(255,255,255,.55)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.6 }}
                            >
                                Explore all interactive digital activation solutions we offer for your events.
                            </p>
                            <Link
                                href="/en/services"
                                className="inline-flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-[0.1em] px-7 py-3.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-16">
                    <Link
                        href="/en/industry-software-solutions"
                        className="inline-flex items-center gap-2 text-[rgba(255,255,255,.4)] hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase" }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        All Sector Solutions
                    </Link>
                </div>
            </div>

            <CtaSection />
        </div>
    );
}
