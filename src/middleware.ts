import { withAuth } from "next-auth/middleware";
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

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/editpanel")) {
        return (authMiddleware as unknown as (req: NextRequest) => ReturnType<typeof NextResponse.next>)(request);
    }
    return middlewareWithPathname(request);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
