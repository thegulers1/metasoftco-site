"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const target = pathname?.startsWith("/en") ? "/en" : "/";
        router.replace(target);
    }, [router, pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <p className="text-black/40 text-sm">Yönlendiriliyorsunuz...</p>
        </div>
    );
}
