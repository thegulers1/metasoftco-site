"use client";

import { useEffect, useRef, useState } from "react";
import type { Proposal } from "@/lib/teklifler";

const SLIDE_W = 1920;
const SLIDE_H = 1080;

// Slaytlar Slides sunumundan geldiği gibi satır içi stillerle yazıldı; tuvalin
// varsayılanlarını (kenar boşluğu yok, border-box) burada sabitliyoruz.
const DECK_CSS = `
.tk-canvas section { position:relative; width:${SLIDE_W}px; height:${SLIDE_H}px; overflow:hidden; box-sizing:border-box; }
.tk-canvas *, .tk-canvas *::before, .tk-canvas *::after { box-sizing:border-box; margin:0; }
.tk-canvas img, .tk-canvas video { display:block; max-width:none; }
.tk-canvas h1, .tk-canvas h2, .tk-canvas h3 { font-weight:600; }
`;

function Slide({ html, index, total }: { html: string; index: number; total: number }) {
    const frame = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        const node = frame.current;
        if (!node) return;
        const update = () => setScale(node.clientWidth / SLIDE_W);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={frame}
            role="group"
            aria-roledescription="slayt"
            aria-label={`${index + 1} / ${total}`}
            className="relative w-full overflow-hidden rounded-[6px] bg-[#10110f] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            style={{ aspectRatio: `${SLIDE_W} / ${SLIDE_H}` }}
        >
            <div
                className="tk-canvas absolute left-0 top-0 origin-top-left"
                style={{ width: SLIDE_W, height: SLIDE_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

export function ProposalDeck({ proposal }: { proposal: Proposal }) {
    useEffect(() => {
        // Teklifin açıldığını bir kez bildir (aynı sekmede tekrar saymaz).
        const key = `tk-view:${proposal.slug}`;
        try {
            if (sessionStorage.getItem(key)) return;
            sessionStorage.setItem(key, "1");
        } catch {
            /* depolama kapalıysa yine de bildir */
        }
        fetch("/api/teklif-view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: proposal.slug, referrer: document.referrer || null }),
            keepalive: true,
        }).catch(() => {});
    }, [proposal.slug]);

    const { contact } = proposal;
    const whatsapp = `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Merhaba, ${proposal.title} hakkında görüşmek istiyoruz.`,
    )}`;

    return (
        <div className="min-h-screen bg-[#0b0c0a] font-['Geist',Arial,sans-serif] text-[#f1efe7]">
            <style dangerouslySetInnerHTML={{ __html: DECK_CSS }} />
            <header className="sticky top-0 z-20 border-b border-[#30312d] bg-[#0b0c0a]/90 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 md:px-8">
                    <div className="flex min-w-0 flex-col">
                        {/* Büyük harf elle yazılır: CSS uppercase Türkçe sayfada "Pfizer"ı "PFİZER" yapar. */}
                        <span className="font-['Geist_Mono',monospace] text-[11px] tracking-[0.18em] text-[#e94b35] md:text-xs">
                            {proposal.client.toLocaleUpperCase("en-US")} İÇİN HAZIRLANMIŞTIR
                        </span>
                        <span className="truncate font-['Inter_Tight',Arial,sans-serif] text-sm font-semibold md:text-base">
                            {proposal.title}
                        </span>
                    </div>
                    <nav className="flex items-center gap-2 text-sm">
                        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#e94b35] px-4 py-2 font-medium text-[#10110f] hover:bg-[#f0644f]">
                            WhatsApp
                        </a>
                        <a href={`tel:${contact.phone}`} className="hidden rounded-full border border-[#30312d] px-4 py-2 hover:border-[#a9a79c] sm:inline-block">
                            Ara
                        </a>
                        <a href={`mailto:${contact.email}`} className="hidden rounded-full border border-[#30312d] px-4 py-2 hover:border-[#a9a79c] md:inline-block">
                            E-posta
                        </a>
                    </nav>
                </div>
            </header>

            <main className="mx-auto flex max-w-[1600px] flex-col gap-4 px-2 py-4 md:gap-8 md:px-8 md:py-10">
                {proposal.slides.map((slide, index) => (
                    <Slide key={slide.id} html={slide.html} index={index} total={proposal.slides.length} />
                ))}
                <p className="px-2 pb-6 pt-2 text-center text-xs text-[#a9a79c] md:text-sm">
                    Bu sayfa {proposal.client} için hazırlanmıştır ve yalnızca bağlantıya sahip kişilerle paylaşılmıştır. · {contact.name} · {contact.email}
                </p>
            </main>
        </div>
    );
}
