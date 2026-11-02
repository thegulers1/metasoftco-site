"use client";

import { brands, type Brand } from "@/lib/brands";

export { brands, type Brand };

function BrandLogos() {
    return (
        <div className="flex shrink-0 items-center gap-12 pr-12">
            {brands.map((brand) => (
                <div key={brand.name} className="flex h-7 shrink-0 items-center justify-center">
                    <img
                        src={brand.src}
                        alt=""
                        aria-label={brand.name}
                        width={brand.width}
                        height={28}
                        className={`brand-ticker__logo h-7 max-w-none object-contain${brand.variant ? ` brand-ticker__logo--${brand.variant}` : ""}`}
                        style={{
                            width: brand.width,
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default function BrandStrip() {
    return (
        <div className="brand-ticker bg-[#0a0a0f]" aria-hidden="true">
            <div className="ticker__inner py-5">
                <BrandLogos />
                <BrandLogos />
                <BrandLogos />
                <BrandLogos />
            </div>
        </div>
    );
}
