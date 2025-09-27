import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields';
import { BooleanField } from '@/shared/ui/fields/boolean-field';
import { SelectField } from '@/shared/ui/fields/select-field';
import { TimeField } from '@/shared/ui/fields/time-field';
import { Form } from '@/shared/ui/form';
import { useProjectReminderForm } from '../hooks/use-project-reminder-form';
import { INTERVAL_OPTIONS } from '../model/constants';
import { ProjectReminderDTO, ProjectReminderPayload } from '../model/types';

export interface ProjectReminderActionContext {
  isSubmitting?: boolean;
}

export interface ProjectReminderFormProps {
  submitBtnText?: string;
  onSubmit: (values: Omit<ProjectReminderPayload, 'project'>) => Promise<any>;
  defaultValues?: ProjectReminderDTO;
  renderActions?: (ctx: ProjectReminderActionContext) => React.ReactNode;
}

export function ProjectReminderForm({
  onSubmit,
  defaultValues,
  renderActions,
  submitBtnText = 'Сохранить',
}: ProjectReminderFormProps) {
  const form = useProjectReminderForm({ defaultValues: { repeatable: true, ...defaultValues } });

  console.log(form.getValues(), form.formState.errors);

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
            <BooleanField
              control={form.control}
              className="grid-cols-[1fr_auto]"
              name="repeatable"
              label="Повторять уведомления"
            />
          </div>
        </fieldset>

        <div className="mt-4 w-full">
          {renderActions ? (
            renderActions({ isSubmitting: form.formState.isSubmitting })
          ) : (
            <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
              {submitBtnText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
