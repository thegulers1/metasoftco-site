"use client";

export type Brand = {
    name: string;
    src: string;
    width: number;
    variant?: "original" | "screen";
};

export const brands: Brand[] = [
    {
        name: "Mercedes-Benz",
        src: "/brands/mercedes-benz-logo.svg",
        width: 126,
    },
    {
        name: "Akbank",
        src: "/brands/akbank-logo.svg",
        width: 110,
    },
    { name: "Adidas", src: "/brands/adidas-logo.svg", width: 92 },
    {
        name: "DeFacto",
        src: "/brands/defacto-logo.svg",
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
        src: "/brands/turkcell-logo.png",
        width: 28,
    },
    { name: "Red Bull", src: "/brands/redbull-logo.svg", width: 100 },
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
    { name: "Vodafone", src: "/brands/vodafone-logo.svg", width: 112 },
    // From Wikimedia Commons (October 2026); recoloured to white by the page's CSS filter.
    { name: "Türk Telekom", src: "/brands/turk-telekom-logo.svg", width: 112 },
    { name: "TCMB", src: "/brands/tcmb-logo.svg", width: 140 },
    { name: "Allianz", src: "/brands/allianz-logo.svg", width: 112 },
    { name: "A101", src: "/brands/a101-logo.svg", width: 94 },
    { name: "Asics", src: "/brands/asics-logo.svg", width: 100 },
    {
        name: "Haribo",
        src: "/brands/haribo-logo.svg",
        width: 98,
    },
    // Logos cut from the /sunum references slide (public/sunum/referanslar.png); already white.
    { name: "Enerjisa", src: "/brands/enerjisa-logo.png", width: 136 },
    { name: "LC Waikiki", src: "/brands/lc-waikiki-logo.png", width: 193 },
    { name: "Eczacıbaşı", src: "/brands/eczacibasi-logo.png", width: 120 },
    { name: "Persil", src: "/brands/persil-logo.png", width: 83 },
    { name: "BSH", src: "/brands/bsh-logo.png", width: 94 },
    { name: "Castrol", src: "/brands/castrol-logo.png", width: 126 },
    { name: "MG", src: "/brands/mg-logo.png", width: 28 },
    { name: "Jack & Jones", src: "/brands/jack-jones-logo.png", width: 251 },
    { name: "Clinique", src: "/brands/clinique-logo.png", width: 107 },
    { name: "Origins", src: "/brands/origins-logo.png", width: 36 },
    { name: "Bioderma", src: "/brands/bioderma-logo.png", width: 147 },
    { name: "Schwarzkopf Gliss", src: "/brands/schwarzkopf-gliss-logo.png", width: 37 },
    { name: "Dr.Jart+", src: "/brands/dr-jart-logo.png", width: 136 },
    { name: "Anadolu Hayat Emeklilik", src: "/brands/anadolu-hayat-emeklilik-logo.png", width: 48 },
    { name: "Axess Wings", src: "/brands/axess-wings-logo.png", width: 74 },
    { name: "Tavuk Dünyası", src: "/brands/tavuk-dunyasi-logo.png", width: 204 },
    { name: "Espressolab", src: "/brands/espressolab-logo.png", width: 113 },
    { name: "Corny", src: "/brands/corny-logo.png", width: 67 },
    { name: "Dynavit", src: "/brands/dynavit-logo.png", width: 62 },
    { name: "Rijk Zwaan", src: "/brands/rijk-zwaan-logo.png", width: 31 },
    { name: "Stradesco", src: "/brands/stradesco-logo.png", width: 24 },
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
