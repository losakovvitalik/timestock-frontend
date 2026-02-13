import { telegramLinkApiHooks } from '@/entities/telegram-link/api/telegram-link-api-hooks';
import { useState } from 'react';
import { toast } from 'sonner';

export const useTelegramManager = () => {
  const { data: status, isLoading } = telegramLinkApiHooks.useStatus();
  const getBotLink = telegramLinkApiHooks.useGetBotLink();
  const unlink = telegramLinkApiHooks.useUnlink();
  const toggleNotifications = telegramLinkApiHooks.useToggleNotifications();

  const [botLink, setBotLink] = useState<string | null>(null);

  const connect = () => {
    getBotLink.mutate(undefined, {
      onSuccess: (data) => {
        setBotLink(data.link);
        window.open(data.link, '_blank');
      },
      onError: () => {
        toast.error('Не удалось получить ссылку на бота');
      },
    });
  };

  const disconnect = () => {
    unlink.mutate(undefined, {
      onSuccess: () => {
        setBotLink(null);
        toast.success('Telegram аккаунт отвязан');
      },
      onError: () => {
        toast.error('Не удалось отвязать Telegram');
      },
    });
  };

  const toggle = (enabled: boolean) => {
    toggleNotifications.mutate(enabled, {
      onError: () => {
        toast.error('Не удалось изменить настройки уведомлений');
      },
    });
  };

  return {
    status,
    isLoading,
    botLink,
    isConnectPending: getBotLink.isPending,
    isDisconnectPending: unlink.isPending,
    isTogglePending: toggleNotifications.isPending,
    connect,
    disconnect,
    toggle,
  };
};
