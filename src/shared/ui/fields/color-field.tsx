import { FieldValues } from 'react-hook-form';
import { ColorPicker } from '../color-picker';
import { InputProps } from '../input';
import FieldControl, { FieldControlProps } from './field-control';

export interface ColorFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<InputProps, 'name'> {}

export function ColorField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...inputProps
}: ColorFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={inputProps.required}
      render={({ field }) => <ColorPicker {...inputProps} {...field} />}
    />
  );
}
