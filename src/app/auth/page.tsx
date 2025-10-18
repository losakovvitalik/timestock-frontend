import { AuthForm } from '@/features/auth/ui/auth-form';
import { Typography } from '@/shared/ui/typography';
import { Clock } from 'lucide-react';

export default function AuthPage() {
  return (
    <>
      <Typography
        className="text-primary absolute top-5 left-1/2 flex -translate-x-1/2 items-center gap-1 font-semibold"
        size="lg"
      >
        <Clock className="size-4" />
        <span>TimeStock</span>
      </Typography>
      <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
        <Typography variant="subtitle">Вход</Typography>
        <AuthForm />
      </div>
    </>
  );
}
