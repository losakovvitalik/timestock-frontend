'use client';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useState } from 'react';
import { AppFeedbackForm } from './app-feedback-form';

export function AppFeedbackDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Оставить отзыв о приложении</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отзыв о приложении</DialogTitle>
          <DialogDescription className="text-xs">
            Напишите чего нам не хватает или что бы вы хотели улучшить. Либо можете указать, что вам
            понравилось - нам будет приятно прочитать. Если у вас возникли проблемы, мы ответим на
            почту, указанную при регистрации.
          </DialogDescription>
        </DialogHeader>
        <AppFeedbackForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
