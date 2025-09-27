import { FieldValues } from 'react-hook-form';
import { Switch, SwitchProps } from '../switch';
import { FieldControl, FieldControlProps } from './field-control';

export interface BooleanFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'> {
  fieldProps?: Omit<SwitchProps, 'onChange' | 'value' | 'name'>;
}

export function BooleanField<T extends FieldValues>({
  fieldProps,
  ...props
}: BooleanFieldProps<T>) {
  return <FieldControl {...props} render={({ field }) => <Switch {...field} {...fieldProps} />} />;
}
