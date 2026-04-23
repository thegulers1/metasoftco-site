"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { useChatStore } from "./useChatStore";
import { useLanguage } from "@/providers/LanguageProvider";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatDrawer() {
    const { isOpen, close } = useChatStore();
    const { language } = useLanguage();

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [close]);

    // Lock body scroll when drawer is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop — only visible on mobile */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                        className="fixed inset-0 z-[200] bg-black/50 sm:hidden"
                    />

                    {/* Drawer panel */}
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        className="fixed bottom-0 right-0 z-[210] flex flex-col w-full sm:w-96 sm:bottom-6 sm:rounded-2xl overflow-hidden shadow-2xl"
                        style={{ height: "min(600px, 90dvh)" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3.5 bg-red-600 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold leading-none">
                                        MetasoftCo AI
                                    </p>
                                    <p className="text-red-200 text-xs mt-0.5">
                                        {language === "en"
                                            ? "Event advisor"
                                            : "Etkinlik danışmanı"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={close}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label={language === "en" ? "Close" : "Kapat"}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
                            <ChatMessages />
                        </div>

                        {/* Input */}
                        <ChatInput />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
