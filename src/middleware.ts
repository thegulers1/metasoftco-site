import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function middlewareWithPathname(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", request.nextUrl.pathname);
    return response;
}

const authMiddleware = withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: "/login",
    },
});

// Write endpoints visitors legitimately call without an admin session.
const PUBLIC_API_WRITES = ["/api/auth", "/api/contact", "/api/quote-request", "/api/ai-chat"];
const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isProtectedApiWrite(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (!pathname.startsWith("/api/") || READ_METHODS.has(request.method)) return false;
    return !PUBLIC_API_WRITES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/editpanel")) {
        return (authMiddleware as unknown as (req: NextRequest) => ReturnType<typeof NextResponse.next>)(request);
    }
    // Admin API writes (content edits, deletes, uploads, translation) need a
    // signed-in session; the route handlers themselves do not check.
    if (isProtectedApiWrite(request) && !(await getToken({ req: request }))) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    return middlewareWithPathname(request);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
