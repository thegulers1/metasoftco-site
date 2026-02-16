import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-black/10 p-6">
                <div className="mb-8">
                    <h1 className="text-lg font-bold text-black">MetasoftCo</h1>
                    <p className="text-xs text-black/50">Admin Panel</p>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/editpanel"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>
                    <Link
                        href="/editpanel/services"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Hizmetler
                    </Link>
                    <Link
                        href="/editpanel/categories"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Kategoriler
                    </Link>
                    <Link
                        href="/editpanel/blog"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Blog
                    </Link>
                    <Link
                        href="/editpanel/projects"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Projeler
                    </Link>
                    <Link
                        href="/editpanel/media"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Ortam
                    </Link>
                    <Link
                        href="/editpanel/contacts"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        İletişim
                    </Link>
                </nav>

                {/* User Info - Static for now */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black truncate">
                                Admin
                            </p>
                            <p className="text-xs text-black/50 truncate">
                                admin@metasoftco.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">{children}</main>
        </div>
    );
}
