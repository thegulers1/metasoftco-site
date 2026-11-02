"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/components/AIChat/useChatStore";
import { trackEvent } from "@/lib/analytics";
import { isHomePath, phase2LocaleFromPath, phase2SiblingPath, phase2Routes } from "@/lib/phase2";
import { msChromeCopy, msClosingFor } from "@/lib/ms-chrome";

/**
 * Locale switch: the static screens map one-to-one, so the sibling href is
 * known at render time. Detail pages declare their sibling as an hreflang
 * alternate, so a real click upgrades the destination to the equivalent page.
 */
function useLocaleSwitch(pathname: string | null) {
    const locale = phase2LocaleFromPath(pathname);
    const target = locale === "tr" ? "en" : "tr";
    const fallback = phase2SiblingPath(pathname, locale);
    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        const href = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${target}"]`)?.getAttribute("href");
        if (!href) return;
        const path = new URL(href, window.location.origin).pathname;
        if (path === fallback) return;
        event.preventDefault();
        window.location.assign(path);
    };
    return { locale, target, href: fallback, onClick };
}

/** Navigation for every page except the homepage, which draws its own. */
export function MsNav() {
    const pathname = usePathname();
    // The menu remembers the page it was opened on, so navigating closes it.
    const [openAt, setOpenAt] = useState<string | null>(null);
    const open = openAt !== null && openAt === pathname;
    const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
        const next = typeof value === "function" ? value(open) : value;
        setOpenAt(next ? pathname : null);
    };
    const sw = useLocaleSwitch(pathname);
    const copy = msChromeCopy(sw.locale);
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenAt(null);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    if (isHomePath(pathname)) return null;

    const active = copy.nav
        .map((item) => item.href)
        .filter((href) => pathname === href || pathname?.startsWith(`${href}/`))
        .sort((a, b) => b.length - a.length)[0];
    const home = phase2Routes[sw.locale].home;
    const contact = phase2Routes[sw.locale].contact;
    const trHref = sw.locale === "tr" ? (pathname ?? "/") : sw.href;
    const enHref = sw.locale === "en" ? (pathname ?? "/en") : sw.href;

    return (
        <>
            <a href="#main-content" className="ms-skip">{copy.skipLink}</a>
            <header className="ms-nav">
                <Link href={home} className="ms-nav__logo" aria-label={copy.homeAria} data-cursor={copy.cursor.home}>
                    <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} priority unoptimized />
                </Link>
                <span className="ms-nav__spacer" />
                <nav className="ms-nav__links" aria-label={copy.navAria}>
                    {copy.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={item.href === active ? "is-active" : undefined}
                            aria-current={item.href === active ? "page" : undefined}
                            data-cursor={copy.cursor.go}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <span className="ms-nav__locale">
                    <a href={trHref} onClick={sw.locale === "tr" ? undefined : sw.onClick} className={sw.locale === "tr" ? "is-on" : undefined} aria-label={copy.localeAria.tr}>TR</a>
                    <span aria-hidden="true">/</span>
                    <a href={enHref} onClick={sw.locale === "en" ? undefined : sw.onClick} className={sw.locale === "en" ? "is-on" : undefined} aria-label={copy.localeAria.en}>EN</a>
                </span>
                <Link href={contact} className="ms-nav__cta" data-cursor={copy.cursor.write}>{copy.quote}</Link>
                <button
                    type="button"
                    className="ms-nav__toggle"
                    aria-expanded={open}
                    aria-controls="ms-mobile-menu"
                    aria-label={open ? copy.menuClose : copy.menuOpen}
                    onClick={() => setOpen((value) => !value)}>
                    {open ? "×" : copy.menuLabel}
                </button>
            </header>
            {open && (
                <nav id="ms-mobile-menu" className="ms-menu" aria-label={copy.navAria}>
                    {copy.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
                    <Link href={contact} className="ms-menu__cta">{copy.quote}</Link>
                    <span className="ms-menu__locale">
                        <a href={trHref} onClick={sw.locale === "tr" ? undefined : sw.onClick} className={sw.locale === "tr" ? "is-on" : undefined}>TR</a> / <a href={enHref} onClick={sw.locale === "en" ? undefined : sw.onClick} className={sw.locale === "en" ? "is-on" : undefined}>EN</a>
                    </span>
                </nav>
            )}
        </>
    );
}

