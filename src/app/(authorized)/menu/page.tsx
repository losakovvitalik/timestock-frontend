'use client';
import { AppFeedbackDialog } from '@/features/leave-app-feedback/ui/app-feedback-dialog';
import { LogoutButton } from '@/features/logout/ui/logout-button';
import { PushNotificationManager } from '@/features/push-notifications/ui/push-notifications-manager';
import ToggleThemeButton from '@/features/toggle-theme/ui/toggle-theme-button';
import { paths } from '@/shared/constants';
import { buttonVariants } from '@/shared/ui/button';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MenuPage() {
  const { data } = useSession();

  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle className="text-center">{data?.user.email}</CardTitle>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-col gap-4">
        <ToggleThemeButton className="w-full" />
        <Link className={buttonVariants()} href={paths.profile}>
          Профиль
        </Link>
        <PushNotificationManager />
        <AppFeedbackDialog />
        <LogoutButton />
        {/* <InstallPrompt /> */}
      </div>
    </div>
  );
}
