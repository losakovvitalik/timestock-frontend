import { ProjectDTO } from '@/entities/project/models/types';
import { useUser } from '@/entities/user';
import { cn } from '@/shared/lib/utils';
import Select, { SelectProps } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';
import { projectApiHooks } from '../api/project-api-hooks';

export interface ProjectSelectProps extends Omit<
  SelectProps<ProjectDTO, 'documentId', 'name'>,
  'options' | 'labelKey' | 'valueKey'
> {}

export function ProjectSelect({ className, ...props }: ProjectSelectProps) {
  const { user } = useUser();
  const { data: allProjects, isLoading: isProjectsLoading } = projectApiHooks.useList({
    params: {
      populate: {
        color: true,
      },
      filters: {
        members: user?.id,
      },
    },
    options: { enabled: Boolean(user?.id) },
  });

  const options = allProjects ? [{ name: 'Все', documentId: null }, ...allProjects?.data] : [];

  return (
    <Select
      {...props}
      options={options}
      labelKey="name"
      valueKey="documentId"
      placeholder={isProjectsLoading ? 'Загрузка...' : 'Выберите проект'}
      className={cn('h-9 w-full truncate', className)}
      renderItem={(project) => (
        <div
          className={cn('grid grid-cols-[16px_1fr] items-center gap-1', {
            'grid-cols-1': !('color' in project),
          })}
        >
          {'color' in project && (
            <div
              className="min-h-4 min-w-4 rounded-full"
              style={{
                backgroundColor: project?.color?.hex,
              }}
            />
          )}
          <Typography className="truncate md:text-sm">{project.name}</Typography>
        </div>
      )}
    />
  );
}
