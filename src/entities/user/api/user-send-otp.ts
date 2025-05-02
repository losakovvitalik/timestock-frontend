import { $api } from '@/shared/lib/api';

export interface UserSendOTPPayload {
  email: string;
}

export const userSendOTP = async (data: UserSendOTPPayload) => {
  const res = await $api.post<{ status: 'ok' }>('/auth/send-otp', data);
  return res.data;
};
