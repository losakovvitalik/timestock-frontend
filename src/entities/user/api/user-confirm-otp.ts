import { $api } from '@/shared/lib/api';

export interface UserConfirmOTPPayload {
  email: string;
  code: string;
}

export interface UserConfirmOTPResponse {
  jwt: string;
  user: {
    id: string;
    email: string;
  };
}

export const userConfirmOTP = async (data: UserConfirmOTPPayload) => {
  const res = await $api.post<UserConfirmOTPResponse>('/auth/confirm-otp', data);
  return res.data;
};
