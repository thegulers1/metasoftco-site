"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Language = "tr" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    setAlternateUrl: (trUrl: string, enUrl: string) => void;
    t: (tr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Derive language from URL — /en/* → "en", everything else → "tr"
    const langFromUrl: Language = pathname?.startsWith("/en") ? "en" : "tr";
    const [language, setLanguageState] = useState<Language>(langFromUrl);
    const [alternateUrls, setAlternateUrls] = useState<{ tr: string; en: string } | null>(null);

    // Keep state in sync when pathname changes (e.g. back/forward navigation)
    useEffect(() => {
        setLanguageState(langFromUrl);
        Cookies.set("NEXT_LOCALE", langFromUrl, { expires: 365 });
        setAlternateUrls(null); // Eski sayfanın alternate URL'ini temizle
    }, [pathname]);

    const setAlternateUrl = (trUrl: string, enUrl: string) => {
        setAlternateUrls({ tr: trUrl, en: enUrl });
        // Karşı dil sayfasını önceden yükle
        const prefetchUrl = language === "tr" ? enUrl : trUrl;
        router.prefetch(prefetchUrl);
    };

    // Pathname'den otomatik alternate URL türet (fallback)
    // TR/EN URL yapıları farklı olduğundan (/hizmetler/ vs /en/services/) bu sadece son çaredir.
    const autoAlternate = (() => {
        if (!pathname) return { tr: "/", en: "/en" };
        if (pathname.startsWith("/en")) {
            // /en/X → /X (Türkçe)
            const tr = pathname.replace(/^\/en/, "") || "/";
            return { tr, en: pathname };
        } else {
            // TR yolları EN yollarına birebir map edilemez (/hizmetler → /en/services vb.)
            // setAlternateUrl çağrılmadıysa en azından doğru dil anasayfasına git
            return { tr: pathname, en: "/en" };
        }
    })();

    const setLanguage = (lang: Language) => {
        if (lang === language) return;
        if (lang === "en") {
            router.push(alternateUrls?.en ?? autoAlternate.en);
        } else {
            router.push(alternateUrls?.tr ?? autoAlternate.tr);
        }
    };

    const t = (tr: string, en: string) => {
        return language === "en" ? en : tr;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, setAlternateUrl, t }}>
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
