"use client";

const brands = [
    "MERCEDES-BENZ", "AKBANK", "ADIDAS", "DEFACTO", "SAMSUNG",
    "TURKCELL", "RED BULL", "NIVEA", "RAY-BAN", "PEGASUS", "VODAFONE", "HARIBO",
];

export default function BrandStrip() {
    const text = brands.join("   ·   ");

    return (
        <div className="brand-ticker bg-[#0a0a0f]" aria-hidden="true">
            <div className="ticker__inner py-5">
                <span
                    className="pr-10 whitespace-nowrap text-[rgba(255,255,255,.32)] text-[12px] uppercase"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", letterSpacing: ".1em", fontWeight: 500 }}
                >
                    {text}
                </span>
                <span
                    className="pr-10 whitespace-nowrap text-[rgba(255,255,255,.32)] text-[12px] uppercase"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", letterSpacing: ".1em", fontWeight: 500 }}
                >
                    {text}
                </span>
            </div>
        </div>
    );
}
