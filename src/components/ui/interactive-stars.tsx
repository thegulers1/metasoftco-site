"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./star-button.module.css"; // Reuse the SVG class from star button style if possible, or just inline SVG

export function InteractiveStars({ className }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // Calculate normalized mouse position (-1 to 1)
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;
            mouseX.set(x * 100); // Scale movement range
            mouseY.set(y * 100);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const Star = ({
        className,
        moveFactor = 1,
        size = 20,
        initialTop,
        initialLeft,
        delay = 0
    }: {
        className?: string;
        moveFactor?: number;
        size?: number;
        initialTop: string;
        initialLeft: string;
        delay?: number;
    }) => {
        const x = useTransform(springX, (val) => val * moveFactor);
        const y = useTransform(springY, (val) => val * moveFactor);

        return (
            <motion.div
                style={{ x, y, top: initialTop, left: initialLeft, width: size }}
                className={cn("absolute pointer-events-none z-0", className)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + delay, duration: 1 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    version="1.1"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 784.11 815.53"
                    className="w-full h-full drop-shadow-[0_0_8px_rgba(255,253,239,0.5)]"
                >
                    <defs></defs>
                    <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                            fill="#fffdef"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                    </g>
                </svg>
            </motion.div>
        );
    };

    return (
        <div ref={ref} className={cn("absolute inset-0 pointer-events-none overflow-visible", className)}>
            {/* Scattered Stars around the center area */}
            <Star initialTop="20%" initialLeft="20%" moveFactor={-0.5} size={25} delay={0.1} />
            <Star initialTop="15%" initialLeft="75%" moveFactor={0.8} size={15} delay={0.2} />
            <Star initialTop="40%" initialLeft="10%" moveFactor={-1.2} size={10} delay={0.3} />
            <Star initialTop="35%" initialLeft="85%" moveFactor={1.5} size={20} delay={0.4} />
            <Star initialTop="60%" initialLeft="15%" moveFactor={-0.8} size={18} delay={0.2} />
            <Star initialTop="55%" initialLeft="80%" moveFactor={0.6} size={12} delay={0.5} />

            {/* Closer to properties/center */}
            <Star initialTop="-10%" initialLeft="40%" moveFactor={0.3} size={14} delay={0.6} />
            <Star initialTop="80%" initialLeft="60%" moveFactor={-0.4} size={16} delay={0.7} />

            {/* Far Sides - Extended Distribution */}
            <Star initialTop="30%" initialLeft="-5%" moveFactor={0.9} size={18} delay={0.4} />
            <Star initialTop="70%" initialLeft="-12%" moveFactor={-0.6} size={12} delay={0.5} />
            <Star initialTop="10%" initialLeft="105%" moveFactor={-0.7} size={22} delay={0.6} />
            <Star initialTop="50%" initialLeft="110%" moveFactor={0.8} size={14} delay={0.7} />
            <Star initialTop="85%" initialLeft="95%" moveFactor={-0.5} size={10} delay={0.3} />
            <Star initialTop="-5%" initialLeft="90%" moveFactor={0.4} size={16} delay={0.8} />
            <Star initialTop="25%" initialLeft="-20%" moveFactor={-0.8} size={20} delay={0.2} />
        </div>
    );
}
