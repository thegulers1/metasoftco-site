"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Sparkles, MonitorPlay, MousePointer2, Code2, Palette } from "lucide-react";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    slug: string;
    image: string | null;
}

interface ServiceCategory {
    id: string;
    name: string;
    name_en: string | null;
    slug: string;
    services: Service[];
}

interface ServicesListClientProps {
    categories: ServiceCategory[];
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse"></div>
);

const getIcon = (index: number) => {
    const icons = [Sparkles, MonitorPlay, MousePointer2, Code2, Palette];
    const Icon = icons[index % icons.length];
    return <Icon className="h-4 w-4 text-neutral-500" />;
};

export default function ServicesListClient({ categories }: ServicesListClientProps) {
    const { language, t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#1a0202]">
            {/* Hero */}
            <LampContainer className="min-h-[50vh] pt-32" visualYOffset={8} disableLine>
                <motion.div
                    initial={{ opacity: 0.5, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center text-center translate-y-40"
                >
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white font-[family-name:var(--font-dm-sans)]"
                    >
                        {t("Hizmetlerimiz", "Our Services")}
                    </h1>
                    <p className="mt-6 text-lg text-[#f5f5f5] max-w-2xl font-[family-name:var(--font-dm-sans)]">
                        {t(
                            "Etkinliklerinizi unutulmaz kılmak için sunduğumuz profesyonel çözümler.",
                            "Professional solutions to make your events unforgettable."
                        )}
                    </p>
                </motion.div>
            </LampContainer>

            {/* Categories */}
            <section className="py-24 relative z-50 -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categories.map((category) => (
                        <div key={category.id} className="mb-24">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-dm-sans)]">
                                    {language === "en" ? (category.name_en || category.name) : category.name}
                                </h2>
                                <Link
                                    href={`/hizmetler/${category.slug}`}
                                    className="text-sm text-white/50 hover:text-white transition"
                                >
                                    {t("Tümünü Gör", "View All")} →
                                </Link>
                            </div>

                            <BentoGrid>
                                {category.services.map((service, i) => (
                                    <BentoGridItem
                                        key={service.id}
                                        title={language === "en" ? (service.title_en || service.title) : service.title}
                                        description={language === "en" ? (service.description_en || service.description) : service.description}
                                        header={<Skeleton />}
                                        icon={getIcon(i)}
                                        href={`/hizmetler/${category.slug}/${service.slug}`}
                                        image={service.image}
                                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                                    />
                                ))}
                            </BentoGrid>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black text-white py-24 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-dm-sans)]">
                        {t("Projeniz İçin Teklif Alın", "Get a Quote for Your Project")}
                    </h2>
                    <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">
                        {t(
                            "Etkinliğiniz için en uygun çözümü birlikte belirleyelim.",
                            "Let's determine the best solution for your event together."
                        )}
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-block px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition transform hover:scale-105"
                    >
                        {t("İletişime Geç", "Get in Touch")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
