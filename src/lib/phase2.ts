export const PHASE_2_PROTOTYPE_PATHS = new Set([
    "/en",
    "/en/services/ai-event-solutions/ai-photobooth",
    "/en/projects/tavuk-dunyasi-x-ai-photo",
]);

export function isPhase2PrototypePath(pathname: string | null) {
    if (!pathname) return false;
    const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    return PHASE_2_PROTOTYPE_PATHS.has(normalized);
}
