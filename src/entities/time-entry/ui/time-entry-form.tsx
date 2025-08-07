import { SelectProjectField } from '@/entities/project/ui/select-project-field';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TextareaField } from '@/shared/ui/fields';
import { DateTimePickerField } from '@/shared/ui/fields/date-time-picker-field';
import { TimeField } from '@/shared/ui/fields/time-field';
import { Form } from '@/shared/ui/form';
import { formatDuration, parseDurationString } from '@/shared/utils/duration';
import { add, differenceInSeconds } from 'date-fns';
import { useEffect } from 'react';
import { useTimeEntryForm } from '../hooks/use-time-entry-form';
import { TimeEntryFormSchemaType } from '../model/time-entry-form-schema';
import { TimeEntryDTO, TimeEntryPayload } from '../model/types';
import { getInitialDuration } from '../utils/get-initial-duration';

export interface TimeEntryFormProps {
  className?: string;
  onSubmit?: (data: TimeEntryPayload) => void;
  submitText?: string;
  defaultValues?: Partial<TimeEntryDTO>;
}

export function TimeEntryForm({
  className,
  onSubmit,
  submitText = 'Сохранить',
  defaultValues,
}: TimeEntryFormProps) {
  const form = useTimeEntryForm({
    defaultValues: {
      description: defaultValues?.description || undefined,
      duration: defaultValues ? getInitialDuration(defaultValues) : '00:00:00',
      project: defaultValues?.project?.documentId,
      startTime: defaultValues?.start_time ? new Date(defaultValues?.start_time) : new Date(),
      endTime: defaultValues?.end_time ? new Date(defaultValues?.end_time) : new Date(),
    },
  });

  const handleSubmit = (data: TimeEntryFormSchemaType) => {
    onSubmit?.({
      description: data.description,
      end_time: data.endTime,
      project: data.project,
      start_time: data.startTime,
    });
  };

  const endTime = form.watch('endTime');
  const startTime = form.watch('startTime');
  const duration = form.watch('duration');

  // если пользователь изменил duration, изменяем время конца
  useEffect(() => {
    const { hours, minutes, seconds } = parseDurationString(duration);
    const newEndTime = add(startTime, {
      hours,
      minutes,
      seconds,
    });

    // если даты отличаются на менее чем 1000мс (так как они могут отличаться по миллисекундам), то ничего не изменяем
    if (Math.abs(newEndTime.getTime() - (endTime?.getTime() || 0)) <= 1000) {
      return;
    }

    form.setValue('endTime', newEndTime);
    /**
     * ! если в массив добавить endTime или startTime, как подсказывает ESLint,
     * ! то будет бесконечный ререндер и утечка памяти
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, form]);

  // если пользователь изменили время начала или конца, обновляем длительность
  useEffect(() => {
    if (endTime) {
      const newDuration = formatDuration(differenceInSeconds(endTime, startTime));

      if (endTime < startTime) {
        form.setError('endTime', {
          type: 'manual',
          message: 'Время конца не может быть меньше времени начала',
        });
        return;
      }

      if (form.getValues('duration') !== newDuration) {
        console.log('updateDuration', newDuration);
        form.setValue('duration', newDuration);
      }
    }
  }, [endTime, form, startTime]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-4', className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <TextareaField control={form.control} name="description" placeholder="Описание" />
        <SelectProjectField control={form.control} name="project" />
        <TimeField control={form.control} name="duration" label="Длительность" format="HH:mm:ss" />

        <DateTimePickerField
          control={form.control}
          name="startTime"
          label="Начало"
          calenderProps={{
            disabled: {
              after: endTime || new Date('2100-01-01'),
            },
          }}
        />
        <DateTimePickerField
          control={form.control}
          name="endTime"
          label="Конец"
          calenderProps={{
            disabled: {
              before: startTime,
            },
          }}
        />
        <Button>{submitText}</Button>
      </form>
    </Form>
  );
}
