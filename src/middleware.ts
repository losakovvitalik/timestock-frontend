// middleware.ts
import { paths } from '@/shared/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Маршруты, куда пускаем без проверки
const PUBLIC_PATHS = [paths.auth.link, paths.auth.code];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function middleware(req: NextRequest) {
  console.log('test');
  const { pathname, search } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const hasRefresh = req.cookies.get('strapi_up_refresh');

  if (!hasRefresh) {
    const url = req.nextUrl.clone();
    url.pathname = paths.auth.link;
    url.searchParams.set('redirect', pathname + (search || ''));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ограничиваем области, чтобы не трогать статику и служебки
export const config = {
  matcher: [
    // всё, кроме _next, статики и файлов в корне
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
