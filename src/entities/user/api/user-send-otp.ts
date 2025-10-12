import { $api } from '@/shared/api/base';

export interface UserSendOTPPayload {
  email: string;
}

export const userSendOTP = async (data: UserSendOTPPayload) => {
  const res = await $api.post<{ status: 'ok' }>('/auth/send-otp', data);
  return res.data;
};
