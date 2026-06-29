import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import Link from "next/link";
import CtaSection from "@/components/site/CtaSection";

export const revalidate = 3600;

const CATEGORY_ACCENT: Record<string, string> = {
    "ai-event-solutions": "#7c3aed",
    "photobooth-photo-activations": "#e879f9",
    "interactive-event-activities": "#fb923c",
};

const categoryFAQsEn: Record<string, { question: string; answer: string }[]> = {
    "ai-event-solutions": [
        {
            question: "How is AI photo and face swap used at events?",
            answer: "MetasoftCo's AI Photo systems use Stable Diffusion and ControlNet technology to transform guests' photos into different concepts — Forbes cover, Cyberpunk, Renaissance, and more — in seconds. A single stand is set up, the guest's photo is taken, and the transformed image is shared via email or QR code within 5-15 seconds.",
        },
        {
            question: "How long does AI face transformation take?",
            answer: "Thanks to the LoRA-based model architecture, face transformation completes in 5-15 seconds. A real-time preview is shown to the guest; after confirmation, printing or digital sharing is done. A single station can serve 40-60 people per hour continuously.",
        },
        {
            question: "What is the AI Fashion Mirror (Smart Mirror)?",
            answer: "It's an interactive mirror equipped with Computer Vision and Augmented Reality (AR) technology. Using Unity/WebGL-based real-time rendering, guests can try on virtual outfits or transform into brand characters. Real-time segmentation technology automatically removes the background. Ideal for fashion, textile, and brand activation events.",
        },
        {
            question: "Are these AI technologies suitable for corporate events?",
            answer: "Yes. All systems are configured specifically for your brand identity — logo, color palette, and theme content are prepared according to your corporate identity. KVKK-compliant data management, pre-event technical testing, and on-site support during the event are standard.",
        },
        {
            question: "How many people can be served at an event?",
            answer: "The scalable architecture works for small seminars to fairs with thousands of attendees. A single station serves 40-60 people per hour; multiple stations can be set up for larger events to increase capacity.",
        },
    ],
    "photobooth-photo-activations": [
        {
            question: "What is the difference between a digital photobooth and a classic photobooth?",
            answer: "MetasoftCo digital photobooths offer AI background removal, instant social media sharing, brand customization, and analytics reporting. A classic photobooth only takes photos; a digital photobooth is a brand experience platform that reports participant data in a KVKK-compliant manner.",
        },
        {
            question: "How long does photobooth setup take?",
            answer: "The MetasoftCo team arrives at the event venue 2-3 hours early to complete all hardware and software setup. Compact systems can be ready in 45 minutes. Setup and teardown service is included in the price.",
        },
        {
            question: "How are photos delivered to participants?",
            answer: "Options include email (instant delivery), SMS link, or QR code scanning at the kiosk screen. Direct Instagram or LinkedIn sharing can also be enabled upon request.",
        },
        {
            question: "Can I receive an analytics report after the event?",
            answer: "Yes. The real-time analytics panel reports attendance count, sharing rates, peak hours, and interaction durations. A PDF report is provided after the event. All data collection takes place with KVKK-compliant explicit consent.",
        },
        {
            question: "What types of events is a photobooth suitable for?",
            answer: "Product launches, trade show activations, corporate year-end parties, opening ceremonies, graduation ceremonies, technology conferences, retail activations, and wedding events are the main use cases.",
        },
    ],
    "interactive-event-activities": [
        {
            question: "What is the purpose of interactive games at corporate events?",
            answer: "Gamification increases employee engagement, brand awareness, and event participation. Surveys, product introductions, and reward campaigns are transformed into an entertaining format. Leaderboards encourage competitive participation.",
        },
        {
            question: "What interactive game concepts are available?",
            answer: "Ready-made modules: Interactive Memory Game (card matching with brand visuals), Digital Gift Wheel Activation (spin the wheel and win rewards), Recycling Win Game (sustainability-themed). Fully custom game mechanics can also be developed for your specific event.",
        },
        {
            question: "Can games be customized with brand identity?",
            answer: "Yes. All games are fully customized with your company logo, color palette, and content. Product visuals, brand slogans, and campaign messages are integrated into the game. Configuration is locked after brand approval.",
        },
        {
            question: "What are the technical requirements for interactive games?",
            answer: "Works with a tablet (10\"+), large touchscreen, or standard computer. An internet connection and power outlet are sufficient. All hardware is provided by MetasoftCo and installed by our team.",
        },
        {
            question: "Is there social media integration in the games?",
            answer: "Yes. After the game, the player's score or achievement screen can redirect to a social media sharing module. Hashtags, brand tags, and event-specific frames are supported.",
        },
    ],
};

