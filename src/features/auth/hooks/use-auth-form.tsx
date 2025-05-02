import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authFormSchema, AuthFormSchemaType } from '../model/auth-form-schema';

const useAuthForm = () => {
  return useForm<AuthFormSchemaType>({
    resolver: zodResolver(authFormSchema),
  });
};

export { useAuthForm };
