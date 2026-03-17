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
        ]
        : [
            { href: "/", label: "Anasayfa" },
            { href: "/projeler", label: "Projeler" },
            { href: "/hizmetler", label: "Hizmetler" },
            { href: "/hakkimizda", label: "Hakkımızda" },
        ];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const menu = getMenu(t, language);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === "tr" ? "en" : "tr");
    };

    return (
        <>
            {/* Fixed Sticky Navbar */}
            <header className={`fixed ${isScrolled ? 'top-0' : 'top-0 md:top-12'} left-0 right-0 z-[100] w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-sm md:bg-transparent'
                }`}>
                <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
                    {/* Logo */}
                    <Link href="/" className="z-50 flex items-center">
                        <Image
                            src="/blackLogo.png"
                            alt="METASOFTCO"
                            width={160}
                            height={40}
                            className="h-8 md:h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Right Side - Actions & Menu Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-4 text-black">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full transition text-sm font-medium bg-black/5 hover:bg-black/10"
                                aria-label="Dil değiştir"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="uppercase">{language}</span>
                            </button>

                            <CircularTextButton
                                text={t("İLETİŞİME GEÇ ", "GET IN TOUCH ")}
                                href="/iletisim"
                            />
                        </div>

                        {/* Hamburger Button (Visible on All Screens) */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex flex-col justify-center items-end w-10 h-10 gap-1.5 group z-50 mr-[-8px]"
                            aria-label="Menüyü aç"
                        >
                            <span className="w-7 h-0.5 rounded-full transition-all group-hover:w-5 bg-black" />
                            <span className="w-5 h-0.5 rounded-full transition-all group-hover:w-7 bg-black" />
                            <span className="w-3 h-0.5 rounded-full transition-all group-hover:w-5 bg-black" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <>
                        {/* Backdrop (Left side blur) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-xl"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar (Right 50%) */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-3/5 lg:w-1/2 z-[111] bg-black shadow-2xl flex flex-col"
                        >
                            {/* Close & Header */}
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

                            {/* Menu Items */}
                            <nav className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 overflow-y-auto">
                                <ul className="space-y-4 md:space-y-6">
                                    {menu.map((m, index) => (
                                        <motion.li
                                            key={m.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{
                                                delay: 0.1 + index * 0.05,
                                                duration: 0.5,
                                                ease: "easeOut",
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <Link
                                                href={m.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white hover:text-red-500 transition-all duration-300 font-[family-name:var(--font-dm-sans)] tracking-tighter"
                                            >
                                                {m.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Footer Info / Mobile Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="p-6 sm:p-12 bg-white/5 flex flex-col gap-6"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-semibold">{t("İletişim", "Contact")}</span>
                                    <div className="flex flex-col gap-1">
                                        <a href="mailto:info@metasoftco.com" className="text-lg text-white hover:text-red-500 transition-colors w-fit">info@metasoftco.com</a>
                                        <a href="tel:+905342334051" className="text-lg text-white hover:text-red-500 transition-colors w-fit">+905342334051</a>
                                    </div>
                                </div>

                                <div className="lg:hidden">
                                    <button
                                        onClick={toggleLanguage}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span className="uppercase text-sm font-medium">{language}</span>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
