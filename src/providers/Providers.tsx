"use client";

import { LanguageProvider } from "@/providers/LanguageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}
