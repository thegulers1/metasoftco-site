"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface InstagramPost {
    id: string;
    mediaUrl: string;
    permalink: string;
    caption?: string;
    mediaType: string;
    thumbnailUrl?: string;
}

export default function InstagramFeed() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20 opacity-50">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (posts.length === 0) return null;

    return (
        <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center p-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white w-full h-full">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
                        @metasoftco
                    </h3>
                </div>
                <a
                    href="https://instagram.com/metasoftco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                >
                    Takip Et →
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {posts.map((post, index) => (
                    <motion.a
                        key={post.id}
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-white/5"
                    >
                        <img
                            src={post.mediaType === "VIDEO" ? (post.thumbnailUrl || post.mediaUrl) : post.mediaUrl}
                            alt={post.caption || "Instagram Post"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white w-6 h-6">
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
