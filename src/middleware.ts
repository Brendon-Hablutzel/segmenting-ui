import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AuthCookie } from './app/lib/types';

// 1. Specify protected and public routes
const protectedRoutes = ['/jobs', '/add-job', '/modules'];
const authRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (isProtectedRoute) {
    const cookie = (await cookies()).get('segmenting-auth')?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    const parsed = AuthCookie.safeParse(JSON.parse(cookie));

    if (!parsed.success) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isProtectedRoute && parsed.data.idToken.length === 0) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  if (isAuthRoute) {
    const cookie = (await cookies()).get('segmenting-auth')?.value;
    if (cookie) {
      const parsed = AuthCookie.safeParse(JSON.parse(cookie));

      if (parsed.success && parsed.data.idToken) {
        return NextResponse.redirect(new URL('/jobs', req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
