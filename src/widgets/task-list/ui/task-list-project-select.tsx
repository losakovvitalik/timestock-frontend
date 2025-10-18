import { ProjectSelect } from '@/entities/project/ui/project-select';

export interface TaskListProjectSelectProps {
  value: string | null;
  onProjectSelect: (value: string | null) => void;
}

export function TaskListProjectSelect({ onProjectSelect, value }: TaskListProjectSelectProps) {
  return <ProjectSelect value={value} onChange={onProjectSelect} className="w-[150px]" />;
}
