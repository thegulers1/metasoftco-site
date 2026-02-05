"use client";

import { useState, useEffect, useCallback } from "react";

interface GalleryLightboxProps {
    images: string[];
    title: string;
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = "auto";
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goToNext();
            if (e.key === "ArrowLeft") goToPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, goToNext, goToPrev]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 select-none">
                {images.map((imageUrl, index) => (
                    <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative overflow-hidden group cursor-pointer rounded-xl outline-none focus:outline-none select-none touch-none"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        tabIndex={-1}
                    >
                        <img
                            src={imageUrl}
                            alt={`${title} - Örnek ${index + 1}`}
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-95 pointer-events-none select-none"
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                        }}
                        className="absolute left-4 z-10 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="relative z-10 max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`${title} - Örnek ${currentIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-4 z-10 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
