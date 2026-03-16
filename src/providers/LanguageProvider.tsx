"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Language = "tr" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (tr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Derive language from URL — /en/* → "en", everything else → "tr"
    const langFromUrl: Language = pathname?.startsWith("/en") ? "en" : "tr";
    const [language, setLanguageState] = useState<Language>(langFromUrl);

    // Keep state in sync when pathname changes (e.g. back/forward navigation)
    useEffect(() => {
        setLanguageState(langFromUrl);
        Cookies.set("NEXT_LOCALE", langFromUrl, { expires: 365 });
    }, [langFromUrl]);

    const setLanguage = (lang: Language) => {
        if (lang === language) return;
        if (lang === "en") {
            router.push("/en");
        } else {
            router.push("/");
        }
    };

    const t = (tr: string, en: string) => {
        return language === "en" ? en : tr;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
