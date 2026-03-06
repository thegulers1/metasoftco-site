"use client";

import { useState, useEffect } from "react";
import MediaLibrary from "@/components/editpanel/MediaLibrary";

export const dynamic = 'force-dynamic';

export default function MediaPage() {
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    // Otomatik olarak kütüphaneyi açık tutmak istiyoruz ya da buraya tam sayfa bir görünüm de koyabiliriz.
    // Ancak MediaLibrary componentimiz zaten modal olarak şık tasarlandığı için, 
    // bu sayfada onu tam ekran hissi verecek şekilde de kullanabiliriz.

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-black">Ortam Kütüphanesi</h1>
                    <p className="text-black/50 text-sm">Tüm medya dosyalarını buradan yönetebilirsiniz.</p>
                </div>
                <button
                    onClick={() => setIsLibraryOpen(true)}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Kütüphaneyi Aç
                </button>
            </div>

            <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-black/5 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mb-4 text-black/20">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-black mb-2">Medya Yönetimi</h2>
                <p className="text-black/40 max-w-xs mb-8">
                    Görselleri silmek, detaylarını görmek veya yeni dosya yüklemek için kütüphaneyi açın.
                </p>
                <button
                    onClick={() => setIsLibraryOpen(true)}
                    className="px-8 py-3 border-2 border-black font-bold rounded-2xl hover:bg-black hover:text-white transition-all transform active:scale-95"
                >
                    Kütüphaneye Git →
                </button>
            </div>

            <MediaLibrary
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onSelect={(url) => console.log("Selected from management page:", url)}
            />
        </div>
    );
}
