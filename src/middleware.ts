import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// HTTP → HTTPS yönlendirmesi
export function middleware(request: NextRequest) {
    // Coolify + Hostinger ortamında HTTP trafiğini HTTPS'e yönlendir (301 permanent)
    const proto = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "");
    
    if (process.env.NODE_ENV === "production" && proto === "http") {
        const url = request.nextUrl.clone();
        url.protocol = "https:";
        return NextResponse.redirect(url, 301);
    }

    // Auth kontrolü (editpanel için)
    return withAuth({
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    })(request);
}

export const config = {
    matcher: ["/:path*"], // Tüm path'leri kontrol et
};
