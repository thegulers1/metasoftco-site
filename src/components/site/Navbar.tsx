"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Globe } from "lucide-react";
import { CircularTextButton } from "@/components/ui/circular-text-button";

const getMenu = (t: (tr: string, en: string) => string) => [
    { href: "/", label: t("Anasayfa", "Home") },
    { href: "/hakkimizda", label: t("Hakkımızda", "About") },
    { href: "/hizmetler", label: t("Hizmetler", "Services") },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const menu = getMenu(t);

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
            <header className={`fixed ${isScrolled ? 'top-0' : 'top-[48px]'} left-0 right-0 z-[100] w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}>
                <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className={`text-lg font-bold tracking-tight z-50 transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'
                        }`}>
                        MetasoftCo
                    </Link>

                    {/* Right Side - Actions & Menu Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition text-sm font-medium ${isScrolled
                                    ? 'bg-black/10 hover:bg-black/20 text-black'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                aria-label="Dil değiştir"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="uppercase">{language}</span>
                            </button>

                            <CircularTextButton
                                text={t("İLETİŞİME GEÇ ", "GET IN TOUCH ")}
                                href="/iletisim"
                                className="scale-75 origin-center hover:scale-[0.8] transition-transform"
                            />
                        </div>

                        {/* Hamburger Button (Visible on All Screens) */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex flex-col justify-center items-end w-12 h-10 gap-1.5 group z-50"
                            aria-label="Menüyü aç"
                        >
                            <span className={`w-8 h-0.5 rounded-full transition-all group-hover:w-6 ${isScrolled ? 'bg-black' : 'bg-white'
                                }`} />
                            <span className={`w-6 h-0.5 rounded-full transition-all group-hover:w-8 ${isScrolled ? 'bg-black' : 'bg-white'
                                }`} />
                            <span className={`w-4 h-0.5 rounded-full transition-all group-hover:w-6 ${isScrolled ? 'bg-black' : 'bg-white'
                                }`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop (Left side blur) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar (Right 50%) */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-full md:w-1/2 z-[111] bg-black shadow-2xl flex flex-col"
                        >
                            {/* Close & Header */}
                            <div className="flex items-center justify-end p-8 sm:p-12">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition text-white"
                                    aria-label="Menüyü kapat"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Menu Items */}
                            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12">
                                <ul className="space-y-6 md:space-y-8">
                                    {menu.map((m, index) => (
                                        <motion.li
                                            key={m.href}
                                            initial={{ opacity: 0, y: 40, skewY: 5 }}
                                            animate={{ opacity: 1, y: 0, skewY: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                delay: 0.2 + index * 0.1,
                                                duration: 0.6,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <Link
                                                href={m.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-red-500 transition-colors duration-300 font-[family-name:var(--font-dm-sans)]"
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
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="p-8 sm:p-12 border-t border-white/10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-white/40 uppercase tracking-widest">{t("İletişim", "Contact")}</span>
                                    <a href="mailto:info@metasoftco.com" className="text-xl text-white hover:text-red-500 transition">info@metasoftco.com   </a>
                                </div>
                                <div className="md:hidden flex items-center gap-4">
                                    <button
                                        onClick={toggleLanguage}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span className="uppercase">{language}</span>
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
