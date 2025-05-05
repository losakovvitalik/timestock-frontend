import { FieldValues } from 'react-hook-form';
import Select, { SelectProps } from '../select';
import FieldControl, { FieldControlProps } from './field-control';

export interface SelectFieldProps<T extends FieldValues, OpType = Record<any, any>>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<SelectProps<OpType>, 'onChange' | 'value'> {}

export function SelectField<T extends FieldValues, OpType extends Record<any, any>>({
  name,
  control,
  description,
  label,
  ...props
}: SelectFieldProps<T, OpType>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={props.required}
      render={({ field }) => <Select {...props} {...field} />}
    />
  );
}
