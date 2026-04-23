"use client";

import { LanguageProvider } from "@/providers/LanguageProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { QuoteProvider } from "@/components/ServiceSelector/useQuoteStore";
import { FloatingBadge } from "@/components/ServiceSelector/FloatingBadge";
import { QuotePanel } from "@/components/ServiceSelector/QuotePanel";
import { ChatProvider } from "@/components/AIChat/useChatStore";
import { ChatButton } from "@/components/AIChat/ChatButton";
import { ChatDrawer } from "@/components/AIChat/ChatDrawer";

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
