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

// The bare domain answered 200 with the same pages as www; Google had already
// folded it into www, so make that a real permanent redirect. The proxy keeps
// the original Host header, and local/preview hosts never match.
const APEX_HOST = "metasoftco.com";
const CANONICAL_ORIGIN = "https://www.metasoftco.com";

export default async function middleware(request: NextRequest) {
    const host = request.headers.get("host")?.split(":")[0].toLowerCase();
    if (host === APEX_HOST) {
        const { pathname, search } = request.nextUrl;
        return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 301);
    }
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
