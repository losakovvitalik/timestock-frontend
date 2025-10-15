import { ProjectSelect, ProjectSelectProps } from '@/entities/project/ui/project-select';
import { FieldControl, FieldControlProps } from '@/shared/ui/fields/field-control';
import { FieldValues } from 'react-hook-form';

export interface SelectFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<ProjectSelectProps, 'onChange' | 'value'> {}

export function SelectProjectField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...props
}: SelectFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={props.required}
      render={({ field }) => <ProjectSelect {...props} {...field} />}
    />
  );
}
