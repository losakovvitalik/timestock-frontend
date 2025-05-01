import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export const API_URL = process.env.BACKEND_ENV + '/api';

export const $api = axios.create({
  baseURL: API_URL,
});

// $api.interceptors.request.use(async (config) => {
//   const session = await getSession();

//   config.headers['Authorization'] = `Bearer ${session?.accessToken}`;

//   return config;
// });

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
