'use client';

import { useUser } from '@/entities/user/hooks/use-user';
import { EditUserProfileForm } from '@/features/edit-user-profile/ui/update-user-profile-form';
import { Loader } from '@/shared/ui/loader';
import { PageTitle } from '@/shared/ui/page-title';

export default function ProfilePage() {
  const { user, isSuccess } = useUser();

  if (!user) {
    return <Loader absolute />;
  }

  return (
    <>
      <PageTitle>{user.email}</PageTitle>
      <div className="flex flex-col gap-4">
        {isSuccess && <EditUserProfileForm defaultValues={{ timezone: user?.timezone }} />}
      </div>
    </>
  );
}
