"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { QuoteProvider } from "@/components/ServiceSelector/useQuoteStore";
import { ChatProvider } from "@/components/AIChat/useChatStore";

const FloatingBadge = dynamic(() => import("@/components/ServiceSelector/FloatingBadge").then(m => ({ default: m.FloatingBadge })), { ssr: false });
const QuotePanel = dynamic(() => import("@/components/ServiceSelector/QuotePanel").then(m => ({ default: m.QuotePanel })), { ssr: false });
const ChatButton = dynamic(() => import("@/components/AIChat/ChatButton").then(m => ({ default: m.ChatButton })), { ssr: false });
const ChatDrawer = dynamic(() => import("@/components/AIChat/ChatDrawer").then(m => ({ default: m.ChatDrawer })), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LanguageProvider>
                <ToastProvider>
                    <QuoteProvider>
                        <ChatProvider>
                            {children}
                            <FloatingBadge />
                            <QuotePanel />
                            <ChatButton />
                            <ChatDrawer />
                        </ChatProvider>
                    </QuoteProvider>
                </ToastProvider>
            </LanguageProvider>
        </SessionProvider>
    );
}
