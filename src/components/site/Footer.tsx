"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

function localizedHref(language: "tr" | "en", trPath: string, enPath: string | null) {
    if (language === "en" && enPath) return enPath;
    return trPath;
}

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-[#0a0a0f] text-white border-t border-white/[0.08]">
            <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-12 pt-[72px] pb-9">
                <div className="flex justify-between gap-12 flex-wrap">
                    {/* Brand */}
                    <div className="max-w-[340px]">
                        <div
                            className="mb-4"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 22, fontWeight: 700 }}
                        >
                            METASOFT<span className="text-[var(--acc)]">CO</span>
                        </div>
                        <p
                            className="text-[rgba(255,255,255,.5)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.6 }}
                        >
                            {t(
                                "İstanbul merkezli, uçtan uca yapay zeka etkinlik & interaktif aktivasyon ajansı. Teknolojiyi sahneye çıkarıyoruz.",
                                "Istanbul-based, end-to-end AI event & interactive activation agency. We bring technology to the stage."
                            )}
                        </p>
                    </div>

                    {/* Columns */}
                    <div className="flex gap-16 flex-wrap">
                        <div>
                            <div
                                className="text-[rgba(255,255,255,.4)] mb-[18px]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".1em", fontWeight: 600 }}
                            >
                                {t("SAYFALAR", "PAGES")}
                            </div>
                            <div
                                className="flex flex-col gap-3 text-[rgba(255,255,255,.7)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 500 }}
                            >
                                <Link href={localizedHref(language, "/projeler", "/en/projects")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    {t("Projeler", "Projects")}
                                </Link>
                                <Link href={localizedHref(language, "/hizmetler", "/en/services")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    {t("Hizmetler", "Services")}
                                </Link>
                                <Link href={localizedHref(language, "/sektorel-yazilim-cozumleri", "/en/industry-software-solutions")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    {t("Sektörel Çözümler", "Industry Solutions")}
                                </Link>
                                <Link href={localizedHref(language, "/blog", "/en/blog")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    Blog
                                </Link>
                                <Link href={localizedHref(language, "/hakkimizda", "/en/hakkimizda")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    {t("Hakkımızda", "About")}
                                </Link>
                                <Link href={localizedHref(language, "/iletisim", "/en/contact")} className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    {t("İletişim", "Contact")}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div
                                className="text-[rgba(255,255,255,.4)] mb-[18px]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".1em", fontWeight: 600 }}
                            >
                                {t("İLETİŞİM", "CONTACT")}
                            </div>
                            <div
                                className="flex flex-col gap-3 text-[rgba(255,255,255,.7)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 500 }}
                            >
                                <a href="mailto:info@metasoftco.com" className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors w-fit">
                                    info@metasoftco.com
                                </a>
                                <a href="tel:+905342334051" className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors w-fit">
                                    +90 534 233 40 51
                                </a>
                                <span className="text-[rgba(255,255,255,.5)] max-w-[220px]">
                                    Zeytinlik, Fişekhane Cd. 5/17
                                    <br />
                                    34140 Bakırköy / İstanbul
                                </span>
                            </div>
                        </div>

                        <div>
                            <div
                                className="text-[rgba(255,255,255,.4)] mb-[18px]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".1em", fontWeight: 600 }}
                            >
                                {t("SOSYAL", "SOCIAL")}
                            </div>
                            <div
                                className="flex flex-col gap-3 text-[rgba(255,255,255,.7)]"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 500 }}
                            >
                                <Link href="https://www.linkedin.com/company/metasoftco" rel="nofollow noopener noreferrer" target="_blank" className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    LinkedIn
                                </Link>
                                <Link href="https://instagram.com/metasoftco" rel="nofollow noopener noreferrer" target="_blank" className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    Instagram
                                </Link>
                                <Link href="https://www.youtube.com/@MetasoftCo" rel="nofollow noopener noreferrer" target="_blank" className="text-[rgba(255,255,255,.7)] hover:text-white transition-colors">
                                    YouTube
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech line */}
                <div className="mt-14 pt-6 border-t border-white/[0.07]">
                    <p
                        className="text-[rgba(255,255,255,.32)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, lineHeight: 1.7 }}
                    >
                        {t(
                            "Teknolojiler: Stable Diffusion · LoRA Fine-tuning · ControlNet · AR · Computer Vision · WebGL · Real-time Image Processing · Next.js · KVKK Uyumlu",
                            "Technologies: Stable Diffusion · LoRA Fine-tuning · ControlNet · AR · Computer Vision · WebGL · Real-time Image Processing · Next.js · KVKK Compliant"
                        )}
                    </p>
                    <div className="flex justify-between items-center mt-[22px] flex-wrap gap-3.5">
                        <span
                            className="text-[rgba(255,255,255,.4)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 500 }}
                        >
                            © 2026 MetasoftCo · {t("Tüm hakları saklıdır.", "All rights reserved.")}
                        </span>
                        <div
                            className="flex gap-6 text-[rgba(255,255,255,.4)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 500 }}
                        >
                            <Link href="/kullanim-kosullari" className="text-[rgba(255,255,255,.4)] hover:text-white transition-colors">
                                {t("Şartlar ve Koşullar", "Terms and conditions")}
                            </Link>
                            <Link href="/gizlilik" className="text-[rgba(255,255,255,.4)] hover:text-white transition-colors">
                                {t("Gizlilik Politikası", "Privacy policy")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
