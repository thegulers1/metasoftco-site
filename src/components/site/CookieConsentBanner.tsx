"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { applyConsent, getStoredConsent, setStoredConsent, type ConsentState } from "@/lib/analytics";

const AHREFS_SCRIPT_ID = "ahrefs-analytics";

function loadAhrefsScript() {
    if (document.getElementById(AHREFS_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = AHREFS_SCRIPT_ID;
    script.src = "https://analytics.ahrefs.com/analytics.js";
    script.setAttribute("data-key", "SpzZeI8Md0aVoUvjEnlePA");
    script.async = true;
    document.head.appendChild(script);
}

export default function CookieConsentBanner() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(() => getStoredConsent() === null);

    useEffect(() => {
        const stored = getStoredConsent();
        if (stored) {
            applyConsent(stored);
            if (stored === "granted") loadAhrefsScript();
        }
    }, []);

    const decide = (state: ConsentState) => {
        setStoredConsent(state);
        applyConsent(state);
        if (state === "granted") loadAhrefsScript();
        setVisible(false);
    };

    if (!visible) return null;

    // Phones get a tighter layout (same text, same two buttons): at the old size the
    // banner covered the first call-to-action of landing pages on short screens.
    return (
        <div
            className="fixed inset-x-0 bottom-0 z-[300] border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur px-4 py-3 sm:px-10 sm:py-5"
            role="dialog"
            aria-label={t("Çerez tercihleri", "Cookie preferences")}
        >
            <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p
                    className="text-[12.5px] leading-snug text-[rgba(255,255,255,.7)] sm:text-[13.5px] sm:leading-relaxed"
                    style={{ fontFamily: "var(--mh-sans), system-ui, sans-serif" }}
                >
                    {t(
                        "Deneyiminizi iyileştirmek ve site trafiğini analiz etmek için çerezler kullanıyoruz.",
                        "We use cookies to improve your experience and analyze site traffic."
                    )}{" "}
                    <Link
                        href="/gizlilik"
                        className="underline hover:text-white transition-colors"
                    >
                        {t("Gizlilik Politikası", "Privacy Policy")}
                    </Link>
                </p>
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={() => decide("denied")}
                        className="rounded-full border border-white/15 px-4 py-2 text-[12.5px] font-semibold text-white/80 hover:border-white/30 hover:text-white transition-colors sm:px-5 sm:py-2.5 sm:text-[13px]"
                        style={{ fontFamily: "var(--mh-sans), system-ui, sans-serif" }}
                    >
                        {t("Reddet", "Reject")}
                    </button>
                    <button
                        onClick={() => decide("granted")}
                        className="rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-[#0a0a0f] hover:bg-gray-200 transition-colors sm:px-5 sm:py-2.5 sm:text-[13px]"
                        style={{ fontFamily: "var(--mh-sans), system-ui, sans-serif" }}
                    >
                        {t("Kabul Et", "Accept")}
                    </button>
                </div>
            </div>
        </div>
    );
}
