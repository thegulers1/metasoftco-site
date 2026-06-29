"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";

export interface InstagramPost {
    id: string;
    mediaUrl: string;
    permalink: string;
    caption?: string;
    mediaType: string;
    thumbnailUrl?: string;
}

export default function InstagramFeed() {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Only start fetching when the component enters the viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { rootMargin: "200px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        async function fetchPosts() {
            try {
                const response = await fetch("https://feeds.behold.so/bSMJyqgT2uDMBbrGiLtU");
                const data = await response.json();

                // Behold response structure is { username, posts: [] }
                if (data && data.posts && Array.isArray(data.posts)) {
                    setPosts(data.posts.slice(0, 6));
                }
            } catch (error) {
                console.error("Error fetching Instagram feed:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [visible]);

    if (!visible || loading) {
        return (
            <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-20 opacity-50">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (posts.length === 0) return null;

    return (
        <div ref={containerRef} className="mb-20">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-[18px]">
                    <div
                        className="w-[58px] h-[58px] rounded-full flex items-center justify-center p-[2.5px]"
                        style={{ background: "conic-gradient(from 210deg, #f0abfc, #e879f9, #fb923c, #facc15, #e879f9)" }}
                    >
                        <div
                            className="w-full h-full rounded-full bg-[#14141d] flex items-center justify-center text-white"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 17, fontWeight: 700 }}
                        >
                            M
                        </div>
                    </div>
                    <div>
                        <h3
                            className="text-white"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 22, fontWeight: 600 }}
                        >
                            @metasoftco
                        </h3>
                        <p
                            className="text-[rgba(255,255,255,.5)] mt-0.5"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 500 }}
                        >
                            {t("Sahne arkası, aktivasyonlar ve anlar", "Behind the scenes, activations and moments")}
                        </p>
                    </div>
                </div>
                <a
                    href="https://instagram.com/metasoftco"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-[26px] py-[13px] text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #e879f9)", fontFamily: "var(--font-manrope)" }}
                >
                    {t("Instagram'da Takip Et", "Follow on Instagram")}
                </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {posts.slice(0, 4).map((post, index) => (
                    <motion.a
                        key={post.id}
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
                    >
                        <img
                            src={post.mediaType === "VIDEO" ? (post.thumbnailUrl || post.mediaUrl) : post.mediaUrl}
                            alt={post.caption || "Instagram Post"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        {post.caption && (
                            <p
                                className="absolute bottom-2 left-3 right-3 text-white/90 text-xs line-clamp-1"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                {post.caption}
                            </p>
                        )}
                        <span className="absolute top-2.5 right-3 text-white/90 text-xs flex items-center gap-1">
                            ♥
                        </span>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
