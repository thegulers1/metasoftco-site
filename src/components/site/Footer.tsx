"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import InstagramFeed from "./InstagramFeed";

function localizedHref(language: "tr" | "en", trPath: string, enPath: string | null) {
    if (language === "en" && enPath) return enPath;
    return trPath;
}

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-[#1a0202] text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Instagram Feed */}
                <InstagramFeed />

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left: CTA */}
                    <div className="space-y-8">
                        <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
                            {t(
                                "Bir proje fikriniz mi var?\nHadi konuşalım!",
                                "You have a project idea?\nLets talk about it!"
                            )}
                        </h3>
                        <Link
                            href={language === "en" ? "/en/contact" : "/iletisim"}
                            className="inline-block bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        >
                            {t("İletişime Geçin", "Contact us")}
                        </Link>
                    </div>

                    {/* Right: Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
                        {/* Pages */}
                        <div className="space-y-4">
                            <h4 className="text-orange-500 font-medium">
                                {t("Sayfalar", "Pages")}
                            </h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <Link href={localizedHref(language, "/projeler", "/en/projects")} className="hover:text-white transition-colors">
                                        {t("Projeler", "Projects")}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localizedHref(language, "/hizmetler", "/en/services")} className="hover:text-white transition-colors">
                                        {t("Hizmetler", "Services")}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localizedHref(language, "/sektorel-yazilim-cozumleri", "/en/industry-software-solutions")} className="hover:text-white transition-colors">
                                        {t("Sektörel Çözümler", "Industry Solutions")}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localizedHref(language, "/blog", "/en/blog")} className="hover:text-white transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localizedHref(language, "/hakkimizda", "/en/hakkimizda")} className="hover:text-white transition-colors">
                                        {t("Hakkımızda", "About")}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localizedHref(language, "/iletisim", "/en/contact")} className="hover:text-white transition-colors">
                                        {t("İletişim", "Contact")}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Email */}
                        <div className="space-y-4">
                            <h4 className="text-orange-500 font-medium">
                                {t("E-posta", "Email")}
                            </h4>
                            <a
                                href="mailto:info@metasoftco.com"
                                className="block text-gray-400 hover:text-white transition-colors"
                            >
                                info@metasoftco.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="space-y-4">
                            <h4 className="text-orange-500 font-medium">
                                {t("Telefon", "Phone")}
                            </h4>
                            <a
                                href="tel:+905342334051"
                                className="block text-gray-400 hover:text-white transition-colors"
                            >
                                +90 534 233 4051
                            </a>
                        </div>

                        {/* Address */}
                        <div className="space-y-4">
                            <h4 className="text-orange-500 font-medium">
                                {t("Adres", "Address")}
                            </h4>
                            <div className="text-gray-400">
                                <p>Zeytinlik, Fişekhane Cd. 5/17</p>
                                <p>34140 Bakırköy / İstanbul</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teknik Yetkinlikler */}
                <div className="border-t border-white/10 pt-8 pb-6 text-xs text-white/20 leading-relaxed">
                    <p>
                        {t(
                            "Teknolojiler: Stable Diffusion · LoRA Fine-tuning · ControlNet · Artırılmış Gerçeklik (AR) · Computer Vision · WebGL · Real-time Image Processing · Next.js · KVKK Uyumlu Veri İşleme",
                            "Technologies: Stable Diffusion · LoRA Fine-tuning · ControlNet · Augmented Reality (AR) · Computer Vision · WebGL · Real-time Image Processing · Next.js · KVKK Compliant Data Processing"
                        )}
                    </p>
                </div>

                {/* Footer Bottom Links */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 uppercase tracking-wider">
                    <p>© 2026 All rights reserved</p>
                    <div className="flex gap-6">
                        <Link href="https://www.linkedin.com/company/metasoftco" rel="nofollow noopener noreferrer" target="_blank" className="hover:text-white transition-colors">Linkedin</Link>
                        <Link href="https://instagram.com/metasoftco" rel="nofollow noopener noreferrer" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="https://www.youtube.com/@MetasoftCo" rel="nofollow noopener noreferrer" target="_blank" className="hover:text-white transition-colors">YouTube</Link>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">
                            {t("Şartlar ve Koşullar", "Terms and conditions")}
                        </Link>
                        <Link href="/gizlilik" className="hover:text-white transition-colors">
                            {t("Gizlilik Politikası", "Privacy policy")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Branding — full viewport width so text-center aligns to screen, not container */}
            <p
                className="w-full text-[12vw] sm:text-[14vw] font-bold leading-none tracking-tighter text-center text-white select-none whitespace-nowrap mt-8"
                style={{ fontFamily: 'var(--font-inter-tight)' }}
            >
                METASOFTCO
            </p>
        </footer>
    );
}
