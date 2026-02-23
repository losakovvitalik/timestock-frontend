import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields';
import { BooleanField } from '@/shared/ui/fields/boolean-field';
import { DurationField } from '@/shared/ui/fields/duration-field';
import { Form, FormItem, FormLabel } from '@/shared/ui/form';
import { useController, useWatch } from 'react-hook-form';
import { useProjectReminderForm } from '../hooks/use-project-reminder-form';
import { DAYS_OF_WEEK } from '../model/constants';
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
  console.log(defaultValues);

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
            <DurationField
              control={form.control}
              name="recurrence_options.time"
              label="Время"
              format="HH:mm"
              unmask={false}
            />
            <BooleanField
              control={form.control}
              name="repeatable"
              fieldClassName="grid-cols-[1fr_auto]"
              label="Повторять уведомления"
            />
            <DaysOfWeekField control={form.control} />
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

function DaysOfWeekField({
  control,
}: {
  control: ReturnType<typeof useProjectReminderForm>['control'];
}) {
  const repeatable = useWatch({ control, name: 'repeatable' });
  const { field } = useController({
    control,
    name: 'recurrence_options.daysOfWeek' as const,
  });

  if (!repeatable) return null;

  const selected: number[] = field.value ?? [];

  const toggle = (day: number) => {
    const next = selected.includes(day)
      ? selected.filter((d: number) => d !== day)
      : [...selected, day];
    field.onChange(next);
  };

  return (
    <FormItem>
      <FormLabel>Дни недели</FormLabel>
      <div className="grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map(({ label, value }) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={selected.includes(value) ? 'default' : 'outline'}
            className={cn('flex-1')}
            onClick={() => toggle(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </FormItem>
  );
}
