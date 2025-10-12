import { $api } from '@/shared/api/base';

export interface UserConfirmOTPPayload {
  email: string;
  code: string;
}

export interface UserConfirmOTPResponse {
  user: {
    id: number;
    email: string;
  };
}

export const userConfirmOTP = async (data: UserConfirmOTPPayload) => {
  const res = await $api.post<UserConfirmOTPResponse>('/auth/confirm-otp', data);
  return res.data;
};
