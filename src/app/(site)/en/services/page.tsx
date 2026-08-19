import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, generateFAQSchema } from "@/lib/site";
import CapabilitiesIndexPrototype from "@/components/phase2/CapabilitiesIndexPrototype";
import { isEnglishCategoryPublishable, isEnglishServicePublishable } from "@/lib/publication";
import { capabilityListingImageOverrides } from "@/lib/phase2-content";

export const revalidate = 3600;

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

const getCategories = unstable_cache(
    async () => prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: { services: { where: { published: true }, orderBy: { order: "asc" } } },
    }),
    ["service-categories"],
    { revalidate: 60 }
);

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
    const categories = (await getCategories())
        .filter((category) => isEnglishCategoryPublishable(category))
        .map((category) => ({
            ...category,
            services: category.services.filter((service) => isEnglishServicePublishable(service, category)),
        }))
        .filter((category) => category.services.length > 0);
    const capabilities = categories.flatMap((category) =>
        category.services
            .filter((service) => service.image)
            .map((service) => ({
                id: service.id,
                title: service.title_en!,
                image: capabilityListingImageOverrides[service.id] || service.image!,
                href: `/en/services/${category.slug_en}/${service.slug_en}`,
            }))
    );
    const faqSchema = generateFAQSchema(serviceFAQs);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <CapabilitiesIndexPrototype capabilities={capabilities} locale="en" />
        </>
    );
}
