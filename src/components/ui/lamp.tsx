import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export default function LampDemo() {
    return (
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
                Build lamps <br /> the right way
            </motion.h1>
        </LampContainer>
    );
}

export const LampContainer = ({
    children,
    className,
    visualYOffset = 0,
    disableLine = false,
}: {
    children: React.ReactNode;
    className?: string;
    visualYOffset?: number;
    disableLine?: boolean;
}) => {
    const mouseX = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX }: React.MouseEvent) {
        const { left, width } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
    }

    const rotate = useSpring(useTransform(mouseX, [-800, 800], [-15, 15]), {
        stiffness: 50,
        damping: 20
    });

    // Subtle horizontal movement inverse to rotation for depth
    const x = useSpring(useTransform(mouseX, [-800, 800], [-20, 20]), {
        stiffness: 50,
        damping: 20
    });

    return (
        <div
            onMouseMove={onMouseMove}
            className={cn(
                "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark-maroon w-full z-0",
                className
            )}
        >
            <motion.div
                className="relative flex w-full flex-1 items-center justify-center isolate z-0 "
                style={{
                    scaleY: 1.25,
                    translateY: `${visualYOffset}rem`,
                    rotate,
                    x
                }}
            >
                <motion.div
                    initial={{ opacity: 0.5, width: "15rem" }}
                    whileInView={{ opacity: 1, width: "30rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute right-1/2 top-1/2 -translate-y-[7rem] h-[100rem] overflow-visible w-[60rem] bg-gradient-conic from-[#900a03] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                >
                    <div className="absolute  w-[100%] left-0 bg-dark-maroon h-40 bottom-0 z-20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                    <div className="absolute  w-40 h-[100%] left-0 bg-dark-maroon  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.5, width: "15rem" }}
                    whileInView={{ opacity: 1, width: "30rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute left-1/2 top-1/2 -translate-y-[7rem] h-[100rem] w-[60rem] bg-gradient-conic from-transparent via-transparent to-[#900a03] text-white [--conic-position:from_290deg_at_center_top]"
                >
                    <div className="absolute  w-40 h-[100%] right-0 bg-dark-maroon  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                    <div className="absolute  w-[100%] right-0 bg-dark-maroon h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>
                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#1a0202] blur-2xl"></div>
                <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                <div className="absolute inset-auto z-50 h-36 w-[58rem] -translate-y-1/2 rounded-full bg-[#900a03] opacity-50 blur-3xl"></div>
                <motion.div
                    initial={{ width: "20rem" }}
                    whileInView={{ width: "40rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-auto z-30 h-36 w-[40rem] -translate-y-[6rem] rounded-full bg-[#f87171] blur-2xl"
                ></motion.div>
                {!disableLine && (
                    <motion.div
                        initial={{ width: "30rem" }}
                        whileInView={{ width: "60rem" }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-auto z-50 h-0.5 w-[60rem] -translate-y-[7rem] bg-[#f87171] "
                    ></motion.div>
                )}

                <div className="absolute top-0 left-0 w-full h-[calc(50%-7rem)] bg-[#1a0202] z-40"></div>
            </motion.div>

            <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
                {children}
            </div>
        </div>
    );
};
