import { userSendOTP } from '@/entities/user/api/user-send-otp';
import { paths } from '@/shared/constants';
import { ApiError } from '@/shared/types/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useSendOtp = () => {
  const router = useRouter();

  const { mutate, isPending, ...rest } = useMutation({
    mutationFn: userSendOTP,
    onSuccess: (_, vars) => {
      router.push(`${paths.auth.code}?email=${vars.email}`);
    },
    onError: (err) => {
      let msg = 'Что-то пошло не так при авторизации';

      if (err instanceof AxiosError) {
        const response = err.response?.data as ApiError;
        const code = response.error.code;

        if (code === 'FAILED_SEND_EMAIL') {
          msg = 'Не удалось отправить email. Попробуйте позже';
        }
      }

      toast.error(msg);
    },
  });

  return {
    sendOTP: mutate,
    isSendOTPPending: isPending,
    ...rest,
  };
};
