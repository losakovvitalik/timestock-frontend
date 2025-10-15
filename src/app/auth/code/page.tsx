import { AuthOTPForm } from '@/features/auth/ui/auth-otp-form';
import { paths } from '@/shared/constants';
import { PageProps } from '@/shared/types/next';
import { Button } from '@/shared/ui/button';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AuthCodePage(props: PageProps<any, { email: string }>) {
  const searchParams = await props.searchParams;
  const email = searchParams?.email;

  if (!email) {
    redirect(paths.auth.link);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
      <AuthOTPForm email={email} />
      <Button className="rounded-full" asChild variant="outline">
        <Link className="hover:scale-105" href={paths.auth.link}>
          <Undo2 /> Изменить email
        </Link>
      </Button>
    </div>
  );
}
