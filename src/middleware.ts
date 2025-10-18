import { paths } from '@/shared/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const isAuthRoute = pathname === paths.auth.link || pathname === paths.auth.code;
  const hasRefresh = req.cookies.get('strapi_up_refresh');

  if (!hasRefresh && !isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = paths.auth.link;
    return NextResponse.redirect(url);
  }

  if (hasRefresh && isAuthRoute) {
    return NextResponse.redirect(new URL(paths.timer, origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
