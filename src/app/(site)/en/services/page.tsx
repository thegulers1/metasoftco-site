import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig, generateFAQSchema } from "@/lib/site";
import ServicesListClient from "@/app/(site)/hizmetler/ServicesListClient";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Interactive Event Services & Digital Activations | MetasoftCo",
    description: "AI-powered experiences, photobooth systems, interactive games and custom software by MetasoftCo. Professional digital activation solutions for your events.",
    openGraph: {
        title: "Interactive Event Services & Digital Activations | MetasoftCo",
        description: "Explore our AI, photo & video, and interactive event services.",
        url: `${siteConfig.url}/en/services`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/en/services`,
        languages: {
            "x-default": `${siteConfig.url}/hizmetler`,
            "tr": `${siteConfig.url}/hizmetler`,
            "en": `${siteConfig.url}/en/services`,
        },
    },
};

async function getCategories() {
    return prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                orderBy: { order: "asc" },
            },
        },
    });
}

const serviceFAQs = [
    {
        question: "What services does MetasoftCo offer?",
        answer: "MetasoftCo provides AI-powered photo transformation (face swap), photobooth systems, interactive games and gamification, brand activation, and custom software development.",
    },
    {
        question: "Do you provide services outside Istanbul?",
        answer: "Yes, while based in Istanbul, we provide event and software services throughout Turkey and internationally.",
    },
    {
        question: "How is a photobooth or AI photo system set up for an event?",
        answer: "The MetasoftCo team handles installation and integration before the event. Customized photobooth or AI photo booth solutions are offered based on the event type.",
    },
    {
        question: "How does AI face swap technology work?",
        answer: "Participants' faces are transformed in real-time using AI algorithms to a chosen template or character. The result is instantly available for digital sharing.",
    },
    {
        question: "How can I contact MetasoftCo?",
        answer: "You can email info@metasoftco.com or call +90 534 233 4051. You can also fill in the contact form at metasoftco.com/en/contact.",
    },
];

export default async function EnglishServicesPage() {
    const categories = await getCategories();
    const faqSchema = generateFAQSchema(serviceFAQs);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ServicesListClient categories={categories} />
        </>
    );
}
