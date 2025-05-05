import { SelectProjectField } from '@/entities/time-entry/ui/select-project-field';
import { cn } from '@/shared/lib/utils';
import { TextareaField } from '@/shared/ui/fields';
import { Form } from '@/shared/ui/form';
import { useTimerForm } from '../hooks/use-timer-form';

export interface TimerInfoProps {
  className?: string;
}

export function TimerInfoForm({ className }: TimerInfoProps) {
  const form = useTimerForm();

  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-4', className)}>
        <TextareaField control={form.control} name="description" placeholder="Описание" />
        <SelectProjectField control={form.control} name="project" />
      </form>
    </Form>
  );
}
