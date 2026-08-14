"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
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

const staticAlternates: Record<string, { tr: string; en: string }> = {
    "/": { tr: "/", en: "/en" },
    "/hizmetler": { tr: "/hizmetler", en: "/en/services" },
    "/projeler": { tr: "/projeler", en: "/en/projects" },
    "/blog": { tr: "/blog", en: "/en/blog" },
    "/hakkimizda": { tr: "/hakkimizda", en: "/en/hakkimizda" },
    "/iletisim": { tr: "/iletisim", en: "/en/contact" },
    "/sektorel-cozumler": { tr: "/sektorel-cozumler", en: "/en/sector-solutions" },
    "/sektorel-yazilim-cozumleri": { tr: "/sektorel-yazilim-cozumleri", en: "/en/industry-software-solutions" },
};

function getStaticAlternate(pathname: string | null) {
    if (!pathname) return staticAlternates["/"];
    return staticAlternates[pathname] ?? Object.values(staticAlternates).find((pair) => pair.en === pathname);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Derive language from URL — /en/* → "en", everything else → "tr"
    const langFromUrl: Language = pathname?.startsWith("/en") ? "en" : "tr";
    const language = langFromUrl;
    const alternateUrls = useRef<{ tr: string; en: string } | null>(null);

    // Keep state in sync when pathname changes (e.g. back/forward navigation)
    useEffect(() => {
        Cookies.set("NEXT_LOCALE", langFromUrl, { expires: 365 });
        alternateUrls.current = null;
    }, [pathname, langFromUrl]);

    const setAlternateUrl = useCallback((trUrl: string, enUrl: string) => {
        alternateUrls.current = { tr: trUrl, en: enUrl };
        // Karşı dil sayfasını önceden yükle
        const prefetchUrl = language === "tr" ? enUrl : trUrl;
        router.prefetch(prefetchUrl);
    }, [language, router]);

    // Dynamic pages register their data-backed alternate explicitly. Never
    // guess a translated URL by string replacement: that created broken EN
    // paths in the audit.
    const autoAlternate = getStaticAlternate(pathname) ?? (pathname?.startsWith("/en")
        ? { tr: "/", en: "/en" }
        : { tr: pathname || "/", en: "/en" });

    const setLanguage = (lang: Language) => {
        if (lang === language) return;
        if (lang === "en") {
            router.push(alternateUrls.current?.en ?? autoAlternate.en);
        } else {
            router.push(alternateUrls.current?.tr ?? autoAlternate.tr);
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
