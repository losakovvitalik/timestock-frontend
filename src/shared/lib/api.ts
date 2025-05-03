import axios from 'axios';
import { getSession } from 'next-auth/react';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = BACKEND_URL + '/api';

export const $api = axios.create({
  baseURL: API_URL,
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
// $api.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await signOut({
//         redirectTo: '/' + ADMIN_PREFIX + '/auth',
//       });
//     }
//     return Promise.reject(error);
//   },
// );
