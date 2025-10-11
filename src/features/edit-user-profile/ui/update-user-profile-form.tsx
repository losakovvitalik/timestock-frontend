'use client';

import { useUpdateUser } from '@/entities/user/hooks/use-update-user';
import { useUser } from '@/entities/user/hooks/use-user';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Form } from '@/shared/ui/form';
import { Typography } from '@/shared/ui/typography';
import toast from 'react-hot-toast';
import { useUpdateUserProfileForm } from '../hooks/use-update-user-profile-form';
import { UpdateUserProfileFormSchemaType } from '../model/update-user-profile-form-schema';
import { TimezoneField } from './timezone-field';

export interface EditUserProfileFormProps {
  defaultValues: UpdateUserProfileFormSchemaType;
}

export function EditUserProfileForm({ defaultValues }: EditUserProfileFormProps) {
  const form = useUpdateUserProfileForm({
    defaultValues: defaultValues,
  });

  const userUpdate = useUpdateUser();
  const { user } = useUser();

  const onSubmit = (data: UpdateUserProfileFormSchemaType) => {
    return userUpdate.mutateAsync(
      {
        id: user!.id,
        data: {
          timezone: data.timezone,
        },
      },
      {
        onSuccess: () => toast.success('Профиль успешно обновлен'),
        onError: () => toast.error('Не удалось изменить профиль. Мы уже решаем проблему'),
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Typography variant="subtitle">Основная информация</Typography>
              <div className="flex flex-col gap-4">
                <TimezoneField control={form.control} name="timezone" label="Часовой пояс" />
              </div>

              <Button className="mt-4 w-full" disabled={form.formState.isSubmitting} type="submit">
                Сохранить
              </Button>
            </CardContent>
          </Card>
        </fieldset>
      </form>
    </Form>
  );
}
