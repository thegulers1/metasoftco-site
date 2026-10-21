"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MsCaps, tiltFor } from "./parts";

const OPTIMIZABLE_HOSTS = ["res.cloudinary.com", "images.unsplash.com"];

/**
 * next/image for local files and the hosts next.config allows; a plain <img>
 * for anything else (editor-pasted URLs), which next/image would reject.
 */
export function MsImg({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
    let optimizable = src.startsWith("/");
    if (!optimizable) {
        try {
            optimizable = OPTIMIZABLE_HOSTS.includes(new URL(src).hostname);
        } catch {
            optimizable = false;
        }
    }
    if (optimizable) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />;
    // eslint-disable-next-line @next/next/no-img-element -- host is not on the next/image allowlist
    return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}

/** Istanbul wall clock used in the hero bars. */
export function MsClock({ label }: { label: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const tick = () => {
            if (ref.current) {
                ref.current.textContent = new Date().toLocaleTimeString("tr-TR", {
                    timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", second: "2-digit",
                });
            }
        };
        tick();
        const id = window.setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return <span aria-hidden="true">{label} <span ref={ref}>--:--:--</span></span>;
}

export interface MsCatalogItem {
    key: string;
    href: string;
    name: string;
    /** Category label shown on the tag and used by the filter chips. */
    cat?: string;
    sub?: string;
    image?: string | null;
}

/**
 * Filter chips plus a grid/list view switch. Every item is rendered into the
 * HTML up front and filtering only hides them, so crawlers see every link.
 */
export function MsCatalog({
    items,
    allLabel,
    countLabel,
    labels,
    rowVariant = "default",
    showToggle = true,
    showChips = true,
    wide,
    defaultView,
}: {
    items: MsCatalogItem[];
    allLabel: string;
    /** Word after the visible count, e.g. "DENEYİM". */
    countLabel: string;
    labels: { grid: string; list: string; view: string; open: string };
    rowVariant?: "default" | "sub";
    showToggle?: boolean;
    showChips?: boolean;
    wide?: boolean;
    /** Defaults to the grid, or to the list when no item has an image. */
    defaultView?: "grid" | "list";
}) {
    const [cat, setCat] = useState(allLabel);
    const [view, setView] = useState<"grid" | "list">(defaultView ?? (items.some((item) => item.image) ? "grid" : "list"));
    const cats = useMemo(() => {
        const order: string[] = [];
        for (const item of items) if (item.cat && !order.includes(item.cat)) order.push(item.cat);
        return order;
    }, [items]);
    const counts = useMemo(() => Object.fromEntries(cats.map((c) => [c, items.filter((i) => i.cat === c).length])), [cats, items]);
    const visible = (item: MsCatalogItem) => cat === allLabel || item.cat === cat;
    const shown = items.filter(visible).length;
    const pad = (n: number) => String(n + 1).padStart(2, "0");

    return (
        <div className="ms-catalog">
            {(showChips && cats.length > 1) || showToggle ? (
                <div className="ms-catalog__bar">
                    {showChips && cats.length > 1 ? (
                        <div className="ms-chips">
                            {[allLabel, ...cats].map((label) => (
                                <button
                                    key={label}
                                    type="button"
                                    className="ms-chip"
                                    aria-pressed={cat === label}
                                    data-cursor={labels.open}
                                    onClick={() => setCat(label)}>
                                    {label}{" "}
                                    <span className="ms-chip__count">{label === allLabel ? items.length : counts[label]}</span>
                                </button>
                            ))}
                        </div>
                    ) : <span />}
                    <div className="ms-catalog__meta ms-mono">
                        <span><b>{shown}</b> {countLabel}</span>
                        {showToggle && (
                            <div className="ms-toggle" role="group" aria-label={labels.view}>
                                <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")} data-cursor={labels.grid}>{labels.grid}</button>
                                <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} data-cursor={labels.list}>{labels.list}</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {view === "grid" ? (
                <div className={`ms-grid${wide ? " ms-grid--wide" : ""}`}>
                    {items.map((item, index) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className="ms-tile"
                            data-cursor={labels.open}
                            data-hidden={visible(item) ? undefined : ""}>
                            <div className={`ms-tile__media${item.image ? "" : " ms-tile__media--empty"}`} style={{ ["--tilt" as string]: tiltFor(index) } as CSSProperties}>
                                {item.image ? (
                                    <MsImg src={item.image} alt={item.name} sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                                ) : (
                                    <span aria-hidden="true">{item.name}</span>
                                )}
                                <span className="ms-tile__tag ms-mono">{pad(index)}{item.cat ? <> · <MsCaps text={item.cat} /></> : null}</span>
                            </div>
                            <div className="ms-tile__row">
                                <span className="ms-tile__name"><MsCaps text={item.name} /></span>
                                <span className="ms-tile__arrow" aria-hidden="true">↗</span>
                            </div>
                            {item.sub && <span className="ms-tile__sub">{item.sub}</span>}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="ms-rows">
                    {items.map((item, index) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`ms-row${rowVariant === "sub" ? " ms-row--3" : ""}`}
                            data-cursor={labels.open}
                            data-hidden={visible(item) ? undefined : ""}>
                            <span className="ms-row__num">{pad(index)}</span>
                            <span className={`ms-row__name${rowVariant === "sub" ? " ms-row__name--sm" : ""}`}><MsCaps text={item.name} /></span>
                            {rowVariant === "sub" ? (
                                <>
                                    <span className="ms-row__sub">{item.sub}</span>
                                    <span className="ms-row__cat">{item.cat && <MsCaps text={item.cat} />} ↗</span>
                                </>
                            ) : (
                                <>
                                    <span className="ms-row__cat">{item.cat && <MsCaps text={item.cat} />}</span>
                                    <span className="ms-row__arrow" aria-hidden="true">↗</span>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function youTubeId(url: string): string | null {
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtu\.be\/([^?&/]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/** YouTube (incl. Shorts, shown upright) or a direct video file that plays muted in view. */
export function MsVideo({ src, title, poster }: { src: string; title: string; poster?: string | null }) {
    const ref = useRef<HTMLVideoElement>(null);
    const id = youTubeId(src);
    // YouTube's player weighs ~500 KB; it loads only after the visitor presses play.
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        }, { threshold: 0.4 });
        io.observe(video);
        return () => io.disconnect();
    }, []);
    if (id) {
        const portrait = src.includes("/shorts/");
        return (
            <div className={`ms-video${portrait ? " ms-video--portrait" : ""}`}>
                {playing ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button type="button" className="ms-video__poster" onClick={() => setPlaying(true)} aria-label={title}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail */}
                        <img src={poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                        <span className="ms-video__play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                        </span>
                    </button>
                )}
            </div>
        );
    }
    return (
        <div className="ms-video">
            <video ref={ref} src={src} poster={poster ?? undefined} muted loop playsInline controls preload="metadata" aria-label={title} />
        </div>
    );
}

/** Tilted photo grid with a keyboard-friendly lightbox. */
export function MsGallery({ images, labels }: { images: { url: string; alt: string }[]; labels: { close: string; prev: string; next: string } }) {
    const [open, setOpen] = useState<number | null>(null);
    useEffect(() => {
        if (open === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(null);
            if (event.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
            if (event.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, images.length]);
    if (!images.length) return null;
    return (
        <>
            <div className="ms-gallery" data-reveal>
                {images.map((image, index) => (
                    <button key={`${index}-${image.url}`} type="button" onClick={() => setOpen(index)} aria-label={image.alt}>
                        <MsImg src={image.url} alt={image.alt} sizes="(max-width: 700px) 100vw, 33vw" />
                    </button>
                ))}
            </div>
            {open !== null && (
                <div className="ms-lightbox" role="dialog" aria-modal="true" aria-label={images[open].alt} onClick={() => setOpen(null)}>
                    <div className="ms-lightbox__img" onClick={(event) => event.stopPropagation()}>
                        <MsImg src={images[open].url} alt={images[open].alt} sizes="100vw" />
                    </div>
                    <button type="button" className="ms-lightbox__close" onClick={() => setOpen(null)}>{labels.close}</button>
                    {images.length > 1 && (
                        <>
                            <button type="button" className="ms-lightbox__nav ms-lightbox__nav--prev" onClick={(event) => { event.stopPropagation(); setOpen((open - 1 + images.length) % images.length); }}>{labels.prev}</button>
                            <button type="button" className="ms-lightbox__nav ms-lightbox__nav--next" onClick={(event) => { event.stopPropagation(); setOpen((open + 1) % images.length); }}>{labels.next}</button>
                        </>
                    )}
                    <span className="ms-lightbox__count ms-mono">{open + 1} / {images.length}</span>
                </div>
            )}
        </>
    );
}

export interface MsPostRow {
    key: string;
    href: string;
    title: string;
    date: string | null;
    cat: string | null;
}

/** Blog list: category chips over full-width rows; every row stays in the HTML. */
export function MsPostRows({ posts, allLabel, countLabel, openLabel }: { posts: MsPostRow[]; allLabel: string; countLabel: string; openLabel: string }) {
    const [cat, setCat] = useState(allLabel);
    const cats = useMemo(() => {
        const order: string[] = [];
        for (const post of posts) if (post.cat && !order.includes(post.cat)) order.push(post.cat);
        return order;
    }, [posts]);
    const visible = (post: MsPostRow) => cat === allLabel || post.cat === cat;
    return (
        <div className="ms-catalog" style={{ paddingTop: "2vw" }}>
            <div className="ms-catalog__bar" style={{ position: "static" }}>
                {cats.length > 1 ? (
                    <div className="ms-chips">
                        {[allLabel, ...cats].map((label) => (
                            <button key={label} type="button" className="ms-chip" aria-pressed={cat === label} onClick={() => setCat(label)} data-cursor={openLabel}>
                                {label}{" "}
                                <span className="ms-chip__count">{label === allLabel ? posts.length : posts.filter((p) => p.cat === label).length}</span>
                            </button>
                        ))}
                    </div>
                ) : <span />}
                <span className="ms-catalog__meta ms-mono"><span><b>{posts.filter(visible).length}</b> {countLabel}</span></span>
            </div>
            <div className="ms-rows">
                {posts.map((post) => (
                    <Link key={post.key} href={post.href} className="ms-row ms-row--blog" data-cursor={openLabel} data-hidden={visible(post) ? undefined : ""}>
                        <span className="ms-row__num">{post.date}</span>
                        <span className="ms-row__title">{post.title}</span>
                        <span className="ms-row__cat">{post.cat && <MsCaps text={post.cat} />}</span>
                        <span className="ms-row__arrow" aria-hidden="true">↗</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
