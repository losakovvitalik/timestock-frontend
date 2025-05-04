import { $api } from '@/shared/lib/api';
import { User } from '../model/types';

export interface UserGetMeResponse extends User {}

export async function userGetMe() {
  const res = await $api.get<UserGetMeResponse>('/users/me');
  return res.data;
}
