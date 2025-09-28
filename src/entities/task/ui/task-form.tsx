import { SelectProjectField } from '@/entities/project/ui/select-project-field';
import { Button } from '@/shared/ui/button';
import { TextareaField, TextField } from '@/shared/ui/fields';
import { DurationField } from '@/shared/ui/fields/duration-field';
import { Form } from '@/shared/ui/form';
import { durationToSeconds } from '@/shared/utils/duration';
import { useTaskForm } from '../hooks/use-task-form';
import { TaskSchemaType } from '../model/task-schema';
import { TaskPayload } from '../model/task-types';

export interface TaskFormProps {
  onSubmit: (data: TaskPayload) => void;
  trigger?: React.ReactElement<typeof Button>;
}

export function TaskForm({ onSubmit, trigger }: TaskFormProps) {
  const form = useTaskForm();

  const handleSubmit = (data: TaskSchemaType) => {
    onSubmit({
      name: data.name,
      estimated_time: data.estimatedTime ? durationToSeconds(data.estimatedTime) : undefined,
      project: data.project || undefined,
      description: data.description,
      completed: false,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="flex flex-col gap-4">
          <TextField control={form.control} name="name" label="Задача" />
          <DurationField control={form.control} name="estimatedTime" label="Планируемое время" />
          <TextareaField control={form.control} name="description" label="Описание" />
          <SelectProjectField control={form.control} name="project" label="Проект" />
        </fieldset>
        <div className="mt-4">
          {trigger ? trigger : <Button className="w-full">Сохранить</Button>}
        </div>
      </form>
    </Form>
  );
}
