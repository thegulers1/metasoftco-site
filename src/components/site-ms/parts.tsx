import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * English product and brand words that contain a lowercase "i". Upper-cased
 * by CSS under lang="tr" they would gain a dot ("CHİLD", "ORİGİNS"), so they
 * are wrapped in lang="en" while Turkish words keep Turkish casing.
 */
const EN_WORDS = new Set([
    "child", "mirror", "strip", "style", "bike", "gift", "graffiti", "iris", "win", "interactive", "fashion",
    "magazine", "digital", "video", "studio", "origins", "rollic", "nivea", "haribo", "allianz", "adidas",
    "nesquik", "bioderma", "clinique", "wings", "dynavit", "persil", "waikiki", "rijk", "gliss", "asics",
    "commercial", "experience", "experiences", "activation", "activations", "live", "light", "sticker", "print",
    "pixel", "smile", "selfie", "click", "ticket", "visit", "film", "cinema", "virtual", "reality", "immersive",
    "kinetic", "spin", "wish", "with", "is", "it", "in", "his", "this", "your", "kiosk", "printing", "time",
    "line", "design", "engine", "mini", "mix", "nike", "bubble", "bubbles", "glitter", "spirit", "vision",
    "biofeedback", "rig", "fit", "kit", "inside", "spinner", "shine", "drive", "ride", "hit", "big", "bit",
    "office", "media", "social", "festival", "invitation", "check-in", "integration", "intelligence", "artificial",
    "minds", "mind", "skin", "fish", "pick", "pin", "tip", "hi", "hip", "chip", "flip", "mic", "music", "arcade",
    "silent", "sign", "signal", "fizik", "trivia", "quiz", "quizzes", "wheel", "wheels", "gifts",
]);

const isEnWord = (word: string) => EN_WORDS.has(word.toLowerCase().replace(/[^a-z-]/g, ""));

/** Text that CSS upper-cases: English words keep English casing on Turkish pages. */
export function MsCaps({ text }: { text: string }) {
    const parts = text.split(/(\s+)/);
    return (
        <>
            {parts.map((part, i) =>
                isEnWord(part) ? <span key={i} lang="en">{part}</span> : <Fragment key={i}>{part}</Fragment>
            )}
        </>
    );
}

/**
 * Server-safe building blocks of the October 2026 inner-page design. Client
 * pieces (clock, catalog, gallery, video) live in ./interactive.tsx.
 */

/**
 * Splits a headline into words that rise one after another. `accent` marks
 * words drawn in the accent colour: indexes, or "last" for the final word.
 * Lines are split on "\n". The visible text stays a plain heading for SEO.
 */
export function MsWords({ text, accent = [] }: { text: string; accent?: number[] | "last" }) {
    const lines = text.split("\n");
    const total = text.split(/\s+/).filter(Boolean).length;
    let i = 0;
    // Real spaces sit between the word masks so the heading reads as words to
    // crawlers and screen readers, not one run-together string.
    return (
        <>
            {lines.map((line, li) => (
                <span key={li} style={{ display: "block" }}>
                    {line.split(/\s+/).filter(Boolean).map((word, wi) => {
                        const index = i++;
                        const isAccent = accent === "last" ? index === total - 1 : accent.includes(index);
                        return (
                            <Fragment key={index}>
                                {wi > 0 && " "}
                                <span className="ms-w" lang={isEnWord(word) ? "en" : undefined}>
                                    <span className={isAccent ? "ms-acc" : undefined} style={{ ["--i" as string]: index } as CSSProperties}>
                                        {word}
                                    </span>
                                </span>
                            </Fragment>
                        );
                    })}
                    {li < lines.length - 1 && " "}
                </span>
            ))}
        </>
    );
}

