import { $api } from '@/shared/lib/api';
import type { Data } from '@strapi/strapi';

export interface LoginUserPayload {
  email: string;
}

export const loginUser = async (data: LoginUserPayload) => {
  const res = await $api.post<Data.ContentType<'plugin::users-permissions.user'>>(
    '/auth/register-otp',
    data,
  );
  return res.data;
};
