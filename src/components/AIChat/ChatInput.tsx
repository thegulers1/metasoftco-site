"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useChatStore } from "./useChatStore";
import { useLanguage } from "@/providers/LanguageProvider";
import { SendHorizonal } from "lucide-react";

export function ChatInput() {
    const [value, setValue] = useState("");
    const { sendMessage, isLoading } = useChatStore();
    const { language } = useLanguage();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        const trimmed = value.trim();
        if (!trimmed || isLoading) return;
        setValue("");
        // Reset textarea height
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        await sendMessage(trimmed, language);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    };

    const placeholder =
        language === "en"
            ? "Describe your event..."
            : "Etkinliğini anlat...";

    return (
        <div className="border-t border-zinc-700 px-3 py-3 flex items-end gap-2 bg-zinc-900">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none bg-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50 transition-all"
                style={{ minHeight: "42px", maxHeight: "120px" }}
            />
            <button
                onClick={handleSend}
                disabled={!value.trim() || isLoading}
                className="shrink-0 w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                aria-label={language === "en" ? "Send" : "Gönder"}
            >
                <SendHorizonal className="w-4 h-4" />
            </button>
        </div>
    );
}
