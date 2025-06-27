'use client';
import { LogoutButton } from '@/features/logout/ui/logout-button';
import { PushNotificationManager } from '@/features/push-notifications/ui/push-notifications-manager';
import ToggleThemeButton from '@/features/toggle-theme/ui/toggle-theme-button';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { useSession } from 'next-auth/react';

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
        <PushNotificationManager />
        <LogoutButton />
        {/* <InstallPrompt /> */}
      </div>
    </div>
  );
}
