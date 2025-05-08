import { SelectProjectField } from '@/entities/project/ui/select-project-field';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TextareaField } from '@/shared/ui/fields';
import { Form } from '@/shared/ui/form';
import { useTimeEntryInfoForm } from '../hooks/use-time-entry-info-form';
import { TimeEntryFormSchemaType } from '../model/time-entry-form-schema';

export interface TimeEntryFormProps {
  className?: string;
  onSubmit?: (data: TimeEntryFormSchemaType) => void;
  submitText?: string;
  defaultValues?: Partial<TimeEntryFormSchemaType>;
}

export function TimeEntryForm({
  className,
  onSubmit,
  submitText = 'Сохранить',
  defaultValues,
}: TimeEntryFormProps) {
  const form = useTimeEntryInfoForm({
    defaultValues,
  });

  const handleSubmit = (data: TimeEntryFormSchemaType) => {
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
