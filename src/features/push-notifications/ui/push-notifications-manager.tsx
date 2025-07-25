import { pushSubscriptionApiHooks } from '@/entities/push-subscription/api/push-subscription-api-hooks';
import { Button } from '@/shared/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { urlBase64ToUint8Array } from '../utils/url-to-unit-array';

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const create = pushSubscriptionApiHooks.useCreate();
  const { data: session } = useSession();

  const subscribe = useMutation({
    mutationFn: async () => {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });

      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));

      if (session?.user.id) {
        create.mutate({
          subscription: serializedSub,
          user: session?.user.id,
        });
      }
    },
    onError: () => {
      toast.error('Не удалось включить уведомления');
    },
  });

  const unsubscribe = useMutation({
    mutationFn: async () => {
      await subscription?.unsubscribe();
      setSubscription(null);
    },
  });

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  if (!isSupported) {
    return (
      <Button className="h-auto whitespace-break-spaces" disabled={true}>
        Уведомления не поддерживаются в этом браузере
      </Button>
    );
  }

  const handleTogglePush = () => {
    if (subscription) {
      unsubscribe.mutate();
    } else {
      subscribe.mutate();
    }
  };

  return (
    <Button disabled={subscribe.isPending || unsubscribe.isPending} onClick={handleTogglePush}>
      {subscription ? 'Выключить уведомления' : 'Включить уведомления'}
    </Button>
  );
}
