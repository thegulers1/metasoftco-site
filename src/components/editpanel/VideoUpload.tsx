"use client";

import { useState, useRef, useEffect } from "react";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";

interface VideoUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    folder?: string;
    label?: string;
}

interface VideoMediaItem {
    id: string;
    url: string;
    fileName: string | null;
    folder: string | null;
    createdAt: string;
}

function VideoLibraryModal({ onClose, onSelect }: { onClose: () => void; onSelect: (url: string) => void }) {
    const [videos, setVideos] = useState<VideoMediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/media?type=video")
            .then(r => r.json())
            .then(data => { setVideos(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = videos.filter(v =>
        v.fileName?.toLowerCase().includes(search.toLowerCase()) ||
        v.folder?.toLowerCase().includes(search.toLowerCase())
    );

    const selected = videos.find(v => v.id === selectedId);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl z-10 w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-black">Video Kütüphanesi</h2>
                        <p className="text-sm text-black/40">Daha önce yüklenen videolardan seçin</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 border-b">
                    <input
                        type="text"
                        placeholder="Video ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 bg-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-video bg-black/5 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="h-48 flex flex-col items-center justify-center text-black/30">
                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p>Video bulunamadı</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-black ${
                                        selectedId === item.id
                                            ? "border-black ring-4 ring-black/10"
                                            : "border-transparent hover:border-black/20"
                                    }`}
                                >
                                    <video src={item.url} className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent">
                                        <p className="text-white text-xs truncate w-full">{item.fileName}</p>
                                    </div>
                                    {selectedId === item.id && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-white">
                    <button
                        disabled={!selected}
                        onClick={() => { if (selected) { onSelect(selected.url); onClose(); } }}
                        className="w-full py-3 bg-black text-white rounded-xl font-medium disabled:opacity-30 transition-opacity"
                    >
                        Seçili Videoyu Kullan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VideoUpload({
    value,
    onChange,
    folder = "videos",
    label = "Video",
}: VideoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [youtubeInput, setYoutubeInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const isYouTube = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

    const handleYoutubeSave = () => {
        const trimmed = youtubeInput.trim();
        if (!trimmed) return;
        onChange(trimmed);
        setYoutubeInput("");
    };

    const uploadFile = async (file: File) => {
        if (!file) return;

        // Dosya boyutu kontrolü (100MB)
        if (file.size > 100 * 1024 * 1024) {
            setError("Video boyutu 100MB'dan küçük olmalı");
            return;
        }

        // Video formatı kontrolü
        if (!file.type.startsWith("video/")) {
            setError("Lütfen video dosyası yükleyin");
            return;
        }

        setError(null);
        setUploading(true);
        setProgress(10);

        try {
            setProgress(30);
            const data = await uploadToCloudinary(file, `metasoftco/${folder}`);
            setProgress(100);
            onChange(data.url);
        } catch (err) {
            setError("Video yüklemesi başarısız oldu");
            console.error(err);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadFile(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await uploadFile(files[0]);
        }
    };

    return (
        <div>
            {libraryOpen && (
                <VideoLibraryModal
                    onClose={() => setLibraryOpen(false)}
                    onSelect={(url) => { onChange(url); setLibraryOpen(false); }}
                />
            )}

            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-black/70">
                    {label}
                </label>
                <button
                    type="button"
                    onClick={() => setLibraryOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black/60 bg-black/5 hover:bg-black/10 rounded-lg transition"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Ortam Kütüphanesi
                </button>
            </div>

            {/* YouTube URL girişi */}
            <div className="mb-3 flex gap-2">
                <input
                    type="text"
                    placeholder="YouTube linki yapıştır (youtube.com/watch, shorts, embed...)"
                    value={youtubeInput}
                    onChange={(e) => setYoutubeInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-black/5 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <button
                    type="button"
                    onClick={handleYoutubeSave}
                    disabled={!youtubeInput.trim()}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-30 transition"
                >
                    Ekle
                </button>
            </div>

            {value ? (
                <div className="relative">
                    {isYouTube(value) ? (
                        <div className="w-full rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                            <iframe
                                src={value.replace(/youtube\.com\/(watch\?v=|shorts\/)/, "youtube.com/embed/").replace("youtu.be/", "youtube.com/embed/")}
                                className="w-full h-full"
                                allowFullScreen
                                title="YouTube video"
                            />
                        </div>
                    ) : (
                        <video
                            src={value}
                            controls
                            className="w-full h-48 rounded-lg bg-black object-contain"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${uploading
                            ? "border-black/20 bg-black/5"
                            : isDragging
                                ? "border-blue-500 bg-blue-50/20 scale-[1.02]"
                                : "border-black/20 hover:border-black/40 hover:bg-black/5"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center w-full px-8">
                            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-black/50">Yükleniyor... {progress}%</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-black/50">
                                {isDragging ? "Video dosyasını buraya bırak" : "Tıkla veya sürükle-bırak"}
                            </p>
                            {!isDragging && (
                                <p className="text-xs text-black/30">MP4, MOV, WEBM (max 100MB)</p>
                            )}
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
