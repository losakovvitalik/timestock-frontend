import { AuthOTPForm } from '@/features/auth/ui/auth-otp-form';
import { paths } from '@/shared/constants';
import { PageParams } from '@/shared/types/next';
import { Typography } from '@/shared/ui/typography';
import { redirect } from 'next/navigation';

export default async function AuthCodePage(props: PageParams<any, { email: string }>) {
  const searchParams = await props.searchParams;
  const email = searchParams?.email;

  if (!email) {
    redirect(paths.auth.link);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
      <AuthOTPForm email={email} />
    </div>
  );
}
