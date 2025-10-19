import { refreshAccessToken } from '@/shared/api/actions';
import { isTokenValid } from '@/shared/api/jwt';
import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = BACKEND_URL + '/api';

const PUBLIC_URLS = ['/auth/confirm-otp', '/auth/send-otp'];

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let token: string = '';
let tokenPromise: Promise<string> | undefined;

$api.interceptors.request.use(async (config) => {
  if (config.url && PUBLIC_URLS.includes(config.url)) {
    return config;
  }

  /** если токен истек - сбрасываем его */
  token = isTokenValid(token) ? token : '';

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (tokenPromise) {
      const token = await tokenPromise;
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      tokenPromise = refreshAccessToken();
      token = await tokenPromise;
      tokenPromise = undefined;
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
