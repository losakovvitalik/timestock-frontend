import { cn } from '@/shared/lib';
import { Switch } from '@/shared/ui/switch';
import { Bell, BellOff } from 'lucide-react';
import { useTogglePush } from '../hooks/use-toggle-push';

interface PushNotificationManagerProps {
  className?: string;
}

export function PushNotificationManager({ className }: PushNotificationManagerProps) {
  const { isSupported, isEnabled, isPending, toggle } = useTogglePush();

  if (!isSupported) {
    return null;
  }

  return (
    <label className={cn('flex cursor-pointer items-center justify-between gap-2', className)}>
      <span className={cn('flex items-center gap-1', isPending && 'text-muted-foreground')}>
        {isEnabled ? <Bell className="size-4 text-green-300" /> : <BellOff className="size-4" />}
        Уведомления
      </span>
      <Switch checked={isEnabled} disabled={isPending} onCheckedChange={toggle} />
    </label>
  );
}
