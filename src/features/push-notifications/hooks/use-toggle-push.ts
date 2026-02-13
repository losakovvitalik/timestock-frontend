import { pushSubscriptionApi, pushSubscriptionApiHooks } from '@/entities/push-subscription';
import { useUser } from '@/entities/user/hooks/use-user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useBrowserSubscription } from './use-browser-subscription';

export const useTogglePush = () => {
  const {
    isSupported,
    subscription,
    subscribe: browserSubscribe,
    unsubscribe: browserUnsubscribe,
  } = useBrowserSubscription();
  const create = pushSubscriptionApiHooks.useCreate();
  const { user } = useUser();

  const serverSubscription = useQuery({
    queryKey: ['push-subscription', 'my', subscription?.endpoint],
    queryFn: () => pushSubscriptionApi.findMy(subscription!.endpoint),
    enabled: !!subscription?.endpoint,
  });

  const serverDocumentId = serverSubscription.data?.documentId;

  const subscribe = useMutation({
    mutationFn: async () => {
      const sub = await browserSubscribe();
      const serializedSub = JSON.parse(JSON.stringify(sub));

      if (user?.id) {
        create.mutate({
          subscription: serializedSub,
          user: user.id,
        });
      }
    },
    onError: () => {
      toast.error('Не удалось включить уведомления');
    },
  });

  const remove = pushSubscriptionApiHooks.useDelete({
    onSuccess: () => {
      browserUnsubscribe();
    },
    onError: () => {
      toast.error('Не удалось отключить уведомления');
    },
  });

  const isPending = subscribe.isPending || remove.isPending;
  const isEnabled = !!subscription;

  const toggle = (checked: boolean) => {
    if (checked) {
      subscribe.mutate();
    } else if (serverDocumentId) {
      remove.mutate(serverDocumentId);
    }
  };

  return { isSupported, isEnabled, isPending, toggle };
};
