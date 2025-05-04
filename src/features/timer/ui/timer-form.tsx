'use client';

import { ProjectSelect } from '@/entities/project/ui/project-select';
import { useActiveTimeEntry } from '@/entities/time-entry/hooks/use-active-time-entry';
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields';
import { Form } from '@/shared/ui/form';
import { Pause, Play } from 'lucide-react';
import { useStartTimer } from '../hooks/use-start-timer';
import { useStopTimer } from '../hooks/use-stop-timer';
import { useTimerForm } from '../hooks/use-timer-form';
import { TimerFormSchemaType } from '../model/timer-form-schema';

export function TimerForm() {
  const startTimer = useStartTimer();
  const stopTimer = useStopTimer();
  const { data: activeTimeEntry } = useActiveTimeEntry();
  const form = useTimerForm();

  const handleSubmit = (data: TimerFormSchemaType) => {
    if (activeTimeEntry) {
      form.reset();
      stopTimer.mutate();
    } else {
      startTimer.mutate({
        name: data.name,
        project: data.project,
      });
    }
  };

  const isPending = form.formState.isSubmitting || startTimer.isPending || stopTimer.isPending;

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <TextField
            control={form.control}
            name="name"
            placeholder="Описание"
            disabled={isPending}
          />

          <ProjectSelect />

          <Button className="size-24 rounded-full" disabled={isPending} type="submit">
            {activeTimeEntry ? (
              <Pause className="size-12 fill-white stroke-white" />
            ) : (
              <Play className="size-12 fill-white stroke-white" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
