import { userConfirmOTP } from '@/entities/user/api/user-confirm-otp';
import { ApiError } from '@/shared/types/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useConfirmOTP = () => {
  return useMutation({
    mutationFn: userConfirmOTP,
    onSuccess: () => {
      toast.success('Вы успешно вошли в аккаунт');
    },
    onError: (err) => {
      let msg = 'Что-то пошло не так при отправке кода';

      if (err instanceof AxiosError) {
        const response = err.response?.data as ApiError;
        const code = response.error.code;

        if (code === 'INCORRECT_CODE') {
          msg = 'Неверный код';
        }
      }

      toast.error(msg);
    },
  });
};
