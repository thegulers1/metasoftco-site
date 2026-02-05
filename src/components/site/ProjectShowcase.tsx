"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

const projects = [
    {
        id: 1,
        title: "Emilie Aubrey",
        category: "WEBSITE",
        image: "/projects/project-1.jpg",
        author: {
            name: "Studio Size",
            avatar: "/avatars/avatar-1.jpg",
        },
        href: "#",
    },
    {
        id: 2,
        title: "Ciridae",
        category: "WEBSITE",
        image: "/projects/project-2.jpg",
        author: {
            name: "newkid®",
            avatar: "/avatars/avatar-2.jpg",
        },
        href: "#",
    },
    {
        id: 3,
        title: "Chus Margallo Space",
        category: "WEBSITE",
        image: "/projects/project-3.jpg",
        author: {
            name: "Chusmargallo",
            avatar: "/avatars/avatar-3.jpg",
        },
        href: "#",
    },
];

export default function ProjectShowcase() {
    const { t } = useLanguage();

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pl-8 sm:pl-10 lg:pl-12">
                {/* Section Header */}
                <div className="mb-12 text-left">
                    <span className="text-xs uppercase tracking-widest text-black/50">
                        {t("Son Projeler", "Recent Projects")}
                    </span>
                    <h2
                        className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("PROJELER", "PROJECTS")}
                    </h2>
                    <p className="mt-3 text-base text-black/60">
                        {t("En son çalışmalarımızı keşfedin", "Discover our latest work")}
                    </p>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={project.href}
                            className="group block"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/5">
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10" />

                                {/* Placeholder gradient - replace with actual images */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-black">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        {project.category}
                                    </span>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                    <span className="text-[10px] uppercase tracking-widest text-white/70">
                                        {project.category}
                                    </span>
                                    <h3 className="mt-1 text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-white transition-colors">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </button>
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-white transition-colors">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 z-[5]" />
                            </div>

                            {/* Author Info */}
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-sm font-medium text-black">
                                    {project.title}
                                </span>
                                <span className="text-sm text-black/40">by</span>
                                <div className="flex items-center gap-2">
                                    <div className="relative h-6 w-6 overflow-hidden rounded-full bg-black/10">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#900a03] to-[#f87171]" />
                                    </div>
                                    <span className="text-sm font-medium text-black underline underline-offset-2">
                                        {project.author.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
