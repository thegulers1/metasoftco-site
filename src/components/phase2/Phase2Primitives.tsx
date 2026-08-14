import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function P2Container({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`p2-container ${className}`}>{children}</div>;
}

export function P2Eyebrow({ children }: { children: ReactNode }) {
    return <p className="p2-eyebrow">{children}</p>;
}

export function P2SectionHeading({
    eyebrow,
    title,
    copy,
    className = "",
}: {
    eyebrow: string;
    title: string;
    copy?: string;
    className?: string;
}) {
    return (
        <div className={`p2-section-heading ${className}`}>
            <P2Eyebrow>{eyebrow}</P2Eyebrow>
            <h2>{title}</h2>
            {copy && <p className="p2-lede">{copy}</p>}
        </div>
    );
}

export function P2Button({
    href,
    children,
    variant = "primary",
    external = false,
}: {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary" | "text";
    external?: boolean;
}) {
    const className = `p2-button p2-button--${variant}`;
    const content = (
        <>
            <span>{children}</span>
            {external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </>
    );
    if (external) {
        return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{content}</a>;
    }
    return <Link href={href} className={className}>{content}</Link>;
}

export function P2FinalCta({
    eyebrow = "START A CONVERSATION",
    title,
    copy,
    primaryLabel = "Plan Your Activation",
    secondary,
}: {
    eyebrow?: string;
    title: string;
    copy: string;
    primaryLabel?: string;
    secondary?: { label: string; href: string };
}) {
    return (
        <section className="p2-final-cta" aria-labelledby="p2-final-cta-title">
            <P2Container>
                <div className="p2-final-cta__inner">
                    <div>
                        <P2Eyebrow>{eyebrow}</P2Eyebrow>
                        <h2 id="p2-final-cta-title">{title}</h2>
                        <p>{copy}</p>
                    </div>
                    <div className="p2-actions">
                        <P2Button href="/en/contact">{primaryLabel}</P2Button>
                        {secondary && <P2Button href={secondary.href} variant="secondary">{secondary.label}</P2Button>}
                    </div>
                </div>
            </P2Container>
        </section>
    );
}
