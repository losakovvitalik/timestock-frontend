import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { TextareaField, TextField } from '@/shared/ui/fields';
import { ColorField } from '@/shared/ui/fields/color-field';
import { FieldGroup } from '@/shared/ui/fields/field-group';
import { Form } from '@/shared/ui/form';
import { Typography } from '@/shared/ui/typography';
import { useProjectForm } from '../hooks/use-project-form';
import { ProjectFormSchemaType } from '../models/project-form-schema';
import { Project } from '../models/types';

export interface ProjectFormProps {
  submitBtnText?: string;
  onSubmit: (values: ProjectFormSchemaType) => Promise<any>;
  defaultValues?: Project;
}

export function ProjectForm({
  onSubmit,
  defaultValues,
  submitBtnText = 'Сохранить',
}: ProjectFormProps) {
  const form = useProjectForm({
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Typography variant={'subtitle'}>Основная информация</Typography>

              <div className="flex flex-col gap-4">
                <FieldGroup>
                  <ColorField control={form.control} name="color" />
                  <TextField control={form.control} name="name" placeholder="Название проекта" />
                </FieldGroup>
                <TextareaField control={form.control} name="description" label="Описание" />
              </div>

              <Button className="mt-4 w-full" disabled={form.formState.isSubmitting} type="submit">
                {submitBtnText}
              </Button>
            </CardContent>
          </Card>
        </fieldset>
      </form>
    </Form>
  );
}
