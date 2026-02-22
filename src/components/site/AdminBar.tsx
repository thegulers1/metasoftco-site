"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ─── Context ───────────────────────────────────────────────────────────────

interface AdminEditContextValue {
    editUrl: string | null;
    setEditUrl: (url: string | null) => void;
}

const AdminEditContext = createContext<AdminEditContextValue>({
    editUrl: null,
    setEditUrl: () => {},
});

// ─── URL Haritası ──────────────────────────────────────────────────────────

function getFallbackEditUrl(pathname: string): string {
    if (pathname === "/") return "/editpanel";
    if (pathname.startsWith("/hizmetler")) return "/editpanel/services";
    if (pathname.startsWith("/projeler") || pathname.startsWith("/isler")) return "/editpanel/projects";
    if (pathname.startsWith("/blog")) return "/editpanel/blog";
    if (pathname.startsWith("/iletisim")) return "/editpanel/contacts";
    return "/editpanel";
}

// ─── AdminBarProvider ──────────────────────────────────────────────────────

export function AdminBarProvider({ children }: { children: ReactNode }) {
    const [editUrl, setEditUrl] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const isAdmin = status === "authenticated" && !!session?.user;
    const resolvedEditUrl = editUrl ?? getFallbackEditUrl(pathname);

    return (
        <AdminEditContext.Provider value={{ editUrl, setEditUrl }}>
            {isAdmin && (
                <div
                    className="fixed top-0 inset-x-0 z-[9999] flex items-center justify-between px-4 text-white"
                    style={{ height: "32px", backgroundColor: "#1d2327", fontSize: "12px" }}
                >
                    {/* Sol: Admin Panel linki */}
                    <Link
                        href="/editpanel"
                        className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity font-medium"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Admin Panel
                    </Link>

                    {/* Orta: Düzenle butonu */}
                    <Link
                        href={resolvedEditUrl}
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-0.5 rounded text-white font-medium"
                    >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Bu Sayfayı Düzenle
                    </Link>

                    {/* Sağ: Kullanıcı + Çıkış */}
                    <div className="flex items-center gap-3 opacity-80">
                        <span className="hidden sm:inline">{session?.user?.name ?? session?.user?.email}</span>
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="hover:opacity-100 transition-opacity underline underline-offset-2"
                        >
                            Çıkış
                        </button>
                    </div>
                </div>
            )}
            {/* Spacer — bar yüksekliği kadar içeriği aşağı iter */}
            {isAdmin && <div style={{ height: "32px" }} />}
            {children}
        </AdminEditContext.Provider>
    );
}

// ─── AdminEditUrlSetter ────────────────────────────────────────────────────
// Server Component sayfalarında render edilir, context'e editUrl set eder.

export function AdminEditUrlSetter({ url }: { url: string }) {
    const { setEditUrl } = useContext(AdminEditContext);

    useEffect(() => {
        setEditUrl(url);
        return () => setEditUrl(null);
    }, [url, setEditUrl]);

    return null;
}
