import { FieldValues } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '../date-time-picker';
import { FieldControl, FieldControlProps } from './field-control';

export interface RatingFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<DateTimePickerProps, 'onChange' | 'date'> {}

export function DateTimePickerField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...props
}: RatingFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={props.required}
      render={({ field }) => (
        <DateTimePicker
          onChange={field.onChange}
          date={field.value ? new Date(field.value) : undefined}
          {...props}
        />
      )}
    />
  );
}
