"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, Sparkles, X } from "lucide-react";
import { isPhase2PrototypePath, phase2LocaleFromPath, phase2SiblingPath } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { useChatStore } from "@/components/AIChat/useChatStore";

const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("MetasoftCo, Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No:37/1, Avcılar/İstanbul");

export function Phase2Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const locale = phase2LocaleFromPath(pathname);
    const copy = phase2Copy(locale).nav;
    const localeSwitchHref = phase2SiblingPath(pathname, locale);
    const { open: openChat } = useChatStore();

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    if (!isPhase2PrototypePath(pathname)) return null;

    const home = phase2Copy(locale).routes.home;

    /**
     * The static screens map one-to-one, so their sibling is known at render
     * time and goes straight into the href. Detail pages have unrelated slugs
     * per locale, but every page with a sibling declares it as an hreflang
     * alternate — so a real click upgrades the destination from "the other home
     * page" to the equivalent page. A full navigation is used deliberately:
     * switching locale changes the whole document, and it keeps the fallback
     * href meaningful when JavaScript has not run.
     */
    function onLocaleSwitch(event: MouseEvent<HTMLAnchorElement>) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        const target = locale === "tr" ? "en" : "tr";
        const href = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${target}"]`)?.getAttribute("href");
        if (!href) return;
        const path = new URL(href, window.location.origin).pathname;
        if (path === localeSwitchHref) return;
        event.preventDefault();
        window.location.assign(path);
    }

    return (
        <header className="p2-nav">
            <a href="#main-content" className="p2-skip-link">{copy.skipLink}</a>
            <div className="p2-nav__inner">
                <Link href={home} className="p2-nav__logo" aria-label={copy.homeAria}>
                    <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} priority unoptimized />
                </Link>
                <nav className="p2-nav__desktop" aria-label={copy.primaryAria}>
                    {copy.items.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || pathname?.startsWith(`${item.href}/`) ? "is-active" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
                </nav>
                {/* Plain anchor: next/link performs its own navigation on click, which would race the upgraded destination below. */}
                <a href={localeSwitchHref} onClick={onLocaleSwitch} className="p2-nav__locale" aria-label={copy.localeSwitchAria}><Globe aria-hidden="true" /> {copy.localeSwitchLabel}</a>
                <button type="button" className="p2-nav__ai-cta" aria-label={copy.aiCtaAria} onClick={() => openChat(locale)}>
                    <Sparkles aria-hidden="true" /> {copy.aiCta}
                </button>
                <Link href={phase2Copy(locale).routes.contact} className="p2-nav__cta">{copy.cta}</Link>
                <button
                    type="button"
                    className="p2-nav__toggle"
                    aria-label={open ? copy.closeMenu : copy.openMenu}
                    aria-expanded={open}
                    aria-controls="phase2-mobile-navigation"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </button>
            </div>
            {open && (
                <nav id="phase2-mobile-navigation" className="p2-nav__mobile" aria-label={copy.mobileAria}>
                    {copy.items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
                    <button type="button" className="p2-nav__mobile-ai-cta" aria-label={copy.aiCtaAria} onClick={() => { setOpen(false); openChat(locale); }}>
                        <Sparkles aria-hidden="true" /> {copy.aiCta}
                    </button>
                    <Link href={phase2Copy(locale).routes.contact} className="p2-nav__mobile-cta" onClick={() => setOpen(false)}>{copy.cta}</Link>
                </nav>
            )}
        </header>
    );
}

export function Phase2Footer() {
    const pathname = usePathname();
    const locale = phase2LocaleFromPath(pathname);
    const dictionary = phase2Copy(locale);
    const copy = dictionary.footer;

    if (!isPhase2PrototypePath(pathname)) return null;

    return (
        <footer className="p2-footer">
            <div className="p2-container p2-footer__grid">
                <div>
                    <Link href={dictionary.routes.home} className="p2-footer__logo" aria-label={dictionary.nav.homeAria}>
                        <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} unoptimized />
                    </Link>
                    <p>{copy.tagline}</p>
                </div>
                <div>
                    <span className="p2-footer__label">{copy.exploreLabel}</span>
                    {copy.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                </div>
                <div>
                    <span className="p2-footer__label">{copy.contactLabel}</span>
                    <a href="mailto:info@metasoftco.com">info@metasoftco.com</a>
                    <a href="tel:+905342334051">+90 534 233 40 51</a>
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">{copy.city}</a>
                </div>
                <div>
                    <span className="p2-footer__label">{copy.followLabel}</span>
                    <a href="https://www.linkedin.com/company/metasoftco" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://instagram.com/metasoftco" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.youtube.com/@MetasoftCo" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
            </div>
            <div className="p2-container p2-footer__base">
                <span>© 2026 MetasoftCo</span>
                <span>{copy.baseline}</span>
            </div>
        </footer>
    );
}
