import { SelectProjectField } from '@/entities/time-entry/ui/select-project-field';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TextareaField } from '@/shared/ui/fields';
import { Form } from '@/shared/ui/form';
import { useTimerInfoForm } from '../hooks/use-timer-info-form';
import { TimerFormSchemaType } from '../model/timer-form-schema';

export interface TimerInfoProps {
  className?: string;
  onSubmit?: (data: TimerFormSchemaType) => void;
  submitText?: string;
  defaultValues?: Partial<TimerFormSchemaType>;
}

export function TimerInfoForm({
  className,
  onSubmit,
  submitText = 'Сохранить',
  defaultValues,
}: TimerInfoProps) {
  const form = useTimerInfoForm({
    defaultValues,
  });

  const handleSubmit = (data: TimerFormSchemaType) => {
    onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-4', className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <TextareaField control={form.control} name="description" placeholder="Описание" />
        <SelectProjectField control={form.control} name="project" />

        <Button>{submitText}</Button>
      </form>
    </Form>
  );
}
