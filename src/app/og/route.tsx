import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "İnteraktif Etkinlik Deneyimleri & Yapay Zeka Çözümleri";
    const description = searchParams.get("desc") || "Etkinliklerde interaktif oyunlar, photobooth ve AI çözümleri";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#0a0a0a",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Red accent top bar */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "6px",
                        backgroundColor: "#900a03",
                    }}
                />

                {/* Red glow circle (decorative) */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        backgroundColor: "#900a03",
                        opacity: 0.07,
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        padding: "60px 80px",
                    }}
                >
                    {/* Logo / Brand */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: "#900a03",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span style={{ color: "#fff", fontSize: "24px", fontWeight: 700 }}>M</span>
                        </div>
                        <span
                            style={{
                                color: "#ffffff",
                                fontSize: "28px",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                            }}
                        >
                            METASOFTCO
                        </span>
                    </div>

                    {/* Main content */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div
                            style={{
                                color: "#ffffff",
                                fontSize: title.length > 60 ? "46px" : "56px",
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                maxWidth: "900px",
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                color: "#a0a0a0",
                                fontSize: "24px",
                                fontWeight: 400,
                                lineHeight: 1.4,
                                maxWidth: "800px",
                            }}
                        >
                            {description}
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ color: "#666", fontSize: "18px" }}>metasoftco.com</span>
                        <div
                            style={{
                                backgroundColor: "#900a03",
                                color: "#fff",
                                padding: "10px 24px",
                                borderRadius: "100px",
                                fontSize: "16px",
                                fontWeight: 600,
                            }}
                        >
                            İletişime Geç →
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
