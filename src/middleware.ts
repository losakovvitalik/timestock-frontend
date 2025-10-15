import { paths } from '@/shared/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Маршруты, куда пускаем без проверки
const PUBLIC_PATHS = [paths.auth.link, paths.auth.code];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const hasRefresh = req.cookies.get('strapi_up_refresh');

  if (!hasRefresh) {
    const url = req.nextUrl.clone();
    url.pathname = paths.auth.link;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
