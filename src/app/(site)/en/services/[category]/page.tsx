import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import Link from "next/link";

export const revalidate = 3600;

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
        include: { services: { orderBy: { order: "asc" } } },
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

            <main className="min-h-screen bg-white">
                {/* Hero */}
                <section className="pt-36 pb-20 border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 font-bold mb-10">
                            <Link href="/en" className="hover:text-black transition">Home</Link>
                            <span>/</span>
                            <Link href="/en/services" className="hover:text-black transition">Services</Link>
                            <span>/</span>
                            <span className="text-black">{category.name_en || category.name}</span>
                        </nav>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-6 border border-red-600/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            {category.name_en || category.name}
                        </span>

                        <h1
                            className="text-4xl sm:text-6xl lg:text-7xl font-light text-black tracking-tighter leading-[1.05] uppercase mb-8 max-w-4xl"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {category.name_en || category.name}
                        </h1>

                        {(category.metaDescription_en || category.heroContent) && (
                            <p className="text-lg text-black/60 leading-relaxed max-w-3xl">
                                {category.metaDescription_en || category.heroContent}
                            </p>
                        )}
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                {category.services.length} Services
                            </h2>
                            <div className="h-[1px] flex-1 bg-black/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={
                                        service.slug_en
                                            ? `/en/services/${categorySlugEn}/${service.slug_en}`
                                            : `/hizmetler/${category.slug}/${service.slug}`
                                    }
                                    className="group block relative aspect-[4/3] overflow-hidden bg-neutral-100"
                                >
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title_en || service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                            <span
                                                className="text-white text-3xl font-bold uppercase tracking-tighter text-center leading-tight"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title_en || service.title}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-5 left-0">
                                        <div className="bg-white px-6 py-4 border-y border-r border-black/5">
                                            <h3
                                                className="text-lg font-bold text-red-600 uppercase tracking-tighter leading-none"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title_en || service.title}
                                            </h3>
                                            {(service.description_en || service.description) && (
                                                <p className="text-xs text-black/50 mt-1 line-clamp-1">
                                                    {service.description_en || service.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {faqs.length > 0 && (
                    <section className="py-20 border-t border-black/5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                    Frequently Asked Questions
                                </h2>
                                <div className="h-[1px] flex-1 bg-black/5" />
                            </div>
                            <div className="max-w-3xl">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border-b border-black/5 py-6">
                                        <h3 className="font-semibold text-black mb-2">{faq.question}</h3>
                                        <p className="text-black/60 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-24 bg-black mx-4 sm:mx-8 mb-16 rounded-2xl">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                            Let&apos;s Plan Your Event
                        </p>
                        <p
                            className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            Get a Quote <br />
                            <span className="font-bold">For Your Project</span>
                        </p>
                        <p className="text-white/40 text-sm mb-8">
                            We&apos;ll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                            >
                                PLAN MY EVENT
                            </Link>
                            <a
                                href="tel:+905342334051"
                                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase tracking-widest text-xs"
                            >
                                +90 534 233 4051
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
