"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    vx: number;
    vy: number;
    originalX: number;
    originalY: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 700;
        const connectionDistance = 100;
        const mouseRadius = 200;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                // Add layers for depth
                let size, opacity;
                const r = Math.random();
                if (r < 0.15) { // Büyük balonlar
                    size = Math.random() * 3 + 3; // 3-6px
                    opacity = Math.random() * 0.5 + 0.3; // 0.3 - 0.8
                } else if (r < 0.45) { // Orta balonlar
                    size = Math.random() * 2 + 1.5; // 1.5-3.5px
                    opacity = Math.random() * 0.3 + 0.15; // 0.15 - 0.45
                } else { // Küçük toz
                    size = Math.random() * 1 + 0.5; // 0.5-1.5px
                    opacity = Math.random() * 0.15 + 0.08; // 0.08 - 0.23
                }

                particles.push({
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    size,
                    opacity,
                    vx: (Math.random() - 0.5) * (size * 0.2), // Parallax move
                    vy: (Math.random() - 0.5) * (size * 0.2),
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Constant movement
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Mouse interaction
                if (mouse.current.active) {
                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseRadius) {
                        const force = (mouseRadius - distance) / mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        p.x -= Math.cos(angle) * force * (p.size * 4);
                        p.y -= Math.sin(angle) * force * (p.size * 4);
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 38, 38, ${p.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.active = true;
        };

        const handleMouseLeave = () => {
            mouse.current.active = false;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 bg-white"
        />
    );
}
