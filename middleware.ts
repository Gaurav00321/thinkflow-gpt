import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we have a session
  const authCookie = request.cookies.get('user-session')
  
  // Check if we're trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!authCookie) {
      // Redirect to signin if there's no session
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  // If we're on signin and we have a session, redirect to dashboard
  if (request.nextUrl.pathname === '/signin' && authCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Paths that are always accessible
  const publicPaths = ['/', '/signin', '/api/auth/check']
  if (publicPaths.some(path => request.nextUrl.pathname === path)) {
    return NextResponse.next()
  }

  // Check if trying to access protected routes without auth
  if (!authCookie && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // If user is authenticated and tries to access signin page, redirect to dashboard
  if (authCookie && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
