import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
console.log(BACKEND_URL)
export const API_URL = BACKEND_URL + '/api';

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
