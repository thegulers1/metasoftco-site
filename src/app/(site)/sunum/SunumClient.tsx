"use client";

import { useMemo, useState } from "react";
import { buildSlidePages } from "@/components/presentation/Slides";
import { deckPageCount, selectFromDeck, type Deck } from "@/lib/presentation-deck";
import { trackEvent } from "@/lib/analytics";
import "./sunum.css";

type Busy = "all" | "selection" | null;

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16" />
        </svg>
    );
}

export default function SunumClient({ deck }: { deck: Deck }) {
    const pages = useMemo(() => buildSlidePages(deck, deck, { lazy: true }), [deck]);
    const [selected, setSelected] = useState<Set<string>>(() => new Set());
    const [filter, setFilter] = useState<string | null>(null);
    const [busy, setBusy] = useState<Busy>(null);
    const [error, setError] = useState<string | null>(null);

    const totalPages = deckPageCount(deck);
    const selectionPages = selected.size ? deckPageCount(selectFromDeck(deck, selected)) : 0;
    const visiblePages = filter ? pages.filter((page) => page.categoryId === filter) : pages;

    const toggleService = (id: string) =>
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const toggleCategory = (categoryId: string) => {
        const ids = deck.categories.find((c) => c.id === categoryId)?.services.map((s) => s.id) ?? [];
        setSelected((prev) => {
            const next = new Set(prev);
            const allIn = ids.every((id) => next.has(id));
            ids.forEach((id) => (allIn ? next.delete(id) : next.add(id)));
            return next;
        });
    };

    async function download(scope: "all" | "selection") {
        setBusy(scope);
        setError(null);
        const ids = scope === "selection" ? [...selected] : null;
        try {
            const res = await fetch(`/api/sunum/pdf${ids ? `?s=${ids.join(",")}` : ""}`);
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.error || "PDF oluşturulamadı, lütfen tekrar deneyin.");
            }
            const url = URL.createObjectURL(await res.blob());
            const link = document.createElement("a");
            link.href = url;
            link.download = ids ? "MetasoftCo-Sunum-2026-Secim.pdf" : "MetasoftCo-Sunum-2026.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 10_000);
            trackEvent("presentation_download", { scope, services: ids ? ids.length : deck.serviceCount });
        } catch (err) {
            setError(err instanceof Error ? err.message : "PDF oluşturulamadı, lütfen tekrar deneyin.");
        } finally {
            setBusy(null);
        }
    }

    return (
        <article className="sz-page" lang="tr">
            <header className="sz-intro p2-container">
                <p className="sz-eyebrow">Sunum 2026 · Sürüm {deck.version}</p>
                <h1>
                    Hizmet sunumumuz, <span>her zaman güncel</span>
                </h1>
                <p className="sz-lead">
                    Tüm hizmetlerimizi sayfa sayfa inceleyin. İstediğiniz hizmetleri seçip kendi sunumunuzu PDF olarak indirin ya da
                    sunumun tamamını tek tıkla alın. Kapak, tanıtım, referanslar ve iletişim sayfaları her PDF&apos;te yer alır.
                </p>
                <dl className="sz-facts">
                    <div>
                        <dt>Kategori</dt>
                        <dd>{deck.categories.length}</dd>
                    </div>
                    <div>
                        <dt>Hizmet</dt>
                        <dd>{deck.serviceCount}</dd>
                    </div>
                    <div>
                        <dt>Sayfa</dt>
                        <dd>{totalPages}</dd>
                    </div>
                </dl>
            </header>

            <div className="sz-toolbar">
                <div className="sz-toolbar__in p2-container">
                    <div className="sz-chips" role="group" aria-label="Kategoriye göre göster">
                        <button type="button" className="sz-chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
                            Tüm sayfalar
                        </button>
                        {deck.categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                className="sz-chip"
                                aria-pressed={filter === category.id}
                                onClick={() => setFilter(category.id)}>
                                {category.name}
                                <small>{category.services.length}</small>
                            </button>
                        ))}
                    </div>
                    <div className="sz-actions">
                        <p className="sz-count" aria-live="polite">
                            {selected.size ? (
                                <>
                                    <b>{selected.size}</b> hizmet seçili · {selectionPages} sayfa
                                </>
                            ) : (
                                "Hizmet seçmek için sayfaların üstündeki kutuyu işaretleyin"
                            )}
                        </p>
                        {selected.size > 0 && (
                            <button type="button" className="sz-btn sz-btn--text" onClick={() => setSelected(new Set())}>
                                Seçimi temizle
                            </button>
                        )}
                        <button
                            type="button"
                            className="sz-btn sz-btn--ghost"
                            disabled={busy !== null}
                            onClick={() => download("all")}>
                            <DownloadIcon />
                            {busy === "all" ? (
                                "PDF hazırlanıyor…"
                            ) : (
                                <span>
                                    Tümünü indir<span className="sz-wide"> · {totalPages} sayfa</span>
                                </span>
                            )}
                        </button>
                        <button
                            type="button"
                            className="sz-btn sz-btn--primary"
                            disabled={busy !== null || selected.size === 0}
                            onClick={() => download("selection")}>
                            <DownloadIcon />
                            {busy === "selection" ? (
                                "PDF hazırlanıyor…"
                            ) : (
                                <span>
                                    Seçilenleri<span className="sz-wide"> PDF</span> indir
                                </span>
                            )}
                        </button>
                    </div>
                    {error && (
                        <p className="sz-error" role="alert">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            <div className="sz-pages p2-container">
                {visiblePages.map((page) => {
                    const pageNo = pages.indexOf(page) + 1;
                    let control: React.ReactNode;
                    let included = true;

                    if (page.kind === "service" && page.serviceId) {
                        const id = page.serviceId;
                        included = selected.has(id);
                        control = (
                            <button type="button" className="sz-toggle" aria-pressed={included} onClick={() => toggleService(id)}>
                                <span className="sz-toggle__box" aria-hidden="true" />
                                {included ? "Sunumda" : "Sunuma ekle"}
                            </button>
                        );
                    } else if (page.kind === "chapter" && page.categoryId) {
                        const categoryId = page.categoryId;
                        const category = deck.categories.find((c) => c.id === categoryId);
                        const count = category?.services.length ?? 0;
                        const chosen = category?.services.filter((s) => selected.has(s.id)).length ?? 0;
                        included = chosen > 0;
                        control = (
                            <button
                                type="button"
                                className="sz-toggle"
                                aria-pressed={chosen === count}
                                onClick={() => toggleCategory(categoryId)}>
                                <span className="sz-toggle__box" aria-hidden="true" />
                                {chosen === count ? `Kategorinin tümü seçili (${count})` : `Kategorinin tümünü ekle (${count})`}
                            </button>
                        );
                    } else {
                        control = (
                            <span className="sz-toggle is-locked">
                                <span className="sz-toggle__box" aria-hidden="true" />
                                Her PDF&apos;te var
                            </span>
                        );
                    }

                    const dimmed = selected.size > 0 && !included;
                    return (
                        <section key={page.key} className={`sz-page__item${dimmed ? " is-dimmed" : ""}`} aria-label={page.label}>
                            <div className="sz-page__head">
                                <span className="sz-page__label">
                                    Sayfa {pageNo} · <b>{page.label}</b>
                                </span>
                                {control}
                            </div>
                            <div className="sz-page__frame">
                                {page.node}
                            </div>
                        </section>
                    );
                })}
            </div>
        </article>
    );
}
