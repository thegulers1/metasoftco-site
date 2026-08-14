"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { isPhase2PrototypePath } from "@/lib/phase2";

const navItems = [
    { href: "/en/projects", label: "Work" },
    { href: "/en/services", label: "Capabilities" },
    { href: "/en/hakkimizda", label: "About" },
    { href: "/en/blog", label: "Insights" },
];

export function Phase2Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    if (!isPhase2PrototypePath(pathname)) return null;

    return (
        <header className="p2-nav">
            <a href="#main-content" className="p2-skip-link">Skip to content</a>
            <div className="p2-nav__inner">
                <Link href="/en" className="p2-nav__logo" aria-label="MetasoftCo home">
                    <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} priority />
                </Link>
                <nav className="p2-nav__desktop" aria-label="Primary navigation">
                    {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
                </nav>
                <Link href="/en/contact" className="p2-nav__cta">Plan Your Activation</Link>
                <button
                    type="button"
                    className="p2-nav__toggle"
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    aria-expanded={open}
                    aria-controls="phase2-mobile-navigation"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </button>
            </div>
            {open && (
                <nav id="phase2-mobile-navigation" className="p2-nav__mobile" aria-label="Mobile navigation">
                    {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
                    <Link href="/en/contact" className="p2-nav__mobile-cta" onClick={() => setOpen(false)}>Plan Your Activation</Link>
                </nav>
            )}
        </header>
    );
}

export function Phase2Footer() {
    const pathname = usePathname();
    if (!isPhase2PrototypePath(pathname)) return null;

    return (
        <footer className="p2-footer">
            <div className="p2-container p2-footer__grid">
                <div>
                    <Link href="/en" className="p2-footer__logo" aria-label="MetasoftCo home">
                        <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} />
                    </Link>
                    <p>AI-powered experiential technology, built in Istanbul for brands and agencies.</p>
                </div>
                <div>
                    <span className="p2-footer__label">EXPLORE</span>
                    <Link href="/en/projects">Work</Link>
                    <Link href="/en/services">Capabilities</Link>
                    <Link href="/en/hakkimizda">About</Link>
                    <Link href="/en/contact">Contact</Link>
                </div>
                <div>
                    <span className="p2-footer__label">CONTACT</span>
                    <a href="mailto:info@metasoftco.com">info@metasoftco.com</a>
                    <a href="tel:+905342334051">+90 534 233 40 51</a>
                    <span>Avcılar, Istanbul</span>
                </div>
                <div>
                    <span className="p2-footer__label">FOLLOW</span>
                    <a href="https://www.linkedin.com/company/metasoftco" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://instagram.com/metasoftco" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.youtube.com/@MetasoftCo" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
            </div>
            <div className="p2-container p2-footer__base">
                <span>© 2026 MetasoftCo</span>
                <span>Concept · Software · Physical production · Live operation</span>
            </div>
        </footer>
    );
}
