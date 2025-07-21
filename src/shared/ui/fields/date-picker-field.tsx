import { FieldValues } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '../date-picker';
import { FieldControl, FieldControlProps } from './field-control';

export interface RatingFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<DatePickerProps, 'onChange' | 'value'> {}

export function DatePickerField<T extends FieldValues>({
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
        <DatePicker onChange={field.onChange} value={new Date(field.value)} {...props} />
      )}
    />
  );
}
