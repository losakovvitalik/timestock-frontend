import { useProjectGetAll } from '@/entities/project/hooks/use-project-get-all';
import { SelectField, SelectFieldProps } from '@/shared/ui/fields/select-field';
import { Typography } from '@/shared/ui/typography';
import { FieldValues } from 'react-hook-form';

export function SelectProjectField<T extends FieldValues>(
  props: Omit<SelectFieldProps<T>, 'options' | 'labelKey' | 'valueKey'>,
) {
  const allProjects = useProjectGetAll();
  const options = allProjects.data?.data || [];

  return (
    <SelectField
      {...props}
      options={options}
      labelKey="name"
      valueKey="documentId"
      renderItem={(project) => (
        <div className="flex items-center gap-1">
          <div
            className="size-4 rounded-full"
            style={{
              backgroundColor: project.color,
            }}
          />
          <Typography>{project.name}</Typography>
        </div>
      )}
    />
  );
}
