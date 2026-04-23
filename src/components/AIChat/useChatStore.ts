"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";

export interface RecommendedService {
    id: string;
    title: string;
    title_en: string | null;
    image: string | null;
    slug: string;
    categorySlug: string;
    slug_en: string | null;
    categorySlugEn: string | null;
}

export interface Message {
    role: "user" | "assistant";
    content: string;
    services?: RecommendedService[];
}

interface ChatStore {
    messages: Message[];
    isOpen: boolean;
    isLoading: boolean;
    open: (locale?: string) => void;
    close: () => void;
    sendMessage: (text: string, locale?: string) => Promise<void>;
}

const ChatContext = createContext<ChatStore | undefined>(undefined);

const GREETING: Record<string, string> = {
    tr: "Merhaba! 👋 Etkinliğin için en uygun deneyimi birlikte bulalım. Ne tür bir etkinlik planlıyorsun?",
    en: "Hello! 👋 Let's find the perfect experience for your event together. What kind of event are you planning?",
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const open = useCallback((locale = "tr") => {
        setIsOpen(true);
        setMessages((prev) => {
            if (prev.length === 0) {
                return [{ role: "assistant", content: GREETING[locale] ?? GREETING.tr }];
            }
            return prev;
        });
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    const sendMessage = useCallback(
        async (text: string, locale = "tr") => {
            const trimmed = text.trim();
            if (!trimmed) return;

            const userMsg: Message = { role: "user", content: trimmed };
            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);

            try {
                const history = messages.slice(-5).map((m) => ({
                    role: m.role,
                    content: m.content,
                }));

                const res = await fetch("/api/ai-chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: trimmed,
                        conversationHistory: history,
                        locale,
                    }),
                });

                const data = await res.json();

                const replyContent: string =
                    data.reply ??
                    (locale === "en"
                        ? "Sorry, something went wrong. Please try again."
                        : "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.");

                const assistantMsg: Message = {
                    role: "assistant",
                    content: replyContent,
                    services: Array.isArray(data.recommendedServices) && data.recommendedServices.length > 0
                        ? data.recommendedServices
                        : undefined,
                };

                setMessages((prev) => [...prev, assistantMsg]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            locale === "en"
                                ? "Sorry, something went wrong. Please try again."
                                : "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [messages],
    );

    return React.createElement(
        ChatContext.Provider,
        { value: { messages, isOpen, isLoading, open, close, sendMessage } },
        children,
    );
}

export function useChatStore(): ChatStore {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChatStore must be used within ChatProvider");
    return ctx;
}
