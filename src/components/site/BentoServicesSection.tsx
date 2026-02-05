"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, CameraIcon, LayersIcon, PenToolIcon, Gamepad2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import AnimatedBeamMultipleOutputDemo from "./magicui-stubs/animated-beam-demo";
import AnimatedListDemo from "./magicui-stubs/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/ui/magicui/bento-grid";
import { Marquee } from "@/components/ui/magicui/marquee";
import { useLanguage } from "@/providers/LanguageProvider";

const files = [
    {
        name: "bitcoin.pdf",
        body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
        name: "finances.xlsx",
        body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
        name: "logo.svg",
        body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
        name: "keys.gpg",
        body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
        name: "seed.txt",
        body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
];

export function BentoServicesSection({ categories }: { categories: any[] }) {
    const { language, t } = useLanguage();

    // Map categories to bento layout
    const features = categories.slice(0, 4).map((category, idx) => {
        const name = language === 'en' ? (category.name_en || category.name) : category.name;
        const description = language === 'en'
            ? (category.services[0]?.description_en || category.services[0]?.description || "")
            : (category.services[0]?.description || "");

        const backgrounds = [
            (
                <Marquee
                    pauseOnHover
                    className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
                >
                    {files.map((f, idx) => (
                        <figure
                            key={idx}
                            className={cn(
                                "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
                            )}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-col">
                                    <figcaption className="text-sm font-medium dark:text-white">
                                        {f.name}
                                    </figcaption>
                                </div>
                            </div>
                            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                        </figure>
                    ))}
                </Marquee>
            ),
            (
                <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
            ),
            (
                <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
            ),
            (
                <Calendar
                    mode="single"
                    selected={new Date()}
                    className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
                />
            )
        ];

        // Dynamic icon selection based on category slug or name
        let Icon = FileTextIcon;
        const slug = category.slug.toLowerCase();

        if (slug.includes('photo') || slug.includes('foto')) Icon = CameraIcon;
        else if (slug.includes('greenbox')) Icon = LayersIcon;
        else if (slug.includes('draw')) Icon = PenToolIcon;
        else if (slug.includes('interactive') || slug.includes('interaktif')) Icon = Gamepad2Icon;
        else if (idx === 1) Icon = BellIcon;
        else if (idx === 2) Icon = Share2Icon;
        else if (idx === 3) Icon = CalendarIcon;

        const classNames = [
            "col-span-3 lg:col-span-1",
            "col-span-3 lg:col-span-2",
            "col-span-3 lg:col-span-2",
            "col-span-3 lg:col-span-1"
        ];

        return {
            Icon: Icon,
            name: name,
            description: description,
            href: `/hizmetler/${category.slug}`,
            cta: t("İncele", "View Details"),
            className: classNames[idx] || "col-span-3 lg:col-span-1",
            background: backgrounds[idx] || backgrounds[0],
        };
    });

    return (
        <section id="hizmetler" className="bg-[#1a0202] py-20 relative overflow-hidden">
            {/* Focal "Light Hit" spotlight effect */}
            {/* Focal "Light Hit" spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none z-0 opacity-60">
                <div
                    style={{
                        backgroundImage: "conic-gradient(from 150deg at 50% 0%, transparent 0deg, #900a03 30deg, transparent 60deg)",
                    }}
                    className="absolute inset-0 w-full h-full blur-[100px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-16 relative z-10 text-center">
                <h2 className="text-3xl md:text-6xl font-medium tracking-tight text-white mb-6">
                    {t("Hizmetlerimiz", "Our Services")}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    {t(
                        "Yapay zeka ve teknoloji ile işinizi geleceğe taşıyoruz. İhtiyacınıza özel interaktif çözümler sunuyoruz.",
                        "We take your business to the future with AI and technology. We offer special interactive solutions for your needs."
                    )}
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <BentoGrid>
                    {features.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
