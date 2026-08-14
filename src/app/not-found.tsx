import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page not found | MetasoftCo",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-6 text-center text-white">
            <p className="text-sm text-white/70">The page you requested is not available.</p>
        </div>
    );
}
