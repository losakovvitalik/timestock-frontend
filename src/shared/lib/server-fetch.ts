import { auth } from '@/auth';
import { BACKEND_URL } from './api';

export const serverFetch = async <T = any>(url: string, init: RequestInit = {}): Promise<T> => {
  const session = await auth();

  // если пользователь авторизован,
  // добавляем его токен в хедеры
  if (session?.user) {
    init.headers = {
      Authorization: `Bearer ${session.user.jwt}`,
    };
  }

  const res = await fetch(BACKEND_URL + url, init);
  const json: T = await res.json();

  return json;
};
