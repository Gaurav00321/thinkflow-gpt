import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Enforce non-www canonicalization globally
    if (url.hostname.startsWith('www.')) {
        // If the hostname starts with "www.", strip it.
        const newHostname = url.hostname.replace(/^www\./, '');
        return NextResponse.redirect(`https://${newHostname}${url.pathname}`, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
