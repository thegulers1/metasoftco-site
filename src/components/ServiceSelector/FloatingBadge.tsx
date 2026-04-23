"use client";

import { useQuoteStore } from "./useQuoteStore";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";

export function FloatingBadge() {
    const { selected, openPanel } = useQuoteStore();
    const { language } = useLanguage();
    const count = selected.length;

    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.button
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 260 }}
                    onClick={openPanel}
                    className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-[#FF3B3F] text-black px-6 py-4 rounded-full shadow-2xl hover:opacity-90 transition-opacity cursor-pointer font-semibold"
                >
                    <span className="flex items-center justify-center w-6 h-6 bg-black text-[#FF3B3F] rounded-full text-xs font-black">
                        {count}
                    </span>
                    <span className="text-sm font-semibold whitespace-nowrap">
                        {language === "en"
                            ? `${count} service${count > 1 ? "s" : ""} selected — Get Quote →`
                            : `${count} hizmet seçildi — Teklif Al →`
                        }
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
