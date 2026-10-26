"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/components/site/BrandStrip";
import { useChatStore } from "@/components/AIChat/useChatStore";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import type { Phase2Locale } from "@/lib/phase2";
import { homeCopy, type HomeServiceKey } from "@/lib/home-content";
import { HOME_INTRO_KEY, applyHomeIntroFlags } from "@/lib/home-intro";
import { startTable, type Table } from "./souvenir-table";
import { upperMixed } from "@/components/site-ms/parts";
import "./home-experience.css";

export interface HomeProject {
    key: string;
    href: string;
    client: string;
    title: string;
    tag: string;
    image: string;
}

export interface HomeService {
    key: HomeServiceKey;
    name: string;
    desc: string;
    href: string;
    image: string | null;
}

const INTRO_MS = 1900;
const CART_KEY = "mh-cart";
const PHONE = "905342334051";

/** Cloudinary delivery transform so previews and souvenirs stay small. */
function cld(url: string, width: number) {
    return url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("/upload/f_auto")
        ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
        : url;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Upper-cases a name for display. CSS text-transform under lang="tr" would
 * turn English brand names into "ORİGİNS" and "STRİP PHOTO", so names are
 * cased here: Turkish rules only when the name itself is Turkish.
 */
const caps = (text: string) => (/[çğıöşüÇĞİÖŞÜ]/.test(text) ? upperMixed(text) : text.toUpperCase());

const LETTERS: { ch: string; tone: "acc" | "fg" | "dim" | "outline" }[] = [
    { ch: "M", tone: "acc" }, { ch: "E", tone: "fg" }, { ch: "T", tone: "fg" }, { ch: "A", tone: "dim" }, { ch: "S", tone: "fg" },
    { ch: "O", tone: "outline" }, { ch: "F", tone: "fg" }, { ch: "T", tone: "fg" }, { ch: "C", tone: "dim" }, { ch: "O", tone: "fg" },
];

export default function HomeExperience({
    locale,
    fontClassName,
    projects,
    projectCount,
    services,
    souvenirImages,
}: {
    locale: Phase2Locale;
    fontClassName: string;
    projects: HomeProject[];
    projectCount: number;
    services: HomeService[];
    souvenirImages: { rayban: string | null; tcmb: string | null };
}) {
    const copy = homeCopy(locale);
    const { open: openChat, isOpen: chatOpen } = useChatStore();

    const [menuOpen, setMenuOpen] = useState(false);
    const [cart, setCart] = useState<HomeServiceKey[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [toast, setToast] = useState("");
    const [quote, setQuote] = useState<{ status: "idle" | "sending" | "sent" | "error"; message?: string }>({ status: "idle" });

    const rootRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const physRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const curLabelRef = useRef<HTMLSpanElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<HTMLDivElement>(null);
    const mqRef = useRef<HTMLDivElement>(null);
    const projRef = useRef<HTMLElement>(null);
    const projTrackRef = useRef<HTMLDivElement>(null);
    const projBarRef = useRef<HTMLDivElement>(null);
    const pvRef = useRef<HTMLDivElement>(null);
    const pvImgRef = useRef<HTMLImageElement>(null);
    const pvLabelRef = useRef<HTMLSpanElement>(null);
    const magRef = useRef<HTMLAnchorElement>(null);
    const toastTimer = useRef(0);
    const cartRef = useRef(cart);
    cartRef.current = cart;

    /** Mutable animation state that must not trigger renders. */
    const live = useRef({
        mx: 0, my: 0, rx: 0, ry: 0, px: 0, py: 0, ringSize: 44, label: "", shownLabel: "",
        lastY: null as number | null, vel: 0, mq: 0, skew: 0,
        fine: false, desktop: false, reduced: false, svcHover: false,
        table: null as Table | null,
    });

    const serviceByKey = useCallback((key: string) => services.find((service) => service.key === key), [services]);

    const toggleCart = useCallback((key: HomeServiceKey) => {
        const has = cartRef.current.includes(key);
        setCart((current) => (has ? current.filter((item) => item !== key) : [...current, key]));
        setQuote((q) => (q.status === "sent" ? { status: "idle" } : q));
        if (!has) {
            const name = serviceByKey(key)?.name ?? key;
            setToast(copy.toastAdded(caps(name)));
            clearTimeout(toastTimer.current);
            toastTimer.current = window.setTimeout(() => setToast(""), 2600);
            trackEvent("home_cart_add", { service: key });
        }
    }, [copy, serviceByKey]);
    const toggleCartRef = useRef(toggleCart);
    toggleCartRef.current = toggleCart;

    // The cart is a per-browser convenience; it is never the source of truth.
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
            if (Array.isArray(saved)) setCart(saved.filter((key) => services.some((service) => service.key === key)));
        } catch { /* storage blocked or corrupt */ }
    }, [services]);
    useEffect(() => {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage blocked */ }
    }, [cart]);

    useLayoutEffect(() => {
        const d = document.documentElement;
        // Client-side navigation: the inline script in the root layout never ran.
        if (!d.hasAttribute("data-mh-js")) applyHomeIntroFlags(true);
        // data-mh-js stays: the inner pages use the same reveal gating.
        return () => d.removeAttribute("data-mh-intro");
    }, []);

    useEffect(() => {
        const s = live.current;
        const root = rootRef.current;
        if (!root) return;
        const fineQuery = matchMedia("(hover: hover) and (pointer: fine)");
        const desktopQuery = matchMedia("(min-width: 900px)");
        const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
        const syncQueries = () => {
            s.fine = fineQuery.matches;
            s.desktop = desktopQuery.matches;
            s.reduced = reducedQuery.matches;
            root.classList.toggle("mh--cursor", s.fine && !s.reduced);
        };
        syncQueries();
        s.mx = s.rx = s.px = innerWidth / 2;
        s.my = s.ry = s.py = innerHeight / 2;

        const timers: number[] = [];
        const intro = document.documentElement.getAttribute("data-mh-intro") === "play";
        const introStart = performance.now();
        if (intro) {
            try { sessionStorage.setItem(HOME_INTRO_KEY, "1"); } catch { /* storage blocked */ }
        }

        // The souvenir table starts once the curtain has lifted and is rebuilt
        // when the width changes enough to resize its vw-based pieces.
        let disposed = false;
        let tableWidth = 0;
        const buildTable = async () => {
            const host = physRef.current;
            if (!host || disposed) return;
            s.table?.destroy();
            s.table = null;
            tableWidth = innerWidth;
            const table = await startTable(host, {
                drag: s.fine && !s.reduced,
                still: s.reduced,
                onAdd: (service) => toggleCartRef.current(service as HomeServiceKey),
                isInCart: (service) => cartRef.current.includes(service as HomeServiceKey),
                labels: { grab: copy.cursor.grab, holding: copy.cursor.holding, flip: copy.cursor.flip, plus: copy.cursor.plus, added: copy.cursor.added },
            });
            if (disposed) table.destroy();
            else s.table = table;
        };
        timers.push(window.setTimeout(buildTable, intro ? INTRO_MS + 400 : 50));

        const layout = () => {
            syncQueries();
            const track = projTrackRef.current, section = projRef.current;
            if (track && section) {
                section.style.height = s.desktop
                    ? Math.max(innerHeight * 1.5, track.scrollWidth - innerWidth + innerHeight) + "px"
                    : "";
                if (!s.desktop) track.style.transform = "";
            }
        };
        let resizeTimer = 0;
        const onResize = () => {
            layout();
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                if (s.table && Math.abs(innerWidth - tableWidth) > innerWidth * 0.08) buildTable();
            }, 250);
        };
        layout();
        window.addEventListener("resize", onResize);
        timers.push(window.setTimeout(layout, 300), window.setTimeout(layout, 1500));
        const ro = new ResizeObserver(layout);
        if (projTrackRef.current) ro.observe(projTrackRef.current);

        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    io.unobserve(entry.target);
                }
            }
        }, { rootMargin: "0px 0px -10% 0px" });
        root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

        const prog = (el: HTMLElement) => {
            const r = el.getBoundingClientRect(), d = r.height - innerHeight;
            return d > 0 ? Math.min(1, Math.max(0, -r.top / d)) : 0;
        };

        let raf = 0;
        const frame = (t: number) => {
            if (intro && t - introStart <= INTRO_MS + 100) {
                const p = Math.min(1, (t - introStart) / INTRO_MS), e = 1 - Math.pow(1 - p, 3);
                if (counterRef.current) counterRef.current.textContent = String(Math.round(e * 100)).padStart(3, "0");
                if (barRef.current) barRef.current.style.width = e * 100 + "%";
                const words = wordsRef.current;
                if (words) {
                    const k = Math.min(3, Math.floor(e * 4));
                    [...words.children].forEach((child, i) => {
                        child.classList.toggle("is-on", i <= k);
                        child.classList.toggle("is-current", i === k);
                    });
                }
            }

            const hero = heroRef.current;
            if (s.table && hero) {
                const r = hero.getBoundingClientRect();
                s.table.step(Math.min(1, Math.max(0, -r.top / r.height)));
            }

            const sy = -root.getBoundingClientRect().top;
            if (s.lastY == null) s.lastY = sy;
            s.vel += (sy - s.lastY - s.vel) * 0.2;
            s.lastY = sy;

            if (s.fine && !s.reduced) {
                const label = s.table?.label() || s.label;
                if (label !== s.shownLabel) {
                    s.shownLabel = label;
                    const c = curLabelRef.current;
                    if (c) {
                        c.textContent = label;
                        c.style.opacity = label ? "1" : "0";
                    }
                }
                s.rx += (s.mx - s.rx) * 0.18;
                s.ry += (s.my - s.ry) * 0.18;
                s.ringSize += ((label ? 104 : 44) - s.ringSize) * 0.2;
                if (dotRef.current) dotRef.current.style.transform = `translate(${s.mx}px,${s.my}px)`;
                const ring = ringRef.current;
                if (ring) {
                    ring.style.width = ring.style.height = s.ringSize + "px";
                    ring.style.transform = `translate(${s.rx - s.ringSize / 2}px,${s.ry - s.ringSize / 2}px)`;
                    ring.classList.toggle("is-label", Boolean(label));
                }
                const pv = pvRef.current;
                if (pv && s.svcHover) {
                    s.px += (s.mx - s.px) * 0.14;
                    s.py += (s.my - s.py) * 0.14;
                    const rot = Math.max(-12, Math.min(12, (s.mx - s.px) * 0.08));
                    pv.style.transform = `translate(${s.px - pv.offsetWidth / 2}px,${s.py - pv.offsetHeight / 2}px) rotate(${rot}deg)`;
                }
            }

            const mq = mqRef.current;
            if (mq && !s.reduced) {
                s.mq -= 1.4 + Math.min(30, Math.abs(s.vel)) * 0.7;
                const half = mq.scrollWidth / 2;
                if (half > 0 && -s.mq > half) s.mq += half;
                const sk = Math.max(-14, Math.min(14, -s.vel * 0.5));
                s.skew += (sk - s.skew) * 0.12;
                mq.style.transform = `translateX(${s.mq}px) skewX(${s.skew}deg)`;
            }

            const pr = projRef.current, tr = projTrackRef.current;
            if (pr && tr && s.desktop) {
                const p = prog(pr);
                tr.style.transform = `translateX(${-(tr.scrollWidth - innerWidth) * p}px)`;
                if (projBarRef.current) projBarRef.current.style.width = p * 100 + "%";
            }

            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            disposed = true;
            s.table?.destroy();
            s.table = null;
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            timers.forEach(clearTimeout);
            window.removeEventListener("resize", onResize);
            ro.disconnect();
            io.disconnect();
        };
    }, [copy]);

    // Overlays: Escape closes, the page behind does not scroll.
    useEffect(() => {
        if (!menuOpen && !cartOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setMenuOpen(false);
            setCartOpen(false);
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [menuOpen, cartOpen]);

    useEffect(() => {
        rootRef.current?.classList.toggle("mh--chat", chatOpen);
    }, [chatOpen]);

    const onRootMove = (event: MouseEvent) => {
        live.current.mx = event.clientX;
        live.current.my = event.clientY;
    };

    const onRootOver = (event: MouseEvent) => {
        const el = (event.target as Element).closest?.("[data-cursor]");
        live.current.label = el?.getAttribute("data-cursor") ?? "";
    };

    const onSvcEnter = (service: HomeService) => {
        const s = live.current;
        if (!s.fine || s.reduced) return;
        const img = pvImgRef.current;
        if (img) {
            img.hidden = !service.image;
            if (service.image) img.src = cld(service.image, 640);
        }
        if (pvLabelRef.current) pvLabelRef.current.textContent = caps(service.name);
        if (!s.svcHover) {
            s.px = s.mx;
            s.py = s.my;
        }
        s.svcHover = true;
        pvRef.current?.classList.add("is-on");
    };

    const onSvcLeave = () => {
        live.current.svcHover = false;
        pvRef.current?.classList.remove("is-on");
    };

    const onMagMove = (event: MouseEvent) => {
        const m = magRef.current;
        if (!m || !live.current.fine || live.current.reduced) return;
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(event.clientX - r.left - r.width / 2) * 0.35}px,${(event.clientY - r.top - r.height / 2) * 0.35}px) scale(1.06)`;
    };
    const onMagLeave = () => {
        if (magRef.current) magRef.current.style.transform = "";
    };

    const openCart = () => {
        setToast("");
        setCartOpen(true);
    };

    async function sendQuote(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        const email = String(data.get("email") || "").trim();
        const company = String(data.get("company") || "").trim();
        const intent = copy.cart.intents.find((option) => option.value === data.get("intent")) ?? copy.cart.intents[0];
        if (!cart.length) return setQuote({ status: "error", message: copy.cart.needItem });
        if (!name || !phone || !email) return setQuote({ status: "error", message: copy.cart.needFields });
        setQuote({ status: "sending" });
        try {
            const res = await fetch("/api/quote-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    eventDate: String(data.get("event") || "").trim(),
                    notes: [copy.cart.notesIntent(intent.label), company && copy.cart.notesCompany(company), copy.cart.notes].filter(Boolean).join("\n"),
                    language: locale,
                    attribution: getAttribution(),
                    services: cart.map((key) => {
                        const service = serviceByKey(key);
                        return { id: key, title: service?.name ?? key, url: service?.href ?? "/" };
                    }),
                }),
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.error || copy.cart.failed);
            setQuote({ status: "sent" });
            setCart([]);
            trackEvent("generate_lead", { form: "home_cart", services: cart.length, intent: intent.value });
        } catch (error) {
            setQuote({ status: "error", message: error instanceof Error && error.message ? error.message : copy.cart.failed });
        }
    }

    const inCart = (key: HomeServiceKey) => cart.includes(key);
    const svcNum = (key: HomeServiceKey) => pad(services.findIndex((service) => service.key === key) + 1);
    const svcName = (key: HomeServiceKey) => serviceByKey(key)?.name ?? "";

    /** Back face shared by the keepsakes: service number, client, add hint. */
    const back = (key: HomeServiceKey, client: string, light = false) => (
        <div className={`mh-souv__back${light ? " is-light" : ""}`}>
            <span className="mh-mono">{svcNum(key)} · {caps(svcName(key))}</span>
            <span className="mh-display">{client}</span>
            <span className="mh-mono">{copy.souvenirAdd}</span>
        </div>
    );

    const souvenir = (key: HomeServiceKey, shape: string, front: ReactNode, backFace: ReactNode) => (
        <div data-phys="item" data-service={key} className={`mh-phys mh-souv mh-souv--${shape}`}>
            <div className="mh-souv__inner">
                <div className="mh-souv__front">{front}</div>
                {backFace}
            </div>
        </div>
    );

    const rayban = souvenirImages.rayban ? cld(souvenirImages.rayban, 600) : null;
    const tcmb = souvenirImages.tcmb ? cld(souvenirImages.tcmb, 600) : null;
    const whatsappHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(copy.whatsappText)}`;

    return (
        <div
            lang={locale}
            ref={rootRef}
            className={`mh ${fontClassName}`}
            onMouseMove={onRootMove}
            onMouseOver={onRootOver}>
            <div className="mh-pre" aria-hidden="true">
                <div className="mh-pre__top">
                    <span>METASOFTCO © 2026</span>
                    <div ref={wordsRef} className="mh-pre__words">
                        {copy.introWords.map((word) => <span key={word}>{word}</span>)}
                    </div>
                </div>
                <div className="mh-pre__bottom">
                    <span ref={counterRef} className="mh-pre__counter">000</span>
                    <div className="mh-bar"><div ref={barRef} className="mh-bar__fill" /></div>
                </div>
            </div>

            <div ref={dotRef} className="mh-cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="mh-cursor-ring" aria-hidden="true">
                <span ref={curLabelRef} />
            </div>

            <a href="#main-content" className="mh-skip">{copy.skipLink}</a>
            <header className="mh-nav">
                <Link href={copy.routes.home} className="mh-nav__logo" aria-label={copy.homeAria}>
                    <Image src="/blackLogo.png" alt="MetasoftCo" width={160} height={40} priority unoptimized />
                </Link>
                <span className="mh-nav__spacer" />
                <nav className="mh-nav__links" aria-label={copy.navAria}>
                    {copy.nav.map((item) => (
                        <Link key={item.href} href={item.href} data-cursor={copy.cursor.go}>{item.label}</Link>
                    ))}
                </nav>
                <span className="mh-nav__locale">
                    <a href={copy.locales.tr} aria-label={copy.localeAria.tr} aria-current={locale === "tr" ? "page" : undefined} className={locale === "tr" ? "is-on" : undefined}>TR</a>
                    <span aria-hidden="true">/</span>
                    <a href={copy.locales.en} aria-label={copy.localeAria.en} aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "is-on" : undefined}>EN</a>
                </span>
                <button type="button" className={`mh-nav__cart${cart.length ? "" : " is-empty"}`} onClick={openCart} data-cursor={copy.cursor.cart}>
                    {copy.cartButton(cart.length)}
                </button>
                <Link href={copy.routes.contact} className="mh-nav__cta" data-cursor={copy.cursor.write}>{copy.quoteCta}</Link>
                <button
                    type="button"
                    className="mh-nav__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="mh-mobile-menu"
                    aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}>
                    {menuOpen ? "×" : copy.menuLabel}
                </button>
            </header>
            {menuOpen && (
                <nav id="mh-mobile-menu" className="mh-menu" aria-label={copy.navAria}>
                    {copy.nav.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                    ))}
                    <Link href={copy.routes.contact} className="mh-menu__cta" onClick={() => setMenuOpen(false)}>{copy.quoteCta}</Link>
                    <span className="mh-menu__locale">
                        <a href={copy.locales.tr} className={locale === "tr" ? "is-on" : undefined}>TR</a> / <a href={copy.locales.en} className={locale === "en" ? "is-on" : undefined}>EN</a>
                    </span>
                </nav>
            )}

            <section ref={heroRef} className="mh-hero" aria-labelledby="mh-hero-title">
                <div className="mh-hero__copy">
                    <h1 id="mh-hero-title" className="mh-display mh-hero__title">{copy.heroTitle}</h1>
                    <p className="mh-hero__lede">{copy.heroLede}</p>
                    <div className="mh-hero__stats mh-mono">
                        {copy.heroStats.map((stat) => (
                            <span key={stat.label}><b>{stat.value}</b> {stat.label}</span>
                        ))}
                    </div>
                    <div className="mh-hero__ctas">
                        <Link href={copy.routes.contact} className="mh-pill mh-pill--acc" data-cursor={copy.cursor.write}>{copy.heroPrimary}</Link>
                        <Link href={copy.routes.products} className="mh-pill mh-pill--line" data-cursor={copy.cursor.go}>{copy.heroSecondary}</Link>
                    </div>
                </div>
                <div className="mh-hero__side mh-mono" aria-hidden="true">
                    <span className="mh-hero__drag"><span className="mh-dot" /><span className="mh-only-fine">{copy.heroDrag}</span><span className="mh-only-touch">{copy.heroTap}</span></span>
                </div>

                <div ref={physRef} className="mh-table" aria-hidden="true">
                    {LETTERS.map((letter, i) => (
                        <div key={i} data-phys="letter" className="mh-phys">
                            <span className={`mh-letter mh-letter--${letter.tone}`}>{letter.ch}</span>
                        </div>
                    ))}

                    {souvenir("strip-photo", "strip", (
                        <div className="mh-strip">
                            {rayban && ["20% 50%", "50% 40%", "80% 50%"].map((position) => (
                                // eslint-disable-next-line @next/next/no-img-element -- three crops of one small image
                                <img key={position} src={rayban} alt="" style={{ objectPosition: position }} draggable={false} />
                            ))}
                            <span className="mh-mono">RAY-BAN × STRIP PHOTO</span>
                        </div>
                    ), back("strip-photo", "RAY-BAN"))}

                    {souvenir("strip-photo", "badge", (
                        <div className="mh-badge mh-mono"><span className="mh-badge__dot" />ROLLIC SUMMER PARTY · ALL ACCESS</div>
                    ), (
                        <div className="mh-souv__back mh-souv__back--row is-light mh-mono">
                            <span>ROLLIC × {caps(svcName("strip-photo"))}</span>
                            <span>{copy.souvenirAdd}</span>
                        </div>
                    ))}

                    {souvenir("ai-greenbox", "polaroid", (
                        <div className="mh-polaroid">
                            {tcmb
                                // eslint-disable-next-line @next/next/no-img-element -- physics piece, sized by CSS
                                ? <img src={tcmb} alt="" draggable={false} />
                                : <span className="mh-polaroid__blank" />}
                            <span className="mh-mono">TCMB · AI GREENBOX</span>
                        </div>
                    ), back("ai-greenbox", "TCMB İFM"))}

                    {souvenir("gift-wheel", "ticket", (
                        <div className="mh-ticket">
                            <div className="mh-ticket__main">
                                <span className="mh-mono">{locale === "tr" ? "PEGASUS × HEDİYE ÇARKI" : "PEGASUS × GIFT WHEEL"}</span>
                                <span className="mh-display">{locale === "tr" ? "KAZANDIN!" : "YOU WON!"}</span>
                            </div>
                            <div className="mh-ticket__code" />
                        </div>
                    ), back("gift-wheel", "PEGASUS"))}

                    {souvenir("photobooth", "pass", (
                        <div className="mh-pass">
                            <span className="mh-pass__slot" />
                            <span className="mh-mono">{locale === "tr" ? "KATILIMCI" : "GUEST"}</span>
                            <span className="mh-display">#1048</span>
                            <span className="mh-mono">AKBANK · ODTÜ</span>
                        </div>
                    ), back("photobooth", "AKBANK"))}

                    {souvenir("ai-football-card", "fcard", (
                        <div className="mh-fcard">
                            <div><span className="mh-display">99</span><span className="mh-mono">FW</span></div>
                            <span className="mh-display">AI FOOTBALL CARD</span>
                        </div>
                    ), back("ai-football-card", "AKMERKEZ", true))}

                    {souvenir("ai-try-on", "hangtag", (
                        <div className="mh-hangtag">
                            <span className="mh-hangtag__hole" />
                            <span className="mh-display">EVO SL</span>
                            <span className="mh-mono">ADIDAS · AI TRY-ON</span>
                        </div>
                    ), back("ai-try-on", "ADIDAS"))}
                </div>
                <span className="mh-hero__scroll mh-mono" aria-hidden="true">{copy.heroScroll}</span>
            </section>

            <section className="mh-marquee" aria-hidden="true">
                <div className="mh-marquee__band">
                    <div ref={mqRef} className="mh-marquee__track">
                        <span>{copy.marquee}</span>
                        <span>{copy.marquee}</span>
                    </div>
                </div>
            </section>

            <section className="mh-section mh-aud" aria-labelledby="mh-aud-title">
                <div className="mh-head" data-reveal>
                    <h2 id="mh-aud-title" className="mh-display mh-h2">{copy.audience.title}</h2>
                </div>
                <ul className="mh-aud__list">
                    {copy.audience.items.map((item, index) => (
                        <li key={item.name} className="mh-aud__item" data-reveal style={{ ["--d" as string]: `${index * 0.06}s` }}>
                            <h3 className="mh-aud__name">{item.name}</h3>
                            <p className="mh-aud__desc">{item.desc}</p>
                            <Link href={item.href} className="mh-aud__cta mh-mono" data-cursor={copy.cursor.go}>{item.cta}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section ref={projRef} className="mh-work" aria-labelledby="mh-work-title">
                <div className="mh-work__stage">
                    <div className="mh-work__head">
                        <h2 id="mh-work-title" className="mh-display mh-work__title">{copy.workTitle}</h2>
                        <div className="mh-work__meta mh-mono">
                            <span>{copy.workMeta(projectCount)}</span>
                            <div className="mh-bar mh-work__bar"><div ref={projBarRef} className="mh-bar__fill" /></div>
                        </div>
                    </div>
                    <div ref={projTrackRef} className="mh-work__track">
                        {projects.map((project, index) => (
                            <Link key={project.key} href={project.href} className="mh-card" data-cursor={copy.cursor.view}>
                                <div className="mh-card__media">
                                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 899px) 80vw, 34vw" className="mh-cover" />
                                    <span className="mh-card__tag mh-mono">{project.tag}</span>
                                </div>
                                <div className="mh-card__head">
                                    <span className="mh-card__num mh-mono">{pad(index + 1)}</span>
                                    <span className="mh-card__client mh-display mh-nocase">{caps(project.client)}</span>
                                </div>
                                <span className="mh-card__title">{project.title}</span>
                            </Link>
                        ))}
                        <Link href={copy.routes.work} className="mh-card-all" data-cursor={copy.cursor.all}>
                            <span className="mh-mono">({projectCount})</span>
                            <span className="mh-display">{copy.workAll}</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mh-section mh-brands" aria-labelledby="mh-brands-title">
                <div className="mh-head" data-reveal>
                    <h2 id="mh-brands-title" className="mh-display mh-h2">{copy.brandsTitle}</h2>
                    <span className="mh-mono mh-meta">{copy.brandsMeta}</span>
                </div>
                <ul data-reveal className="mh-brands__grid" style={{ ["--d" as string]: "0.1s" }}>
                    {brands.map((brand) => (
                        <li key={brand.name}>
                            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos */}
                            <img
                                src={brand.src}
                                alt={brand.name}
                                loading="lazy"
                                className={brand.variant ? `mh-brand mh-brand--${brand.variant}` : "mh-brand"}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mh-section mh-services" aria-labelledby="mh-services-title">
                <div className="mh-head" data-reveal>
                    <h2 id="mh-services-title" className="mh-display mh-h2">{copy.servicesTitle}</h2>
                    <span className="mh-mono mh-meta">{copy.servicesMeta}</span>
                </div>
                <ul className="mh-svc-list">
                    {services.map((service, index) => {
                        const added = inCart(service.key);
                        return (
                            <li
                                key={service.key}
                                className="mh-svc"
                                onMouseEnter={() => onSvcEnter(service)}
                                onMouseLeave={onSvcLeave}>
                                <span className="mh-mono mh-svc__num">{pad(index + 1)}</span>
                                <Link href={service.href} className="mh-display mh-nocase mh-svc__name" data-cursor={copy.cursor.view}>{caps(service.name)}</Link>
                                <span className="mh-svc__desc">{service.desc}</span>
                                <button
                                    type="button"
                                    className={`mh-svc__btn mh-mono${added ? " is-on" : ""}`}
                                    aria-pressed={added}
                                    data-cursor={added ? copy.cursor.remove : copy.cursor.add}
                                    onClick={() => toggleCart(service.key)}>
                                    {added ? copy.serviceAdded : copy.serviceAdd}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div ref={pvRef} className="mh-preview" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element -- src swaps on hover */}
                    <img ref={pvImgRef} alt="" hidden />
                    <span ref={pvLabelRef} className="mh-display" />
                </div>
            </section>

            <section className="mh-section mh-why" aria-labelledby="mh-why-title">
                <div className="mh-head" data-reveal>
                    <h2 id="mh-why-title" className="mh-display mh-h2">{copy.whyTitle}<span className="mh-acc">.</span></h2>
                    <span className="mh-mono mh-meta mh-why__meta">{copy.whyMeta[0]}<br />{copy.whyMeta[1]}</span>
                </div>
                <ol className="mh-why__grid">
                    {copy.why.map((item, index) => (
                        <li key={item.title} data-reveal style={{ ["--d" as string]: `${index * 0.1}s` }}>
                            <span className={`mh-display mh-why__num${index === copy.why.length - 1 ? " is-acc" : ""}`} aria-hidden="true">
                                {pad(index + 1)}
                            </span>
                            <h3 className="mh-display">{item.title}</h3>
                            <p>{item.copy}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {copy.software && (
                <section className="mh-soft-line" aria-label={copy.software.cta}>
                    <p>{copy.software.line}</p>
                    <Link href={copy.software.href} className="mh-link mh-mono" data-cursor={copy.cursor.go}>{copy.software.cta}</Link>
                </section>
            )}

            <section className="mh-deck" aria-labelledby="mh-deck-title">
                <div className="mh-deck__copy">
                    <h2 id="mh-deck-title" className="mh-display">{copy.deck.title}</h2>
                    <p>{copy.deck.lede}</p>
                </div>
                <div className="mh-deck__form">
                    <Link
                        href={copy.deck.href}
                        className="mh-pill mh-pill--acc"
                        data-cursor={copy.cursor.go}
                        onClick={() => trackEvent("deck_open", { location: "home" })}>
                        {copy.deck.cta}
                    </Link>
                </div>
            </section>

            <section className="mh-contact" aria-labelledby="mh-contact-title">
                <h2 id="mh-contact-title" className="mh-sr">{copy.contactLede}</h2>
                <div className="mh-contact__top">
                    <span className="mh-mono mh-meta">{copy.contactMeta}</span>
                    <p>{copy.contactLede}</p>
                </div>
                <div className="mh-contact__mid">
                    <a
                        href="mailto:info@metasoftco.com"
                        className="mh-display mh-contact__big"
                        data-cursor={copy.cursor.write}
                        onClick={() => trackEvent("email_click", { location: "home_contact" })}>
                        {copy.contactBig}
                    </a>
                    <div className="mh-contact__mag" onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
                        <Link ref={magRef} href={copy.routes.contact} className="mh-mono mh-contact__btn" data-cursor="">
                            {copy.quoteCta}
                        </Link>
                    </div>
                </div>
                <div className="mh-contact__grid">
                    <div>
                        <span className="mh-mono">{copy.contactLabels.email}</span>
                        <a href="mailto:info@metasoftco.com">info@metasoftco.com</a>
                    </div>
                    <div>
                        <span className="mh-mono">{copy.contactLabels.phone}</span>
                        <a href="tel:+905342334051" onClick={() => trackEvent("phone_click", { location: "home_contact" })}>+90 534 233 40 51</a>
                    </div>
                    <div>
                        <span className="mh-mono">{copy.contactLabels.address}</span>
                        <span>{copy.address}</span>
                    </div>
                    <div>
                        <span className="mh-mono">{copy.contactLabels.follow}</span>
                        <div className="mh-contact__social">
                            <a href="https://instagram.com/metasoftco" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.linkedin.com/company/metasoftco" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://www.youtube.com/@MetasoftCo" target="_blank" rel="noopener noreferrer">YouTube</a>
                        </div>
                    </div>
                </div>
                <div className="mh-contact__base mh-mono">
                    <span>© 2026 METASOFTCO</span>
                    <span className="mh-contact__legal">
                        {copy.legal.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
                    </span>
                    <span>{copy.baseline}</span>
                </div>
            </section>

            <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mh-float mh-float--wa mh-mono"
                aria-label="WhatsApp"
                data-cursor={copy.cursor.write}
                onClick={() => trackEvent("whatsapp_click", { location: "home_pill" })}>
                <span className="mh-float__dot" />
                <svg className="mh-float__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                <span className="mh-float__label">WHATSAPP</span>
            </a>
            <button
                type="button"
                className="mh-float mh-float--ai mh-mono"
                aria-label={copy.aiButton.replace("✶", "").trim()}
                data-cursor={copy.cursor.ask}
                onClick={() => openChat(locale)}>
                <svg className="mh-float__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3c.6 4.6 2.9 7.4 9 9-6.1 1.6-8.4 4.4-9 9-.6-4.6-2.9-7.4-9-9 6.1-1.6 8.4-4.4 9-9z" fill="currentColor" /></svg>
                <span className="mh-float__label">{copy.aiButton}</span>
            </button>

            {toast && (
                <div className="mh-toast mh-mono" role="status">
                    <span>{toast}</span>
                    <button type="button" onClick={openCart}>{copy.toastOpen}</button>
                </div>
            )}

            <div className={`mh-cart-backdrop${cartOpen ? " is-open" : ""}`} onClick={() => setCartOpen(false)} aria-hidden="true" />
            <aside className={`mh-cart${cartOpen ? " is-open" : ""}`} aria-label={copy.cart.title(cart.length)} aria-hidden={!cartOpen} inert={!cartOpen}>
                <div className="mh-cart__head">
                    <h2 className="mh-display">{copy.cart.title(cart.length)}</h2>
                    <button type="button" onClick={() => setCartOpen(false)} aria-label={copy.cart.close}>×</button>
                </div>
                <div className="mh-cart__list">
                    {cart.length === 0 && quote.status !== "sent" && <p className="mh-meta">{copy.cart.empty}</p>}
                    {cart.map((key) => (
                        <div key={key} className="mh-cart__item">
                            <span className="mh-dot" />
                            <span className="mh-display mh-nocase">{caps(svcName(key))}</span>
                            <button type="button" className="mh-mono" onClick={() => toggleCart(key)}>{copy.cart.remove}</button>
                        </div>
                    ))}
                </div>
                <div className="mh-cart__foot">
                    {quote.status === "sent" ? (
                        <div className="mh-cart__sent" role="status">
                            <span className="mh-display mh-acc">{copy.cart.sentTitle}</span>
                            <span className="mh-meta">{copy.cart.sentBody}</span>
                        </div>
                    ) : (
                        <form onSubmit={sendQuote} className="mh-cart__form">
                            <p className="mh-cart__promise">{copy.cart.promise}</p>
                            <fieldset className="mh-cart__intent">
                                <legend className="mh-mono">{copy.cart.intentLabel}</legend>
                                {copy.cart.intents.map((option, index) => (
                                    <label key={option.value} className="mh-cart__choice">
                                        <input type="radio" name="intent" value={option.value} defaultChecked={index === 0} />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </fieldset>
                            <label className="mh-field">
                                <span className="mh-mono">{copy.cart.name}</span>
                                <input name="name" required autoComplete="name" className="mh-input" />
                            </label>
                            <label className="mh-field">
                                <span className="mh-mono">{copy.cart.company}</span>
                                <input name="company" autoComplete="organization" className="mh-input" />
                            </label>
                            <label className="mh-field">
                                <span className="mh-mono">{copy.cart.email}</span>
                                <input name="email" type="email" required autoComplete="email" className="mh-input" />
                            </label>
                            <label className="mh-field">
                                <span className="mh-mono">{copy.cart.phone}</span>
                                <input name="phone" type="tel" required autoComplete="tel" className="mh-input" />
                            </label>
                            <label className="mh-field">
                                <span className="mh-mono">{copy.cart.event}</span>
                                <input name="event" className="mh-input" />
                            </label>
                            <p className="mh-cart__consent">
                                {copy.cart.consent} <Link href="/gizlilik">{copy.cart.privacy}</Link>
                            </p>
                            {quote.status === "error" && <p className="mh-error" role="alert">{quote.message}</p>}
                            <button type="submit" className="mh-pill mh-pill--acc mh-pill--block" disabled={quote.status === "sending"}>
                                {quote.status === "sending" ? copy.cart.sending : copy.cart.submit}
                            </button>
                        </form>
                    )}
                </div>
            </aside>
        </div>
    );
}
