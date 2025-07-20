import { Button } from '@/shared/ui/button';
import { TextareaField } from '@/shared/ui/fields';
import { RatingField } from '@/shared/ui/fields/rating-field';
import { Form } from '@/shared/ui/form';
import { toast } from 'sonner';
import { appFeedbackApiHooks } from '../api/app-feedback-api-hooks';
import { useAppFeedbackForm } from '../hooks/use-app-feedback-form';
import { AppFeedbackFormSchemaType } from '../model/app-feedback-form-schema';

export interface AppFeedbackFormProps {
  onSuccess?: () => void;
}

export function AppFeedbackForm({ onSuccess }: AppFeedbackFormProps) {
  const form = useAppFeedbackForm();
  const create = appFeedbackApiHooks.useCreate();

  const onSubmit = (data: AppFeedbackFormSchemaType) => {
    return create.mutateAsync(data, {
      onSuccess: () => {
        onSuccess?.();
        toast.success('Спасибо, мы получили ваш отзыв');
      },
      onError: () => {
        toast.error('Не удалось отправить отзыв. Мы уже работает над этим');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <RatingField control={form.control} name="rating" className="mx-auto" />
          <TextareaField control={form.control} name="text" className="mt-4" />
        </div>
        <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
          Отправить
        </Button>
      </form>
    </Form>
  );
}
