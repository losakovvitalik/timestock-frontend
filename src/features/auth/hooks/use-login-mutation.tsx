import { loginUser } from '@/entities/user/api/login';
import { useMutation } from '@tanstack/react-query';

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser,
  });
}
