import type { Metadata } from "next";
import Link from "next/link";
import { homeFontClassName } from "@/components/home/fonts";

export const metadata: Metadata = {
    title: "Page not found | MetasoftCo",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div
            className={homeFontClassName}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: "0 max(16px, 3vw)", background: "#050505", color: "#edeae3", fontFamily: "var(--mh-sans), system-ui, sans-serif" }}>
            <span style={{ fontFamily: "var(--mh-mono), monospace", fontSize: 12, letterSpacing: "0.08em", color: "#8a8780" }}>(404) — SAYFA BULUNAMADI · PAGE NOT FOUND</span>
            <h1 style={{ margin: 0, fontFamily: "var(--mh-display), sans-serif", fontWeight: 800, fontSize: "clamp(44px, 9vw, 170px)", lineHeight: 1, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
                404<span style={{ color: "#f2ff00" }}>.</span>
            </h1>
            <p style={{ margin: 0, maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: "#cfccc4" }}>
                Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. The page you requested is not available.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Link href="/" style={{ padding: "14px 22px", borderRadius: 99, background: "#f2ff00", color: "#050505", fontFamily: "var(--mh-mono), monospace", fontSize: 12, letterSpacing: "0.08em", textDecoration: "none" }}>ANA SAYFA ↗</Link>
                <Link href="/en" style={{ padding: "14px 22px", borderRadius: 99, border: "1px solid #edeae3", color: "#edeae3", fontFamily: "var(--mh-mono), monospace", fontSize: 12, letterSpacing: "0.08em", textDecoration: "none" }}>ENGLISH HOME</Link>
            </div>
        </div>
    );
}
