import { AuthForm } from '@/features/auth/ui/auth-form';
import { Typography } from '@/shared/ui/typography';

export default function AuthPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
      <Typography variant={'subtitle'}>Вход</Typography>
      <AuthForm />
    </div>
  );
}