interface PageProps {
    params: Promise<{ category: string }>;
}

async function getCategoryBySlugEn(slugEn: string) {
    return prisma.serviceCategory.findFirst({
        where: { slug_en: slugEn },
        include: { services: { where: { published: true }, orderBy: { order: "asc" } } },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);
    if (!category) return {};

    const title = category.metaTitle_en || category.metaTitle || `${category.name_en || category.name} | MetasoftCo`;
    const description = category.metaDescription_en || category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/en/services/${categorySlugEn}`;

    return {
        title,
        description,
        keywords: category.metaKeywords_en || undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: "en_US",
            type: "website",
            images: [{ url: `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`] },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/hizmetler/${category.slug}`,
                tr: `${siteConfig.url}/hizmetler/${category.slug}`,
                en: url,
            },
        },
    };
}

export default async function EnCategoryHubPage({ params }: PageProps) {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: `${siteConfig.url}/en` },
        { name: "Services", url: `${siteConfig.url}/en/services` },
        { name: category.name_en || category.name, url: `${siteConfig.url}/en/services/${categorySlugEn}` },
    ]);

    const faqs = categoryFAQsEn[categorySlugEn] || [];
    const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;
    const c1 = CATEGORY_ACCENT[categorySlugEn] || "#22d3ee";

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <main className="min-h-screen bg-[#0a0a0f]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[#0a0a0f]">
                    <div
                        className="aurora-blob aurora-drift"
                        style={{ width: 640, height: 640, top: "-18%", left: "4%", background: `radial-gradient(circle, ${c1}59, transparent 70%)` }}
                    />
                    <div
                        className="aurora-blob aurora-drift2"
                        style={{ width: 560, height: 560, top: "-12%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)" }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
                    />

                    <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-16">
                        <nav
                            className="flex items-center gap-2 mb-8 text-[rgba(255,255,255,.4)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                        >
                            <Link href="/en" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/en/services" className="hover:text-white transition-colors">Services</Link>
                            <span>/</span>
                            <span className="text-white/70">{category.name_en || category.name}</span>
                        </nav>

                        <div className="max-w-[920px]">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-[26px]">
                                <span className="h-[7px] w-[7px] rounded-full" style={{ background: c1, boxShadow: `0 0 10px ${c1}` }} />
                                <span
                                    className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                >
                                    {category.services.length} SERVICES
                                </span>
                            </div>

                            <h1
                                className="text-white font-bold tracking-[-0.02em] leading-[0.98]"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px, 6vw, 64px)" }}
                            >
                                {category.name_en || category.name}
                            </h1>

                            {(category.metaDescription_en || category.heroContent) && (
                                <p
                                    className="mt-[22px] max-w-[640px] text-[rgba(255,255,255,.64)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.55 }}
                                >
                                    {category.metaDescription_en || category.heroContent}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {category.services.map((service) => (
                            <Link
                                key={service.id}
                                href={
                                    service.slug_en
                                        ? `/en/services/${categorySlugEn}/${service.slug_en}`
                                        : `/hizmetler/${category.slug}/${service.slug}`
                                }
                                className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-3 hover:border-white/30"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title_en || service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)",
                                            }}
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[.34]"
                                        style={{ background: `radial-gradient(circle at 72% 20%, ${c1}, transparent 64%)` }}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                    <div className="flex items-start justify-between gap-3 mb-2.5">
                                        <div
                                            className="text-white"
                                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.2, fontWeight: 600 }}
                                        >
                                            {service.title_en || service.title}
                                        </div>
                                        <span className="text-[17px] font-semibold text-[var(--acc)] shrink-0">→</span>
                                    </div>
                                    {(service.description_en || service.description) && (
                                        <p
                                            className="text-[rgba(255,255,255,.55)]"
                                            style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                        >
                                            {service.description_en || service.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                {faqs.length > 0 && (
                    <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pb-20 sm:pb-24 border-t border-white/[0.08] pt-16">
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                        <div className="max-w-[760px] mt-8">
                            {faqs.map((faq, i) => (
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
                    </section>
                )}

                <CtaSection />
            </main>
        </>
    );
}
