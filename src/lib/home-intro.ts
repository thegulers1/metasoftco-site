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
    let seen = "0";
    try {
        seen = sessionStorage.getItem("mh-intro-seen") || "0";
    } catch {
        // Storage blocked (private mode, sandboxed preview): play the intro.
    }
    const skip = seen === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches;
    d.setAttribute("data-mh-intro", skip ? "skip" : "play");
}

/** Self-contained source for the inline script; it must not reference module scope. */
export const homeIntroScript = `(${applyHomeIntroFlags.toString()})()`;
