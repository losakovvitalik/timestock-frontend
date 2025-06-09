import { FieldValues } from 'react-hook-form';
import { Input, InputProps } from '../input';
import { FieldControl, FieldControlProps } from './field-control';

export interface TextFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<InputProps, 'name'> {}

export function TextField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...inputProps
}: TextFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={inputProps.required}
      render={({ field }) => <Input {...inputProps} {...field} />}
    />
  );
}
