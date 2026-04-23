"use client";

import { useChatStore } from "./useChatStore";
import { useLanguage } from "@/providers/LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

export function ChatButton() {
    const { isOpen, open } = useChatStore();
    const { language } = useLanguage();

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 260 }}
                    onClick={() => open(language)}
                    className="fixed bottom-6 right-6 z-[150] flex items-center gap-2.5 bg-red-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-red-700 active:scale-95 transition-colors cursor-pointer"
                    aria-label={
                        language === "en"
                            ? "Get event recommendations"
                            : "Etkinliğin için öneri al"
                    }
                >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-semibold whitespace-nowrap">
                        {language === "en"
                            ? "Get event ideas →"
                            : "Etkinliğin için öneri al →"}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
