import { useUser } from '@/entities/user/hooks/use-user';
import { SelectField, SelectFieldProps } from '@/shared/ui/fields/select-field';
import { Typography } from '@/shared/ui/typography';
import { FieldValues } from 'react-hook-form';
import { projectApiHooks } from '../api/project-api-hooks';

export function SelectProjectField<T extends FieldValues>(
  props: Omit<SelectFieldProps<T>, 'options' | 'labelKey' | 'valueKey'>,
) {
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

  const options = allProjects
    ? [{ name: 'Нет проекта', documentId: null }, ...allProjects?.data]
    : [];

  return (
    <SelectField
      {...props}
      options={options}
      labelKey="name"
      valueKey="documentId"
      placeholder={isProjectsLoading ? 'Загрузка...' : 'Выберите проект'}
      renderItem={(project) => (
        <div className="flex items-center gap-1">
          {'color' in project && (
            <div
              className="size-4 rounded-full"
              style={{
                backgroundColor: project?.color?.hex,
              }}
            />
          )}
          <Typography>{project.name}</Typography>
        </div>
      )}
    />
  );
}
