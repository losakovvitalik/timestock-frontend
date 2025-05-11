import { SelectField, SelectFieldProps } from '@/shared/ui/fields/select-field';
import { Typography } from '@/shared/ui/typography';
import { FieldValues } from 'react-hook-form';
import { projectApiHooks } from '../api/project-api-hooks';

export function SelectProjectField<T extends FieldValues>(
  props: Omit<SelectFieldProps<T>, 'options' | 'labelKey' | 'valueKey'>,
) {
  const allProjects = projectApiHooks.useList({
    populate: {
      color: true,
    },
  });
  const options = allProjects.data?.data || [];

  return (
    <SelectField
      {...props}
      options={options}
      labelKey="name"
      valueKey="documentId"
      placeholder={allProjects.isLoading ? 'Загрузка...' : 'Выберите проект'}
      renderItem={(project) => (
        <div className="flex items-center gap-1">
          <div
            className="size-4 rounded-full"
            style={{
              backgroundColor: project.color.hex,
            }}
          />
          <Typography>{project.name}</Typography>
        </div>
      )}
    />
  );
}
