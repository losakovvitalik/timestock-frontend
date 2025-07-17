'use client';

import { useUser } from '@/entities/user/hooks/use-user';
import { EditUserProfileForm } from '@/features/edit-user-profile/ui/update-user-profile-form';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Loader } from '@/shared/ui/loader';

export default function ProfilePage() {
  const { data: user, isSuccess } = useUser();

  if (!user) {
    return <Loader absolute />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <CardTitle className="text-center">{user?.email}</CardTitle>
        </CardContent>
      </Card>
      {isSuccess && <EditUserProfileForm defaultValues={{ timezone: user?.timezone }} />}
    </div>
  );
}
