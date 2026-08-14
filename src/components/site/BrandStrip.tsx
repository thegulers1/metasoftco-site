"use client";

type Brand = {
    name: string;
    src: string;
    width: number;
    variant?: "original" | "screen";
};

const brands: Brand[] = [
    {
        name: "Mercedes-Benz",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Mercedes-Benz_Logo_2010.svg",
        width: 126,
    },
    {
        name: "Akbank",
        src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Akbank_logo.svg",
        width: 110,
    },
    { name: "Adidas", src: "https://cdn.simpleicons.org/adidas/white", width: 92 },
    {
        name: "DeFacto",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/DeFacto_logo.svg",
        width: 112,
    },
    {
        name: "Samsung",
        src: "/brands/samsung-logo.png",
        width: 150,
        variant: "original",
    },
    {
        name: "Turkcell",
        src: "https://ffo3gv1cf3ir.merlincdn.net/SiteAssets/Bireysel/Navigasyon/turkcell-logo.png?20260814_03-144726",
        width: 28,
    },
    { name: "Red Bull", src: "https://cdn.simpleicons.org/redbull/white", width: 100 },
    {
        name: "Nivea",
        src: "/brands/nivea-logo.png",
        width: 42,
        variant: "original",
    },
    {
        name: "Ray-Ban",
        src: "/brands/rayban-logo.png",
        width: 64,
    },
    {
        name: "Pegasus",
        src: "/brands/pegasus-logo.png",
        width: 110,
        variant: "screen",
    },
    { name: "Vodafone", src: "https://cdn.simpleicons.org/vodafone/white", width: 112 },
    {
        name: "Haribo",
        src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/HARIBO_Logo.svg",
        width: 98,
    },
];

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
