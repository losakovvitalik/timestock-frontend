import { useEffect, useState } from 'react';
import { urlBase64ToUint8Array } from '../utils/url-to-unit-array';

export const useBrowserSubscription = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      navigator.serviceWorker
        .register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .then((reg) => reg.pushManager.getSubscription())
        .then(setSubscription);
    }
  }, []);

  const subscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });
    setSubscription(sub);
    return sub;
  };

  const unsubscribe = async () => {
    await subscription?.unsubscribe();
    setSubscription(null);
  };

  return { isSupported, subscription, subscribe, unsubscribe };
};
