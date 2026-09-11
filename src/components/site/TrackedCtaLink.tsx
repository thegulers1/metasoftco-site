"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function TrackedCtaLink({
    href,
    cta,
    location,
    className,
    style,
    children,
}: {
    href: string;
    cta: string;
    location: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            onClick={() => trackEvent("cta_click", { cta, location })}
            className={className}
            style={style}
        >
            {children}
        </Link>
    );
}
