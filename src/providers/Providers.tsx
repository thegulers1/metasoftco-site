"use client";

import { LanguageProvider } from "@/providers/LanguageProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LanguageProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </LanguageProvider>
        </SessionProvider>
    );
}
