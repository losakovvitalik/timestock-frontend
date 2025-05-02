import { $api } from '@/shared/lib/api';

export interface userConfirmOTPPayload {
  email: string;
  code: string;
}

export interface userConfirmOTPResponse {
  jwt: string;
  user: {
    email: string;
  };
}

export const userConfirmOTP = async (data: userConfirmOTPPayload) => {
  const res = await $api.post<{ status: 'ok' }>('/auth/confirm-otp', data);
  return res.data;
};
