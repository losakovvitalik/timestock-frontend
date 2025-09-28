import { FieldValues } from 'react-hook-form';
import DurationInput, { TimeInputProps } from '../duration-input';
import { FieldControl, FieldControlProps } from './field-control';

export interface TimeFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<TimeInputProps, 'name'> {}

export function DurationField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...props
}: TimeFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={props.required}
      render={({ field }) => <DurationInput {...props} {...field} />}
    />
  );
}
