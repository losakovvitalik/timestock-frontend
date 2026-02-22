'use client';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';
import { Send } from 'lucide-react';
import { useTelegramManager } from '../hooks/use-telegram-manager';

interface TelegramNotificationManagerProps {
  className?: string;
}

export function TelegramNotificationManager({ className }: TelegramNotificationManagerProps) {
  const {
    status,
    isLoading,
    botLink,
    isConnectPending,
    isDisconnectPending,
    isTogglePending,
    connect,
    disconnect,
    toggle,
  } = useTelegramManager();

  if (isLoading) {
    return null;
  }

  if (!status?.isConnected) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {botLink ? (
          <Button asChild variant="outline" size="sm">
            <a
              href={botLink}
              rel="noopener noreferrer"
              target="_blank"
              className="flex flex-col items-center gap-1"
            >
              <span>Если ссылка не открылась в новом окне, нажмите сюда</span>
            </a>
          </Button>
        ) : (
          <Button
            className="w-max"
            disabled={isConnectPending}
            variant="outline"
            size="sm"
            onClick={connect}
          >
            {isConnectPending ? 'Загрузка...' : 'Привязать Telegram'}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <label className="flex cursor-pointer items-center justify-between gap-2">
        <span className={cn('flex items-center gap-1', isTogglePending && 'text-muted-foreground')}>
          <Send
            className={cn(
              'text-muted-foreground fill-muted-foreground size-4',
              status.notificationsEnabled && 'fill-sky-300 text-sky-300',
            )}
          />
          Telegram уведомления
        </span>
        <Switch
          checked={status.notificationsEnabled}
          disabled={isTogglePending}
          onCheckedChange={toggle}
        />
      </label>
      <Button
        className="w-max"
        disabled={isDisconnectPending}
        variant="destructive"
        size="sm"
        onClick={disconnect}
      >
        {isDisconnectPending ? 'Отвязка...' : 'Отвязать Telegram'}
      </Button>
    </div>
  );
}
