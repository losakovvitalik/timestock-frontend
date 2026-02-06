'use client';

import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';
import { Typography } from '@/shared/ui/typography';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { OnboardingDialog } from './onboarding-dialog';

export function TimeEntryEmptyState() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <Logo size="lg" />

      <div className="flex flex-col gap-2">
        <Typography variant="subtitle">Добро пожаловать!</Typography>
        <Typography variant="muted" className="max-w-xs">
          У вас ещё нет ни одного трека времени. Начните отслеживать своё время прямо сейчас!
        </Typography>
      </div>

      <Button variant="outline" onClick={() => setIsOnboardingOpen(true)}>
        <HelpCircle className="size-4" />С чего начать?
      </Button>

      <OnboardingDialog open={isOnboardingOpen} onOpenChange={setIsOnboardingOpen} />
    </div>
  );
}
