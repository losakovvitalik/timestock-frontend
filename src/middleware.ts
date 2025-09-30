import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { paths } from './shared/constants';

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  // Публичные ассеты
  if (
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest'
  ) {
    return;
  }

  const isAuthRoute = pathname === paths.auth.link || pathname === paths.auth.code;

  // Неавторизован — пускаем только на страницы аутентификации
  if (!req.auth && !isAuthRoute) {
    return NextResponse.redirect(new URL(paths.auth.link, origin));
  }

  // Авторизован — не даём ходить на страницы логина/кода, редиректим в приложение
  if (req.auth && isAuthRoute) {
    return NextResponse.redirect(new URL(paths.timer, origin));
  }
});

export const config = {
  // не трогаем api, как и раньше
  matcher: ['/((?!api/|_next/|favicon.ico|manifest.webmanifest).*)'],
};
