"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
    id: string;
    url: string;
    fileName: string | null;
    fileType: string | null;
    folder: string | null;
    createdAt: string;
}

interface MediaLibraryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentUrl?: string | null;
}

export default function MediaLibrary({
    isOpen,
    onClose,
    onSelect,
    currentUrl
}: MediaLibraryProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen]);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/media");
            if (res.ok) {
                const data = await res.json();
                console.log('✅ Ortam Kütüphanesi - Toplam medya:', data.length);
                console.log('📁 Medya listesi:', data);
                setMedia(data);
            } else {
                console.error('❌ Medya yüklenemedi:', await res.text());
            }
        } catch (error) {
            console.error("Failed to fetch media:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Bu görseli kalıcı olarak silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMedia(media.filter(item => item.id !== id));
                if (selectedId === id) setSelectedId(null);
            }
        } catch (error) {
            console.error("Failed to delete media:", error);
        }
    };

    const filteredMedia = media.filter(item =>
        item.fileName?.toLowerCase().includes(search.toLowerCase()) ||
        item.folder?.toLowerCase().includes(search.toLowerCase())
    );

    const selectedMedia = media.find(item => item.id === selectedId);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-4 md:inset-10 bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex items-center justify-between bg-white">
                            <div>
                                <h2 className="text-xl font-bold text-black">Ortam Kütüphanesi</h2>
                                <p className="text-sm text-black/40">Daha önce yüklenen görsellerden seçin</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                            {/* Main Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                <div className="mb-6 flex gap-4">
                                    <div className="relative flex-1">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Görsel veya klasör ara..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                                        />
                                    </div>
                                    <button
                                        onClick={fetchMedia}
                                        className="p-2 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
                                    >
                                        <svg className={`w-5 h-5 text-black/60 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>

                                {loading ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {[...Array(10)].map((_, i) => (
                                            <div key={i} className="aspect-square bg-black/5 animate-pulse rounded-2xl" />
                                        ))}
                                    </div>
                                ) : filteredMedia.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {filteredMedia.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => setSelectedId(item.id)}
                                                className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${selectedId === item.id
                                                        ? "border-black ring-4 ring-black/5"
                                                        : "border-transparent hover:border-black/20"
                                                    }`}
                                            >
                                                <img
                                                    src={item.url}
                                                    alt={item.fileName || "Media"}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => handleDelete(e, item.id)}
                                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {selectedId === item.id && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-64 flex flex-col items-center justify-center text-black/30">
                                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p>Görsel bulunamadı</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="w-80 border-l bg-black/[0.02] p-6 hidden lg:flex flex-col">
                                {selectedMedia ? (
                                    <>
                                        <div className="aspect-video rounded-xl overflow-hidden bg-black/5 mb-6">
                                            <img
                                                src={selectedMedia.url}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Dosya Adı</label>
                                                <p className="text-sm font-medium text-black break-all">{selectedMedia.fileName || "Bilinmiyor"}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Yükleme Tarihi</label>
                                                <p className="text-sm font-medium text-black">
                                                    {new Date(selectedMedia.createdAt).toLocaleDateString('tr-TR')}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Tür</label>
                                                <p className="text-sm font-medium text-black uppercase">{selectedMedia.fileType?.split('/')[1] || "Bilinmiyor"}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Konum</label>
                                                <p className="text-xs font-mono text-black/50 break-all">{selectedMedia.url}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                onSelect(selectedMedia.url);
                                                onClose();
                                            }}
                                            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
                                        >
                                            Bu Görseli Kullan
                                        </button>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-4 text-black/20">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-black/30">Detayları görmek ve seçmek için bir görsele tıklayın</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Footer Action */}
                        <div className="p-4 border-t bg-white lg:hidden">
                            <button
                                disabled={!selectedId}
                                onClick={() => {
                                    if (selectedMedia) {
                                        onSelect(selectedMedia.url);
                                        onClose();
                                    }
                                }}
                                className="w-full py-3 bg-black text-white rounded-xl font-medium disabled:opacity-30 transition-opacity"
                            >
                                Seçili Görseli Kullan
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
