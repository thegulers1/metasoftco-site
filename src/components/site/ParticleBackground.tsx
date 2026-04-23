"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    vx: number;
    vy: number;
}

export default function ParticleBackground({ fixed = false }: { fixed?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 120;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const r = Math.random();
                let size, opacity;
                if (r < 0.15) {
                    size = Math.random() * 2 + 2;
                    opacity = Math.random() * 0.4 + 0.2;
                } else if (r < 0.45) {
                    size = Math.random() * 1.5 + 1;
                    opacity = Math.random() * 0.25 + 0.1;
                } else {
                    size = Math.random() * 0.8 + 0.3;
                    opacity = Math.random() * 0.12 + 0.05;
                }
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size,
                    opacity,
                    vx: (Math.random() - 0.5) * size * 0.15,
                    vy: (Math.random() - 0.5) * size * 0.15,
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = "#0d0d0d";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                else if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                else if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220,38,38,${p.opacity})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={fixed
                ? "fixed inset-0 z-0 pointer-events-none"
                : "absolute inset-0 z-0 bg-[#0d0d0d]"
            }
        />
    );
}
