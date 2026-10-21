/**
 * The homepage intro curtain plays once per browser session. Whether it plays
 * has to be known before first paint, otherwise returning visitors see the
 * curtain flash, so the root layout runs this as an inline <head> script on
 * full page loads. On client-side navigation to the homepage the component
 * calls it itself from a layout effect.
 *
 * Sets two attributes on <html>: `data-mh-js` on every page (JavaScript is
 * running, so scroll reveals may start hidden) and, on the homepages only,
 * `data-mh-intro` = "play" | "skip".
 */
export const HOME_INTRO_KEY = "mh-intro-seen";

export function applyHomeIntroFlags(force?: boolean) {
    const p = location.pathname.replace(/\/$/, "") || "/";
    const d = document.documentElement;
    // Every public page uses scroll reveals; only the homepages have the intro.
    d.setAttribute("data-mh-js", "1");
    if (!force && p !== "/" && p !== "/en") return;
    // The counting curtain is switched off (October 2026): it held the headline
    // back for ~3.5 s, and most B2B visitors land once. The markup and the
    // "play" path stay, so turning it back on is a one-line change here.
    d.setAttribute("data-mh-intro", "skip");
}

/** Self-contained source for the inline script; it must not reference module scope. */
export const homeIntroScript = `(${applyHomeIntroFlags.toString()})()`;
