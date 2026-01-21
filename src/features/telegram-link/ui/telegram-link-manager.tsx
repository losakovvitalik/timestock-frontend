'use client';

import { telegramLinkApiHooks } from '@/entities/telegram-link/api/telegram-link-api-hooks';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function TelegramLinkManager() {
  const { data: status, isLoading } = telegramLinkApiHooks.useStatus();
  const getBotLink = telegramLinkApiHooks.useGetBotLink();
  const unlink = telegramLinkApiHooks.useUnlink();
  const toggleNotifications = telegramLinkApiHooks.useToggleNotifications();

  const [botLink, setBotLink] = useState<string | null>(null);

  const handleConnect = () => {
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

  const handleUnlink = () => {
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

  const handleToggleNotifications = (enabled: boolean) => {
    toggleNotifications.mutate(enabled, {
      onError: () => {
        toast.error('Не удалось изменить настройки уведомлений');
      },
    });
  };

  if (isLoading) {
    return <Button disabled>Загрузка...</Button>;
  }

  if (!status?.isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <Button disabled={getBotLink.isPending} onClick={handleConnect}>
          {getBotLink.isPending ? 'Загрузка...' : 'Привязать Telegram'}
        </Button>
        {botLink && (
          <p className="text-muted-foreground text-sm">
            Ссылка откроется в новом окне. Если не открылась,{' '}
            <a
              className="text-primary underline"
              href={botLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              нажмите сюда
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        disabled={toggleNotifications.isPending}
        onClick={() => handleToggleNotifications(!status.notificationsEnabled)}
      >
        {toggleNotifications.isPending
          ? 'Загрузка...'
          : status.notificationsEnabled
            ? 'Выключить уведомления в Telegram'
            : 'Включить уведомления в Telegram'}
      </Button>
      <Button disabled={unlink.isPending} variant="outline" onClick={handleUnlink}>
        {unlink.isPending ? 'Отвязка...' : 'Отвязать Telegram'}
      </Button>
    </div>
  );
}
