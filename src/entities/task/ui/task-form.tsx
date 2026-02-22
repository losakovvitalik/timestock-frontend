import { SelectProjectField } from '@/entities/project/ui/select-project-field';
import { Button } from '@/shared/ui/button';
import { TextareaField, TextField } from '@/shared/ui/fields';
import { DateTimePickerField } from '@/shared/ui/fields/date-time-picker-field';
import { DurationField } from '@/shared/ui/fields/duration-field';
import { Form } from '@/shared/ui/form';
import { durationToSeconds } from '@/shared/utils/duration';
import { useTaskForm } from '../hooks/use-task-form';
import { TaskSchemaType } from '../model/task-schema';
import { TaskPayload } from '../model/task-types';

export interface TaskFormProps {
  onSubmit: (data: TaskPayload) => void;
  trigger?: React.ReactElement<typeof Button>;
  defaultProject?: string | null;
}

export function TaskForm({ onSubmit, trigger, defaultProject }: TaskFormProps) {
  const form = useTaskForm({
    defaultValues: {
      project: defaultProject ?? undefined,
    },
  });

  const handleSubmit = (data: TaskSchemaType) => {
    onSubmit({
      name: data.name,
      estimated_time: data.estimatedTime ? durationToSeconds(data.estimatedTime) : undefined,
      project: data.project || undefined,
      description: data.description,
      is_completed: false,
      due_date: data.due_date?.toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="flex flex-col gap-4">
          <TextField control={form.control} name="name" label="Задача" />
          <SelectProjectField control={form.control} name="project" label="Проект" />
          <DurationField
            control={form.control}
            name="estimatedTime"
            label="Планируемое время"
            format="HH:mm"
          />
          <TextareaField control={form.control} name="description" label="Описание" />
          <DateTimePickerField
            control={form.control}
            name="due_date"
            label="Дедлайн"
            calenderProps={{
              disabled: {
                before: new Date(),
              },
            }}
          />
        </fieldset>
        <div className="mt-4">
          {trigger ? trigger : <Button className="w-full">Сохранить</Button>}
        </div>
      </form>
    </Form>
  );
}
