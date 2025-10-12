'use server';

import { paths } from '@/shared/constants';
import { env } from '@/shared/lib/env';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function refreshAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('strapi_up_refresh');

  try {
    const res = await axios.post<{ jwt: string }>(`${env.BACKEND_URL}/api/auth/refresh`, {
      refreshToken: refreshToken?.value,
    });

    const setCookieHeaders = res.headers['set-cookie'];

    // Устанавливаем cookies с maxAge = 1 неделя (в секундах)
    const oneWeekInSeconds = 7 * 24 * 60 * 60; // 604800 секунд

    if (setCookieHeaders) {
      setCookieHeaders.forEach((cookieHeader) => {
        // Парсим cookie header
        const [cookiePart, ...attributesParts] = cookieHeader.split(';');
        const [name, value] = cookiePart.split('=');

        // Извлекаем атрибуты
        const attributes: Record<string, string> = {};
        attributesParts.forEach((attr) => {
          const [key, val] = attr.trim().split('=');
          attributes[key.toLowerCase()] = val || 'true';
        });

        // Устанавливаем cookie с maxAge
        cookieStore.set(name.trim(), value, {
          path: attributes.path || '/',
          domain: attributes.domain === 'localhost' ? undefined : attributes.domain, // Next.js может иметь проблемы с domain=localhost
          sameSite: (attributes.samesite as 'lax' | 'strict' | 'none') || 'lax',
          httpOnly: attributes.httponly === 'true',
          secure: attributes.secure === 'true',
          maxAge: oneWeekInSeconds,
        });
      });
    }

    return res.data.jwt;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('err', err.response?.data);
    }
    redirect(paths.auth.link);
  }
}
