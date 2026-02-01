import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { telegramLinkApi } from './telegram-link-api';

const QUERY_KEY = 'telegram-link';

export const telegramLinkApiHooks = {
  useStatus: () =>
    useQuery({
      queryKey: [QUERY_KEY],
      queryFn: telegramLinkApi.getStatus,
      refetchOnWindowFocus: true,
    }),

  useGetBotLink: () =>
    useMutation({
      mutationFn: telegramLinkApi.getBotLink,
    }),

  useUnlink: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: telegramLinkApi.unlink,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      },
    });
  },

  useToggleNotifications: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: telegramLinkApi.toggleNotifications,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      },
    });
  },
};
