"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    src: string;
    thumbnailTime?: number | null;
    fallbackPoster?: string | null;
    title?: string;
}

export default function VideoPlayer({ src, thumbnailTime, fallbackPoster, title }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Cloudinary thumbnail logic
    let poster = fallbackPoster || undefined;
    if (src.includes("res.cloudinary.com") && thumbnailTime !== null && thumbnailTime !== undefined) {
        // Example: https://res.cloudinary.com/demo/video/upload/dog.mp4
        // To get thumbnail at 4s: https://res.cloudinary.com/demo/video/upload/so_4/dog.jpg
        poster = src.replace("/video/upload/", `/video/upload/so_${thumbnailTime}/`).replace(/\.[^/.]+$/, ".jpg");
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch((err) => {
                            console.warn("Autoplay failed:", err);
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);

        return () => {
            observer.unobserve(video);
        };
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
