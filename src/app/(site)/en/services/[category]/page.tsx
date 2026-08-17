import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import CapabilityCategoryScreen from "@/components/phase2/CapabilityCategoryScreen";

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
            <CapabilityCategoryScreen
                locale="en"
                name={category.name_en || category.name}
                heroCopy={category.metaDescription_en || category.heroContent}
                services={category.services.map((service) => ({
                    id: service.id,
                    title: service.title_en || service.title,
                    image: service.image,
                    href: service.slug_en
                        ? `/en/services/${categorySlugEn}/${service.slug_en}`
                        : `/hizmetler/${category.slug}/${service.slug}`,
                }))}
                faqs={faqs}
            />
        </>
    );
}
