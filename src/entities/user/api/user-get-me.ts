import { $api } from '@/shared/lib/api';
import { UserDTO } from '../model/types';

export interface UserGetMeResponse extends UserDTO {}

export async function userGetMe() {
  const res = await $api.get<UserGetMeResponse>('/users/me');
  return res.data;
}
