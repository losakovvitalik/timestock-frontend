'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { TextareaField, TextField } from '@/shared/ui/fields';
import { Form } from '@/shared/ui/form';
import { Typography } from '@/shared/ui/typography';
import { useCreateProjectForm } from '../hooks/use-create-project-form';
import { CreateProjectFormSchemaType } from '../models/create-project-form-schema';

export interface CreateProjectFormProps {
  onSubmit?: (values: CreateProjectFormSchemaType) => void;
}

export function CreateProjectForm({ onSubmit }: CreateProjectFormProps) {
  const form = useCreateProjectForm();

  const handleSubmit = (value: CreateProjectFormSchemaType) => {
    onSubmit?.(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <Typography variant={'subtitle'}>Основная информация</Typography>

            <div className="flex flex-col gap-4">
              <TextField control={form.control} name="name" label="Название" />
              <TextareaField control={form.control} name="description" label="Описание" />
            </div>
          </CardContent>
        </Card>
        <Button className="mt-4 w-full" type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
}
