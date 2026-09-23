"use client";

import { useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

/** No English hub yet: the language switch falls back to the services index. */
export function AlternateUrl({ trUrl }: { trUrl: string }) {
    const { setAlternateUrl } = useLanguage();
    useEffect(() => {
        setAlternateUrl(trUrl, "/en/services");
    }, [trUrl, setAlternateUrl]);
    return null;
}
