"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";

export default function CtaSection() {
    const { t, language } = useLanguage();

    return (
        <section className="py-20 sm:py-24 bg-[#0a0a0f]">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative overflow-hidden rounded-[28px] bg-[#0d0d16] border border-white/10 px-8 sm:px-16 py-20 text-center"
                >
                    <div
                        className="aurora-blob aurora-drift"
                        style={{
                            width: 500,
                            height: 500,
                            top: "-20%",
                            left: "-10%",
                            background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)",
                        }}
                    />
                    <div
                        className="aurora-blob aurora-drift2"
                        style={{
                            width: 460,
                            height: 460,
                            bottom: "-25%",
                            right: "-5%",
                            background: "radial-gradient(circle, rgba(34,211,238,0.28), transparent 70%)",
                        }}
                    />

                    <div className="relative z-10">
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {t("FİKİRDEN SAHNEYE EN HIZLI YOL", "THE FASTEST PATH FROM IDEA TO STAGE")}
                        </span>
                        <h2
                            className="text-white font-bold tracking-[-0.02em] mt-4 mb-6"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05 }}
                        >
                            {t("Etkinliğiniz 30 gün içinde mi?", "Is your event in 30 days?")}
                        </h2>
                        <p
                            className="text-[rgba(255,255,255,.64)] max-w-lg mx-auto mb-10"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 16, lineHeight: 1.55 }}
                        >
                            {t(
                                "Yazılımdan prodüksiyona, tek çatı altında. Bugün konuşalım — gerisini biz hallederiz.",
                                "From software to production, all under one roof. Let's talk today — we'll handle the rest."
                            )}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href={language === "en" ? "/en/contact" : "/iletisim"}
                                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0a0f] px-7 py-3.5 text-[15px] font-semibold hover:bg-gray-200 transition-colors"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                {t("Bizimle İletişime Geçin", "Get in Touch")} →
                            </Link>
                            <a
                                href="https://wa.me/905342334051"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-semibold text-white/85 hover:border-white/30 hover:text-white transition-colors"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
