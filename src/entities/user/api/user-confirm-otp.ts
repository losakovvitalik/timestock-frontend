import { $api } from '@/shared/lib/api';

export interface userConfirmOTPPayload {
  email: string;
  code: string;
}

export interface userConfirmOTPResponse {
  jwt: string;
  user: {
    id: string;
    email: string;
  };
}

export const userConfirmOTP = async (data: userConfirmOTPPayload) => {
  const res = await $api.post<userConfirmOTPResponse>('/auth/confirm-otp', data);
  return res.data;
};
