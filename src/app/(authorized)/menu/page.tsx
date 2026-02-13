'use client';
import { useUser } from '@/entities/user/hooks/use-user';
import { AppFeedbackDialog } from '@/features/leave-app-feedback/ui/app-feedback-dialog';
import { LogoutButton } from '@/features/logout/ui/logout-button';
import { TelegramNotificationManager } from '@/features/manage-telegram-notifications/ui/telegram-notification-manager';
import { PushNotificationManager } from '@/features/push-notifications/ui/push-notifications-manager';
import ToggleThemeSwitch from '@/features/toggle-theme/ui/toggle-theme-switch';
import { paths } from '@/shared/constants';
import { buttonVariants } from '@/shared/ui/button';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { ChevronRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function MenuPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <CardTitle className="p-2">Аккаунт</CardTitle>
          <div className="mt-1 flex items-center gap-2 px-2">
            <Mail className="size-3.5" /> {user?.email}
          </div>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'mt-1 w-full justify-between! p-2!',
            })}
            href={paths.menu.profile}
          >
            <span>Профиль</span>
            <ChevronRight />
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardTitle className="p-2">Уведомления</CardTitle>
          <PushNotificationManager className="p-2" />
          <TelegramNotificationManager className="p-2" />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardTitle className="p-2">Оформление</CardTitle>
          <ToggleThemeSwitch className="w-full p-2" />
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <AppFeedbackDialog />
        <LogoutButton />
      </div>
    </div>
  );
}
