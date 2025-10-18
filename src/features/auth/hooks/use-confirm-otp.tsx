import { userConfirmOTP } from '@/entities/user/api/user-confirm-otp';
import { paths } from '@/shared/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useConfirmOTP = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userConfirmOTP,
    onSuccess: () => {
      toast.success('Вы успешно вошли в аккаунт');
      router.replace(paths.timer);
    },
  });
};
