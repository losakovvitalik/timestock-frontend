import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { TextareaField, TextField } from '@/shared/ui/fields';
import { ColorField } from '@/shared/ui/fields/color-field';
import { Form } from '@/shared/ui/form';
import { Typography } from '@/shared/ui/typography';
import { useProjectForm } from '../hooks/use-project-form';
import { ProjectFormSchemaType } from '../models/create-project-form-schema';

export interface ProjectFormProps {
  submitBtnText?: string;
  onSubmit: (values: ProjectFormSchemaType) => void;
}

export function ProjectForm({ onSubmit, submitBtnText = 'Сохранить' }: ProjectFormProps) {
  const form = useProjectForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <Typography variant={'subtitle'}>Основная информация</Typography>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <ColorField control={form.control} name="color" />
                <TextField control={form.control} name="name" placeholder="Название проекта" />
              </div>
              <TextareaField control={form.control} name="description" label="Описание" />
            </div>
          </CardContent>
        </Card>
        <Button className="mt-4 w-full" type="submit">
          {submitBtnText}
        </Button>
      </form>
    </Form>
  );
}
