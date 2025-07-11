import { paths } from '@/shared/constants';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useConfirmOTP = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const res = await signIn('credentials', {
        email: email,
        code: code,
        redirect: false,
      });

      if (res.error) {
        throw new Error();
      }
    },
    onSuccess: () => {
      toast.success('Вы успешно вошли в аккаунт');
      router.replace(paths.timer);
    },
  });
};