/** The closing block every inner page ends with; it doubles as the footer. */
export function MsClosing() {
    const pathname = usePathname();
    const magRef = useRef<HTMLAnchorElement>(null);
    if (isHomePath(pathname)) return null;

    const locale = phase2LocaleFromPath(pathname);
    const copy = msChromeCopy(locale);
    const closing = msClosingFor(pathname ?? "/", locale);
    const contact = phase2Routes[locale].contact;

    const onMagMove = (event: MouseEvent<HTMLDivElement>) => {
        const m = magRef.current;
        if (!m || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = event.currentTarget.getBoundingClientRect();
        m.style.transform = `translate(${(event.clientX - r.left - r.width / 2) * 0.35}px,${(event.clientY - r.top - r.height / 2) * 0.35}px)`;
    };
    const onMagLeave = () => {
        if (magRef.current) magRef.current.style.transform = "";
    };

    return (
        <footer className="ms-closing">
            <div className="ms-closing__top">
                <span className="ms-mono">{copy.closingKicker}</span>
                <p>{closing.lede}</p>
            </div>
            <div className="ms-closing__mid">
                <Link href={contact} className="ms-closing__big" data-cursor={copy.cursor.write}>{closing.word}</Link>
                <div className="ms-closing__mag" onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
                    <Link ref={magRef} href={contact} className="ms-closing__btn" data-cursor="">{copy.quote}</Link>
                </div>
            </div>
            <div className="ms-closing__grid">
                <div>
                    <span className="ms-mono">{copy.labels.email}</span>
                    <a href="mailto:info@metasoftco.com" onClick={() => trackEvent("email_click", { location: "footer" })}>info@metasoftco.com</a>
                </div>
                <div>
                    <span className="ms-mono">{copy.labels.phone}</span>
                    <a href="tel:+905342334051" onClick={() => trackEvent("phone_click", { location: "footer" })}>+90 534 233 40 51</a>
                </div>
                <div>
                    <span className="ms-mono">{copy.labels.address}</span>
                    <span>{copy.address}</span>
                </div>
                <div>
                    <span className="ms-mono">{copy.labels.follow}</span>
                    <div className="ms-closing__links">
                        <a href="https://instagram.com/metasoftco" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/company/metasoftco" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://www.youtube.com/@MetasoftCo" target="_blank" rel="noopener noreferrer">YouTube</a>
                    </div>
                </div>
                <div>
                    <span className="ms-mono">{copy.labels.explore}</span>
                    <div className="ms-closing__links">
                        {copy.more.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                    </div>
                </div>
            </div>
            <div className="ms-closing__base ms-mono">
                <span>© 2026 METASOFTCO</span>
                <span className="ms-closing__legal">
                    {copy.legal.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                </span>
                <span>{copy.baseline}</span>
            </div>
        </footer>
    );
}

/**
 * Site-wide behaviour for inner pages: the custom cursor, scroll reveals and
 * the floating WhatsApp / AI actions. The homepage runs its own.
 */
export function MsBehaviour() {
    const pathname = usePathname();
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const { open: openChat, isOpen: chatOpen } = useChatStore();
    const home = isHomePath(pathname);
    const locale = phase2LocaleFromPath(pathname);
    const copy = msChromeCopy(locale);

    // Reveals: observe every [data-reveal] now and whenever the page swaps content.
    useEffect(() => {
        const root = document.querySelector(".ms");
        if (!root) return;
        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add("is-in");
                io.unobserve(entry.target);
            }
        }, { rootMargin: "0px 0px -8% 0px" });
        const scan = () => root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
        scan();
        const mo = new MutationObserver(scan);
        mo.observe(root, { childList: true, subtree: true });
        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, [pathname]);

    useEffect(() => {
        document.querySelector(".ms")?.classList.toggle("ms--chat", chatOpen);
    }, [chatOpen]);

    // Cursor: fine pointers only, never on the homepage (it has its own).
    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".ms");
        if (!root || home) return;
        const fine = matchMedia("(hover: hover) and (pointer: fine)");
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        if (!fine.matches || reduced.matches) return;
        root.classList.add("ms--cursor");
        const s = { mx: -100, my: -100, rx: -100, ry: -100, size: 44, label: "", shown: "" };
        const onMove = (event: globalThis.MouseEvent) => {
            s.mx = event.clientX;
            s.my = event.clientY;
        };
        const onOver = (event: globalThis.MouseEvent) => {
            const el = (event.target as Element | null)?.closest?.("[data-cursor]");
            s.label = el?.getAttribute("data-cursor") ?? "";
        };
        let raf = 0;
        const frame = () => {
            s.rx += (s.mx - s.rx) * 0.18;
            s.ry += (s.my - s.ry) * 0.18;
            s.size += ((s.label ? 104 : 44) - s.size) * 0.2;
            if (s.label !== s.shown && labelRef.current) {
                s.shown = s.label;
                labelRef.current.textContent = s.label;
                labelRef.current.style.opacity = s.label ? "1" : "0";
            }
            if (dotRef.current) dotRef.current.style.transform = `translate(${s.mx}px,${s.my}px)`;
            const ring = ringRef.current;
            if (ring) {
                ring.style.width = ring.style.height = `${s.size}px`;
                ring.style.transform = `translate(${s.rx - s.size / 2}px,${s.ry - s.size / 2}px)`;
                ring.classList.toggle("is-label", Boolean(s.label));
            }
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            root.classList.remove("ms--cursor");
        };
    }, [home]);

    if (home) return null;

    return (
        <>
            <div ref={dotRef} className="ms-cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="ms-cursor-ring" aria-hidden="true"><span ref={labelRef} /></div>
            <a
                href={`https://wa.me/905342334051?text=${encodeURIComponent(copy.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-float ms-float--wa"
                aria-label="WhatsApp"
                data-cursor={copy.cursor.write}
                onClick={() => trackEvent("whatsapp_click", { location: "floating_pill" })}>
                <span className="ms-float__dot" />
                <svg className="ms-float__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                <span className="ms-float__label">WHATSAPP</span>
            </a>
            <button type="button" className="ms-float ms-float--ai" aria-label={copy.ai.replace("✶", "").trim()} data-cursor={copy.cursor.ask} onClick={() => openChat(locale)}>
                <svg className="ms-float__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3c.6 4.6 2.9 7.4 9 9-6.1 1.6-8.4 4.4-9 9-.6-4.6-2.9-7.4-9-9 6.1-1.6 8.4-4.4 9-9z" fill="currentColor" /></svg>
                <span className="ms-float__label">{copy.ai}</span>
            </button>
        </>
    );
}
