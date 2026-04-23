"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useChatStore, Message, RecommendedService } from "./useChatStore";
import { useQuoteStore } from "@/components/ServiceSelector/useQuoteStore";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowRight, FileText } from "lucide-react";

// Renders **bold** and plain text only — no URLs in text (cards handle links)
function renderText(content: string): React.ReactNode {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
        if (line === "") {
            return <span key={lineIdx} className="block h-1" />;
        }
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
            <span key={lineIdx} className="block leading-relaxed">
                {parts.map((part, i) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i}>{part.slice(2, -2)}</strong>
                    ) : (
                        <span key={i}>{part}</span>
                    ),
                )}
            </span>
        );
    });
}

function ServiceCard({
    service,
    language,
}: {
    service: RecommendedService;
    language: string;
}) {
    const isEn = language === "en";
    const name = isEn && service.title_en ? service.title_en : service.title;
    const slug = isEn && service.slug_en ? service.slug_en : service.slug;
    const catSlug =
        isEn && service.categorySlugEn ? service.categorySlugEn : service.categorySlug;
    const href = isEn
        ? `/en/services/${catSlug}/${slug}`
        : `/hizmetler/${catSlug}/${slug}`;

    return (
        <div className="flex items-center gap-3 bg-zinc-700/60 rounded-xl p-2.5 pr-3">
            {/* Image */}
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-600">
                {service.image ? (
                    <Image
                        src={service.image}
                        alt={name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-600 flex items-center justify-center">
                        <span className="text-zinc-400 text-xs font-bold">
                            {name.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* Name + link */}
            <div className="flex-1 min-w-0">
                <p className="text-zinc-100 text-xs font-semibold leading-tight truncate">{name}</p>
                <Link
                    href={href}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-xs mt-1 transition-colors"
                >
                    {isEn ? "View details" : "İncele"}
                    <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}

function ServiceCards({
    services,
    language,
}: {
    services: RecommendedService[];
    language: string;
}) {
    const { add, openPanel } = useQuoteStore();
    const isEn = language === "en";

    const handleQuote = () => {
        services.forEach((s) =>
            add({
                id: s.id,
                title: s.title,
                title_en: s.title_en,
                image: s.image,
                slug: s.slug,
                categorySlug: s.categorySlug,
                slug_en: s.slug_en,
                categorySlugEn: s.categorySlugEn,
            }),
        );
        openPanel();
    };

    return (
        <div className="mt-2.5 space-y-2">
            {services.map((s) => (
                <ServiceCard key={s.id} service={s} language={language} />
            ))}

            {/* Teklif İste CTA */}
            <button
                onClick={handleQuote}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-1"
            >
                <FileText className="w-3.5 h-3.5" />
                {isEn ? "Request a Quote →" : "Teklif İste →"}
            </button>
        </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const { language } = useLanguage();
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                    <span className="text-white text-xs font-bold">M</span>
                </div>
            )}
            <div className={`max-w-[85%] ${isUser ? "" : "flex-1"}`}>
                <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                        isUser
                            ? "bg-red-600 text-white rounded-br-sm"
                            : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                    }`}
                >
                    {renderText(message.content)}
                </div>

                {/* Service cards — only on assistant messages */}
                {!isUser && message.services && message.services.length > 0 && (
                    <div className="mt-1.5">
                        <ServiceCards services={message.services} language={language} />
                    </div>
                )}
            </div>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                <span className="text-white text-xs font-bold">M</span>
            </div>
            <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function ChatMessages() {
    const { messages, isLoading } = useChatStore();
    const { language } = useLanguage();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 text-center text-zinc-500 text-sm">
                {language === "en"
                    ? "Start by describing your event..."
                    : "Etkinliğini anlatarak başla..."}
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
        </div>
    );
}