export function MsSectionHead({
    title,
    meta,
    id,
    dot = true,
    as: Tag = "h2",
    small,
}: {
    title: ReactNode;
    meta?: ReactNode;
    id?: string;
    dot?: boolean;
    as?: "h2" | "h3";
    small?: boolean;
}) {
    return (
        <div className="ms-head" data-reveal>
            <Tag id={id} className={`ms-h2${small ? " ms-h2--sm" : ""}`}>
                {title}
                {/* A question or exclamation keeps its own mark instead of the accent dot. */}
                {dot && !(typeof title === "string" && /[?!.…]$/.test(title.trim())) && <span className="ms-acc">.</span>}
            </Tag>
            {meta && <span className="ms-mono">{meta}</span>}
        </div>
    );
}

/** Tilted accent band with a looping row of words. */
export function MsBand({ words }: { words: string[] }) {
    const group = (
        <div className="ms-band__group">
            {words.map((word, i) => <span key={i}>{word}</span>)}
        </div>
    );
    return (
        <div className="ms-band" aria-hidden="true">
            <div className="ms-band__track">
                {group}
                {group}
            </div>
        </div>
    );
}

export interface MsFaqItem {
    q: string;
    a: string;
}

/** Native details/summary: every answer is in the HTML for search engines. */
export function MsFaq({ items, firstOpen = true }: { items: MsFaqItem[]; firstOpen?: boolean }) {
    return (
        <div className="ms-faq">
            {items.map((item, index) => (
                <details key={`${index}-${item.q}`} open={firstOpen && index === 0}>
                    <summary data-cursor="+">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3>{item.q}</h3>
                    </summary>
                    <div>
                        {item.a.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                </details>
            ))}
        </div>
    );
}

export function MsSteps({ steps }: { steps: { title: string; copy: string }[] }) {
    return (
        <ol className="ms-steps">
            {steps.map((step, index) => (
                <li key={step.title} data-reveal style={{ ["--d" as string]: `${index * 0.1}s` } as CSSProperties}>
                    <span className="ms-steps__num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                </li>
            ))}
        </ol>
    );
}

export function MsFacts({ facts }: { facts: { term: string; value: string }[] }) {
    if (!facts.length) return null;
    return (
        <dl className="ms-facts">
            {facts.map((fact) => (
                <div key={fact.term}>
                    <dt>{fact.term}</dt>
                    <dd>{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}

export function MsCrumbs({ items }: { items: { href?: string; label: string }[] }) {
    return (
        <nav className="ms-crumbs ms-mono" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <span key={`${index}-${item.label}`} style={{ display: "contents" }}>
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {item.href ? (
                        <a href={item.href}><MsCaps text={item.label} /></a>
                    ) : (
                        <span aria-current="page"><MsCaps text={item.label} /></span>
                    )}
                </span>
            ))}
        </nav>
    );
}

/** Rich text from the editpanel, styled for the dark design. */
export function MsProse({ html, wide, className }: { html: string; wide?: boolean; className?: string }) {
    return (
        <div
            className={`ms-prose${wide ? " ms-prose--wide" : ""}${className ? ` ${className}` : ""}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

/**
 * Splits editor HTML at its h2/h3 headings into an intro and titled
 * sections, so a service description can render as numbered cards. When the
 * HTML has fewer than two headings it is returned whole as the intro.
 */
export function splitHtmlSections(html: string): { intro: string; sections: { title: string; id?: string; html: string }[] } {
    const re = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
    const matches = [...html.matchAll(re)];
    if (matches.length < 2) return { intro: html, sections: [] };
    const intro = html.slice(0, matches[0].index).trim();
    const sections = matches.map((match, i) => {
        const start = (match.index ?? 0) + match[0].length;
        const end = i + 1 < matches.length ? matches[i + 1].index ?? html.length : html.length;
        const id = match[2].match(/id="([^"]+)"/)?.[1];
        const title = decodeEntities(match[3].replace(/<[^>]+>/g, "")).trim();
        return { title, id, html: html.slice(start, end).trim() };
    });
    return { intro, sections };
}

/** Decodes the handful of entities editor HTML puts in headings. */
export function decodeEntities(text: string) {
    return text
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;|&#x27;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}

export const tiltFor = (index: number) => `${[-1.2, 0.8, -0.5, 1.1, -0.9, 0.6][index % 6]}deg`;
