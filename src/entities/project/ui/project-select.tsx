import Select from '@/shared/ui/select';
import { useProjectGetAll } from '../hooks/use-project-get-all';

export function ProjectSelect() {
  const projectGetAll = useProjectGetAll();

  const options = projectGetAll.data?.data.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  return <Select options={options} />;
}
