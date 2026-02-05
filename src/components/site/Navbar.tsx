"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { Globe } from "lucide-react";

const getMenu = (t: (tr: string, en: string) => string) => [
    { href: "/", label: t("Anasayfa", "Home") },
    { href: "/hakkimizda", label: t("Hakkımızda", "About Us") },
    { href: "/hizmetler", label: t("Hizmetler", "Services") },
    { href: "/iletisim", label: t("İletişim", "Contact") },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const menu = getMenu(t);

    const toggleLanguage = () => {
        setLanguage(language === "tr" ? "en" : "tr");
    };

    return (
        <>
            <header className="w-full bg-[#dce3e8]">
                <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-sm font-semibold tracking-tight">
                        MetasoftCo
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-6">
                        {menu.map((m) => (
                            <Link
                                key={m.href}
                                href={m.href}
                                className="text-sm text-black/70 hover:text-black transition"
                            >
                                {m.label}
                            </Link>
                        ))}

                        {/* Language Switcher Desktop */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition text-sm font-medium"
                            aria-label="Dil değiştir"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="uppercase">{language}</span>
                        </button>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                        aria-label="Menüyü aç"
                    >
                        <span className="w-6 h-0.5 bg-black rounded-full" />
                        <span className="w-6 h-0.5 bg-black rounded-full" />
                        <span className="w-6 h-0.5 bg-black rounded-full" />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Close Button */}
                    <div className="flex items-center justify-between p-6 border-b border-black/10">
                        <span className="text-sm font-semibold">{t("Menü", "Menu")}</span>
                        <div className="flex items-center gap-2">
                            {/* Language Switcher Mobile */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition text-sm font-medium"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="uppercase">{language}</span>
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition"
                                aria-label="Menüyü kapat"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="p-6">
                        <ul className="space-y-4">
                            {menu.map((m) => (
                                <li key={m.href}>
                                    <Link
                                        href={m.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 text-base font-medium text-black/80 rounded-xl hover:bg-black/5 transition"
                                    >
                                        {m.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Bottom CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-black/10">
                        <Link
                            href="/iletisim"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-full py-3 px-6 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition"
                        >
                            {t("İletişime Geç", "Get in Touch")}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
