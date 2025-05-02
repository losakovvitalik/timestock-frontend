import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authOTPFormSchema, AuthOTPFormSchemaType } from '../model/auth-otp-form-schema';

export interface UseAuthOTPFormParams {
  defaultValues?: Partial<AuthOTPFormSchemaType>;
}

export const useAuthOTPForm = ({ defaultValues }: UseAuthOTPFormParams) => {
  return useForm<AuthOTPFormSchemaType>({
    resolver: zodResolver(authOTPFormSchema),
    defaultValues,
  });
};
