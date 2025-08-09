import { USE_USER_STORAGE_KEY } from '@/entities/user/hooks/use-user';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { paths } from '../constants';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = BACKEND_URL + '/api';

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer`,
  },
});

$api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const session = await getSession();
    const token = session?.user.jwt;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

// // logout on 401
$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(USE_USER_STORAGE_KEY);
      await signOut({
        redirectTo: paths.auth.link,
      });
    }
    return Promise.reject(error);
  },
);
