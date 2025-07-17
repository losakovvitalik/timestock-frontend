import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from './auth';
import { paths } from './shared/constants';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await auth();

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (
    pathname === paths.auth.link ||
    pathname === paths.auth.code ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest'
  ) {
    if (session) {
      const loginUrl = new URL(paths.timer, origin);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL(paths.auth.link, origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/|favicon.ico).*)'],
};
