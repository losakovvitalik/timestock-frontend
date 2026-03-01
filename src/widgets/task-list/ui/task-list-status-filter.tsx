import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const TASK_STATUSES = {
  ALL: 'all',
  COMPLETED: 'completed',
  NOT_COMPLETED: 'not_completed',
  ARCHIVED: 'archived',
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export interface TaskListStatusFilterProps {
  value: TaskStatus;
  onValueChange: (value: TaskStatus) => void;
}

export function TaskListStatusFilter({ value, onValueChange }: TaskListStatusFilterProps) {
  return (
    <Tabs value={value} onValueChange={(val: string) => onValueChange(val as TaskStatus)}>
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value={TASK_STATUSES.NOT_COMPLETED}>В работе</TabsTrigger>
        <TabsTrigger value={TASK_STATUSES.ALL}>Все</TabsTrigger>
        <TabsTrigger value={TASK_STATUSES.COMPLETED}>Выполненные</TabsTrigger>
        <TabsTrigger value={TASK_STATUSES.ARCHIVED}>Архив</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
