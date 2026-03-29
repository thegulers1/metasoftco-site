"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    src: string;
    thumbnailTime?: number | null;
    fallbackPoster?: string | null;
    title?: string;
}

function getYouTubeId(url: string): string | null {
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtu\.be\/([^?&/]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function isShorts(url: string): boolean {
    return url.includes("/shorts/");
}

export default function VideoPlayer({ src, thumbnailTime, fallbackPoster, title }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const youtubeId = getYouTubeId(src);

    // YouTube embed
    if (youtubeId) {
        const vertical = isShorts(src);
        const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;

        return (
            <div
                className={
                    vertical
                        ? "relative mx-auto w-full max-w-[340px] rounded-2xl overflow-hidden shadow-xl"
                        : "relative w-full rounded-2xl overflow-hidden shadow-xl"
                }
                style={{ aspectRatio: vertical ? "9/16" : "16/9" }}
                aria-label={title}
            >
                <iframe
                    src={embedUrl}
                    title={title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full border-0"
                />
            </div>
        );
    }

    // Cloudinary / native video
    let poster = fallbackPoster || undefined;
    if (src.includes("res.cloudinary.com") && thumbnailTime !== null && thumbnailTime !== undefined) {
        poster = src.replace("/video/upload/", `/video/upload/so_${thumbnailTime}/`).replace(/\.[^/.]+$/, ".jpg");
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(video);
        return () => observer.unobserve(video);
    }, []);

    return (
        <div className="relative max-w-[800px] mx-auto rounded-2xl overflow-hidden shadow-xl bg-white flex justify-center border border-black/5">
            <video
                ref={videoRef}
                src={src}
                controls
                playsInline
                className="max-h-[75vh] w-full h-auto object-contain bg-white"
                poster={poster}
                aria-label={title}
            />
        </div>
    );
}
