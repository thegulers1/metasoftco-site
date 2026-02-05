import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    href,
    image,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    href?: string;
    image?: string | null;
}) => {
    const Content = () => (
        <>
            {image ? (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
                    <Image
                        src={image}
                        alt={typeof title === "string" ? title : ""}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                header
            )}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-400 text-xs">
                    {description}
                </div>
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={cn(
                    "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none p-4 bg-black/50 border border-white/10 backdrop-blur-sm justify-between flex flex-col space-y-4",
                    className
                )}
            >
                <Content />
            </Link>
        );
    }

    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none p-4 bg-black/50 border border-white/10 backdrop-blur-sm justify-between flex flex-col space-y-4",
                className
            )}
        >
            <Content />
        </div>
    );
};
