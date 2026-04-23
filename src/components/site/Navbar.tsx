"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Globe } from "lucide-react";
import { CircularTextButton } from "@/components/ui/circular-text-button";

const getMenu = (t: (tr: string, en: string) => string, lang: "tr" | "en") =>
    lang === "en"
        ? [
            { href: "/en", label: "Home" },
            { href: "/en/projects", label: "Projects" },
            { href: "/en/services", label: "Services" },
            { href: "/en/hakkimizda", label: "About" },
            { href: "/en/contact", label: "Contact" },
        ]
        : [
            { href: "/", label: "Anasayfa" },
            { href: "/projeler", label: "Projeler" },
            { href: "/hizmetler", label: "Hizmetler" },
            { href: "/hakkimizda", label: "Hakkımızda" },
            { href: "/iletisim", label: "İletişim" },
        ];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const menu = getMenu(t, language);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => setLanguage(language === "tr" ? "en" : "tr");

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-[#0d0d0d]/95 border-b border-white/5 backdrop-blur-md"
                        : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-20 w-full max-w-7xl items-center px-6 sm:px-8">
                    {/* Logo — sol */}
                    <Link href={language === "en" ? "/en" : "/"} className="z-50 flex items-center shrink-0">
                        <Image
                            src="/blackLogo.png"
                            alt="METASOFTCO"
                            width={160}
                            height={40}
                            className="h-8 md:h-10 w-auto object-contain"
                            style={{ filter: "brightness(0) invert(1)" }}
                            priority
                        />
                    </Link>

                    {/* Menü linkleri — orta (sadece desktop) */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
                        {menu.map((m) => (
                            <Link
                                key={m.href}
                                href={m.href}
                                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
                            >
                                {m.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Sağ — dil + iletişim (desktop) / hamburger (mobile) */}
                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                        {/* Dil değiştir — desktop */}
                        <button
                            onClick={toggleLanguage}
                            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/15 transition"
                            aria-label="Dil değiştir"
                        >
                            <Globe className="w-4 h-4" />
                            <span>
                                <span className={language === "tr" ? "font-bold" : "opacity-40"}>TR</span>
                                <span className="opacity-30 mx-1">/</span>
                                <span className={language === "en" ? "font-bold" : "opacity-40"}>EN</span>
                            </span>
                        </button>

                        {/* İletişim butonu — desktop */}
                        <div className="hidden lg:block">
                            <CircularTextButton
                                text={t("İLETİŞİME GEÇ ", "GET IN TOUCH ")}
                                href={language === "en" ? "/en/contact" : "/iletisim"}
                            />
                        </div>

                        {/* Hamburger — sadece mobile/tablet */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex lg:hidden flex-col justify-center items-end w-10 h-10 gap-1.5 group z-50"
                            aria-label="Menüyü aç"
                        >
                            <span className="w-7 h-0.5 rounded-full transition-all group-hover:w-5 bg-white" />
                            <span className="w-5 h-0.5 rounded-full transition-all group-hover:w-7 bg-white" />
                            <span className="w-3 h-0.5 rounded-full transition-all group-hover:w-5 bg-white" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-xl"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full sm:w-3/5 z-[111] bg-black shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-end p-6 border-b border-white/5">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition text-white"
                                    aria-label="Menüyü kapat"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1 flex flex-col justify-center px-8 py-12 overflow-y-auto">
                                <ul className="space-y-5">
                                    {menu.map((m, index) => (
                                        <motion.li
                                            key={m.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: 0.08 + index * 0.05, duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={m.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-4xl sm:text-5xl font-bold text-white hover:text-red-500 transition-all duration-300 tracking-tighter"
                                            >
                                                {m.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="p-8 bg-white/5 flex flex-col gap-5"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-semibold">
                                        {t("İletişim", "Contact")}
                                    </span>
                                    <a href="mailto:info@metasoftco.com" className="text-base text-white hover:text-red-500 transition-colors w-fit">
                                        info@metasoftco.com
                                    </a>
                                    <a href="tel:+905342334051" className="text-base text-white hover:text-red-500 transition-colors w-fit">
                                        +90 534 233 4051
                                    </a>
                                </div>

                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors w-fit"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        <span className={language === "tr" ? "font-bold" : "opacity-40"}>TR</span>
                                        <span className="opacity-30 mx-1">/</span>
                                        <span className={language === "en" ? "font-bold" : "opacity-40"}>EN</span>
                                    </span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
