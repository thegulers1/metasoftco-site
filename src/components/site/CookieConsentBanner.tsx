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

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-[300] border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur px-6 py-5 sm:px-10"
            role="dialog"
            aria-label={t("Çerez tercihleri", "Cookie preferences")}
        >
            <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                    className="text-[13.5px] leading-relaxed text-[rgba(255,255,255,.7)]"
                    style={{ fontFamily: "var(--font-manrope)" }}
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
                        className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white/80 hover:border-white/30 hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                    >
                        {t("Reddet", "Reject")}
                    </button>
                    <button
                        onClick={() => decide("granted")}
                        className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0a0a0f] hover:bg-gray-200 transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                    >
                        {t("Kabul Et", "Accept")}
                    </button>
                </div>
            </div>
        </div>
    );
}
