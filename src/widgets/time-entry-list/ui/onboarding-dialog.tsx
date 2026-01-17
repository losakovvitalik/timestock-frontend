'use client';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Typography } from '@/shared/ui/typography';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ONBOARDING_SLIDES = [
  {
    title: 'Создавайте проекты',
    description:
      'Организуйте свою работу по проектам. Каждый проект может иметь свой цвет для удобной визуализации.',
  },
  {
    title: 'Отслеживайте время',
    description:
      'Запускайте таймер одним нажатием. Вы можете отслеживать время на разные задачи в течение дня.',
  },
  {
    title: 'Добавляйте задачи',
    description:
      'Создавайте задачи внутри проектов и привязывайте к ним записи времени для детального анализа.',
  },
  {
    title: 'Анализируйте статистику',
    description:
      'Смотрите сколько времени вы тратите на каждый проект и задачу. Используйте отчёты для планирования.',
  },
];

export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onOpenChange(false);
      setCurrentSlide(0);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setCurrentSlide(0);
  };

  const slide = ONBOARDING_SLIDES[currentSlide];
  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{slide.title}</DialogTitle>
          <DialogDescription>{slide.description}</DialogDescription>
        </DialogHeader>

        <div className="bg-muted/50 flex h-40 items-center justify-center rounded-lg">
          <Typography variant="muted" size="sm">
            Placeholder для иллюстрации {currentSlide + 1}
          </Typography>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {ONBOARDING_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentSlide > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrev}>
                <ChevronLeft className="size-4" />
                Назад
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {isLastSlide ? 'Начать' : 'Далее'}
              {!isLastSlide && <ChevronRight className="size-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
