/**
 * Photo layout for a service slide. Every picture keeps its own aspect ratio:
 * nothing is cropped and nothing is letterboxed. Instead of pouring photos
 * into fixed boxes, the block is built from their ratios — a portrait lead
 * photo stands full height with the gallery stacked beside it, a landscape one
 * runs wide with the gallery in a row beneath — and the text takes the rest.
 *
 * All numbers are in cqw (1% of the slide width); the slide is 100 × 56.25.
 */

export type MediaItem = { url: string; x: number; y: number; w: number; h: number };
export type MediaLayout = { w: number; h: number; items: MediaItem[] };
export type MediaSource = { url: string; ratio: number | null };

/** Height available between the slide's top margin and its footer. */
export const MEDIA_ZONE_HEIGHT = 45;
/** Widest the photo block may grow; leaves the text column at least ~31cqw. */
const MAX_WIDTH = 57;
const GAP = 1;
/** A gallery photo smaller than this on its short side reads as clutter, not content. */
const MIN_THUMB_SIDE = 7;
/** Used when a photo's size could not be read; the box then crops slightly. */
const FALLBACK_RATIO = 4 / 3;

const round = (n: number) => Math.round(n * 100) / 100;

function single(main: MediaSource, r: number): MediaLayout {
    const w = Math.min(MAX_WIDTH, MEDIA_ZONE_HEIGHT * r);
    const h = w / r;
    return { w, h, items: [{ url: main.url, x: 0, y: 0, w, h }] };
}

/** Lead photo on top, gallery in one justified row beneath it. */
function rows(main: MediaSource, r: number, thumbs: MediaSource[], ratios: number[]): MediaLayout {
    const n = thumbs.length;
    const sum = ratios.reduce((a, b) => a + b, 0);
    const gaps = GAP * (n - 1);
    // Solve for the width at which lead + gap + gallery row is exactly the zone height.
    const w = Math.min(MAX_WIDTH, (MEDIA_ZONE_HEIGHT - GAP + gaps / sum) / (1 / r + 1 / sum));
    const mainH = w / r;
    const rowH = (w - gaps) / sum;
    let x = 0;
    const items: MediaItem[] = [{ url: main.url, x: 0, y: 0, w, h: mainH }];
    thumbs.forEach((thumb, i) => {
        const tw = rowH * ratios[i];
        items.push({ url: thumb.url, x, y: mainH + GAP, w: tw, h: rowH });
        x += tw + GAP;
    });
    return { w, h: mainH + GAP + rowH, items };
}

/** Lead photo on the left at full height, gallery stacked in a column beside it. */
function columns(main: MediaSource, r: number, thumbs: MediaSource[], ratios: number[]): MediaLayout {
    const n = thumbs.length;
    const inv = ratios.reduce((a, b) => a + 1 / b, 0);
    const gaps = GAP * (n - 1);
    const widthAt = (h: number) => h * r + GAP + (h - gaps) / inv;
    let h = MEDIA_ZONE_HEIGHT;
    if (widthAt(h) > MAX_WIDTH) h = (MAX_WIDTH - GAP + gaps / inv) / (r + 1 / inv);
    const mainW = h * r;
    const colW = (h - gaps) / inv;
    let y = 0;
    const items: MediaItem[] = [{ url: main.url, x: 0, y: 0, w: mainW, h }];
    thumbs.forEach((thumb, i) => {
        const th = colW / ratios[i];
        items.push({ url: thumb.url, x: mainW + GAP, y, w: colW, h: th });
        y += th + GAP;
    });
    return { w: mainW + GAP + colW, h, items };
}

/** Bigger photos win; the lead photo counts double so it stays the hero. */
function score(layout: MediaLayout) {
    return layout.items.reduce((sum, item, i) => sum + item.w * item.h * (i === 0 ? 2 : 1), 0);
}

function usable(layout: MediaLayout) {
    return layout.items.slice(1).every((item) => Math.min(item.w, item.h) >= MIN_THUMB_SIDE);
}

export function layoutMedia(main: MediaSource, gallery: MediaSource[]): MediaLayout {
    const r = main.ratio ?? FALLBACK_RATIO;
    // Drop gallery photos from the end until what remains can be shown at a decent size.
    for (let n = Math.min(gallery.length, 3); n > 0; n--) {
        const thumbs = gallery.slice(0, n);
        const ratios = thumbs.map((thumb) => thumb.ratio ?? FALLBACK_RATIO);
        const candidates = [rows(main, r, thumbs, ratios), columns(main, r, thumbs, ratios)].filter(usable);
        if (candidates.length) {
            const best = candidates.sort((a, b) => score(b) - score(a))[0];
            // More photos must not shrink the lead photo into a thumbnail itself.
            if (best.items[0].w * best.items[0].h >= 0.45 * single(main, r).w * single(main, r).h) return finish(best);
        }
    }
    return finish(single(main, r));
}

function finish(layout: MediaLayout): MediaLayout {
    return {
        w: round(layout.w),
        h: round(layout.h),
        items: layout.items.map((item) => ({ url: item.url, x: round(item.x), y: round(item.y), w: round(item.w), h: round(item.h) })),
    };
}
