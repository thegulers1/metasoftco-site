"use client";

import { useLanguage } from "@/providers/LanguageProvider";

interface Service {
    number: string;
    title: string;
    title_en: string;
    description: string;
    description_en: string;
    icon: string;
}

const services: Service[] = [
    {
        number: "01",
        title: "AI Photo",
        title_en: "AI Photo",
        description: "Yapay zeka destekli fotoğraf çözümleri",
        description_en: "AI-powered photo solutions",
        icon: "🎨"
    },
    {
        number: "02",
        title: "AI Greenbox",
        title_en: "AI Greenbox",
        description: "Sanal stüdyo ve greenscreen teknolojisi",
        description_en: "Virtual studio and greenscreen technology",
        icon: "📹"
    },
    {
        number: "03",
        title: "AI Draw",
        title_en: "AI Draw",
        description: "Yapay zeka ile çizim ve tasarım",
        description_en: "AI-powered drawing and design",
        icon: "✏️"
    },
    {
        number: "04",
        title: "İnteraktif Deneyimler",
        title_en: "Interactive Experiences",
        description: "Kullanıcı odaklı etkileşimli çözümler",
        description_en: "User-focused interactive solutions",
        icon: "✨"
    }
];

export default function AkisServicesSection() {
    const { language, t } = useLanguage();

    return (
        <section className="relative bg-black py-20 lg:py-32 overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#FF3B3F]/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <p className="text-[#FF3B3F] text-sm uppercase tracking-wider mb-4">
                        {t("Hizmetler", "Services")}
                    </p>
                    <h2 className="text-center text-3xl lg:text-5xl text-white font-light max-w-3xl">
                        {t("Stratejiden lansmanına kadar", "From strategy to launch")}
                    </h2>
                </div>

                {/* Services Grid - Desktop version (hidden on mobile) */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-5 mx-auto lg:translate-y-0">
                    {/* First row - 3 cards (starting from column 2) */}
                    <div className="lg:col-start-2 lg:col-end-5 grid grid-cols-3 gap-5">
                        {services.slice(1, 4).map((service, index) => (
                            <ServiceCard 
                                key={service.number} 
                                service={service} 
                                language={language}
                            />
                        ))}
                    </div>
                </div>

                {/* Services List - Full list with sticky behavior */}
                <div className="w-full max-w-container mx-auto mt-12 lg:mt-0 lg:gap-28 max-w-sm mx-auto lg:max-w-fit lg:mx-0 col-span-12">
                    <ul className="flex flex-col gap-48 lg:gap-28">
                        {services.map((service) => (
                            <li key={service.number} className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                                {/* Service Card - Sticky on desktop */}
                                <div className="lg:col-start-1 lg:col-end-4">
                                    <div className="lg:sticky lg:top-24 relative z-0 group">
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3B3F]/80 via-[#FF3B3F]/40 to-[#FF3B3F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out rounded-[6px] -z-10 blur-xl" />
                                        
                                        {/* Border on hover */}
                                        <div className="absolute inset-0 border border-[#FF3B3F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out rounded-[6px] pointer-events-none -z-10" />
                                        
                                        {/* Card content */}
                                        <div className="relative z-10">
                                            <ServiceCard service={service} language={language} />
                                        </div>
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div className="lg:col-start-5 lg:col-end-12 lg:pb-72 lg:pt-64">
                                    <p className="text-xs lg:text-sm bg-white/10 px-2 py-1 lg:py-2 lg:px-4 rounded-sm inline-block lg:mb-4 text-white">
                                        {language === "en" ? service.title_en : service.title}
                                    </p>
                                    <h2 className="text-2xl lg:text-4xl text-white mt-2 mb-8">
                                        {language === "en" ? service.description_en : service.description}
                                    </h2>
                                    
                                    {/* Features list - you can customize this */}
                                    <ul className="space-y-1">
                                        <li className="text-sm lg:text-base text-gray-400">Modern teknoloji</li>
                                        <li className="text-sm lg:text-base text-gray-400">Hızlı teslimat</li>
                                        <li className="text-sm lg:text-base text-gray-400">Profesyonel destek</li>
                                    </ul>

                                    <div className="mt-8">
                                        <a 
                                            href={`/hizmetler/${service.number}`}
                                            className="bg-white text-black hover:bg-gray-200 px-4 py-3 rounded-sm text-xs lg:text-sm inline-flex items-center gap-3 transition-colors duration-300 group"
                                        >
                                            {t("Daha fazla bilgi", "Read more")}
                                            <svg 
                                                className="fill-none stroke-black transition-transform duration-300 group-hover:translate-x-1" 
                                                width="7" 
                                                height="12" 
                                                viewBox="0 0 7 12" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    clipRule="evenodd" 
                                                    d="M6.27092 6.01913L1.06893 0.817139L0.306641 1.57943L4.74965 6.02245L0.306771 10.4653L1.06907 11.2276L6.2739 6.02279L6.27058 6.01947L6.27092 6.01913Z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

// Service Card Component
function ServiceCard({ service, language }: { service: Service; language: string }) {
    return (
        <div className="bg-gradient-to-br from-white/5 via-white/[0.02] to-black/10 backdrop-blur-md rounded-[5px] border border-white/10 px-6 py-8 h-[180px] transition-all duration-300">
            <div className="grid grid-cols-5 h-full gap-4">
                <div className="flex flex-col justify-between col-span-3">
                    <span className="text-sm text-white/70">{service.number}</span>
                    <div>
                        <p className="text-base lg:text-lg text-white whitespace-nowrap">
                            {language === "en" ? service.title_en : service.title}
                        </p>
                    </div>
                </div>
                
                {/* Icon/Image placeholder */}
                <div className="flex col-span-2 items-center justify-end">
                    <div className="aspect-square w-full max-w-[132px] flex items-center justify-center text-6xl">
                        {service.icon}
                    </div>
                </div>
            </div>
        </div>
    );
}
