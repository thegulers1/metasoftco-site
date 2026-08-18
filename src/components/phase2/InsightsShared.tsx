import { Fragment, type ReactNode } from "react";
import type { Phase2Locale } from "@/lib/phase2";

const dateLocales: Record<Phase2Locale, string> = { tr: "tr-TR", en: "en-US" };

/** Long-form publication date, or null when the post was never dated. */
export function formatInsightDate(value: Date | string | null | undefined, locale: Phase2Locale) {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(dateLocales[locale], { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Reading time from editor HTML. Tags are stripped before counting so markup
 * weight never inflates the estimate, and the floor is one minute.
 */
export function insightReadMinutes(html: string | null | undefined) {
    if (!html) return null;
    const words = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim().split(/\s+/).filter(Boolean).length;
    if (!words) return null;
    return Math.max(1, Math.round(words / 200));
}

/**
 * The mono kicker above every article title. Items are emitted as flat
 * siblings so the row's flex gap spaces the slashes evenly, whichever of the
 * three fields a post actually carries.
 */
export function P2InsightMeta({ lead, date, topic }: { lead?: string; date?: string | null; topic?: string | null }) {
    const items = [
        lead && { key: "lead", node: lead },
        date && { key: "date", node: date },
        topic && { key: "topic", node: <span className="p2-insight-meta__topic">{topic}</span> },
    ].filter(Boolean) as { key: string; node: ReactNode }[];

    if (items.length === 0) return null;

    return (
        <span className="p2-insight-meta">
            {items.map((item, index) => (
                <Fragment key={item.key}>
                    {index > 0 && <span className="p2-insight-meta__sep" aria-hidden="true">/</span>}
                    <span>{item.node}</span>
                </Fragment>
            ))}
        </span>
    );
}
