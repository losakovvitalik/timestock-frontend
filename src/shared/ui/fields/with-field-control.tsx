import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FieldControl, FieldControlProps } from './field-control';

export function withFieldControl<TInputProps extends object>(
  Input: React.ComponentType<TInputProps>,
) {
  return function WrappedField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
  >(props: Omit<FieldControlProps<TFieldValues>, 'render'> & TInputProps) {
    const { control, name, description, label, required, fieldClassName, ...rest } = props as any;
    return (
      <FieldControl
        control={control as Control<TFieldValues>}
        name={name as TName}
        description={description}
        label={label}
        required={required}
        fieldClassName={fieldClassName}
        render={({ field }) => <Input {...field} {...(rest as TInputProps)} />}
      />
    );
  };
}
