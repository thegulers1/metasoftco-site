"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";

const references = [
    "VODAFONE", "CLINIQUE", "WINGS", "ORIGINS",
    "JACK & JONES", "RAY-BAN", "ENERJİSA", "RED BULL",
    "CORNY", "GLISS", "BIODERMA", "CASTROL",
    "DYNAVİT", "AKBANK", "GARANTİ BANKASI", "ECZACIBAŞI",
    "B/S/H/", "RIJK ZWAAN", "TAVUK DÜNYASI", "ESPRESSOLAB",
    "DEFACTO", "PEGASUS", "MG", "DR.JART+",
    "STRADESCO", "LC WAİKİKİ", "PERSİL", "ANADOLU HAYAT EMEKLİLİK",
    "SCHWARZKOPF", "ADIDAS", "HARIBO", "MERCEDES-BENZ", "SAMSUNG", "NIVEA", "TURKCELL",
];

export function ReferencesSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 relative bg-[#0d0d0d]" id="referanslar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[36px] md:text-[42px] leading-[1] tracking-tighter text-[#e5e5e5] mb-4"
                        style={{ fontFamily: "var(--font-lato)" }}
                    >
                        <span className="font-light">{t("Bize", "THEY")}</span>{" "}
                        <span className="font-bold">{t("Güvenenler", "TRUST US")}</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                        {t(
                            "Sektör liderleriyle gerçekleştirdiğimiz başarılı projelerle güvenilir bir iş ortağı olduğumuzu kanıtlıyoruz.",
                            "We prove ourselves as a trusted partner through successful projects with industry leaders."
                        )}
                    </p>
                </motion.div>

                {/* Logo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-px bg-white/[0.04]">
                    {references.map((name, index) => (
                        <motion.div
                            key={name}
                            className="bg-[#0d0d0d] flex items-center justify-center py-8 px-4 hover:bg-[#141414] transition-colors duration-300 group"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                        >
                            <span
                                className="text-white/25 group-hover:text-white/70 transition-colors duration-300 text-center font-bold text-xs md:text-sm tracking-wider leading-tight"
                                style={{ fontFamily: "var(--font-lato)" }}
                            >
                                {name}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
