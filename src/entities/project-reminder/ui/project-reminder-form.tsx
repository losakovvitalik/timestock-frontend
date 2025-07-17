import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields';
import { SelectField } from '@/shared/ui/fields/select-field';
import { TimeField } from '@/shared/ui/fields/time-field';
import { Form } from '@/shared/ui/form';
import { useProjectReminderForm } from '../hooks/use-project-reminder-form';
import { INTERVAL_OPTIONS } from '../model/constants';
import { ProjectReminderFormSchemaType } from '../model/project-reminder-form-schema';
import { ProjectReminder } from '../model/types';

export interface ProjectReminderFormProps {
  submitBtnText?: string;
  onSubmit: (values: ProjectReminderFormSchemaType) => Promise<any>;
  defaultValues?: ProjectReminder;
}

export function ProjectReminderForm({
  onSubmit,
  defaultValues,
  submitBtnText = 'Сохранить',
}: ProjectReminderFormProps) {
  const form = useProjectReminderForm({ defaultValues });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <div className="flex flex-col gap-4">
            <TextField
              control={form.control}
              name="text"
              label="Текст уведомления"
              description="Этот текст будет отображаться в пуш-уведомлении"
            />
            <SelectField
              control={form.control}
              label="Частота повторения"
              name="recurrence_options.interval"
              labelKey={'label'}
              valueKey={'value'}
              options={INTERVAL_OPTIONS}
            />
            <TimeField
              control={form.control}
              name="recurrence_options.time"
              label="Время"
              format="HH:mm"
              unmask={false}
            />
          </div>

          <Button className="mt-4 w-full" disabled={form.formState.isSubmitting} type="submit">
            {submitBtnText}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
