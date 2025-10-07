import { Switch } from '../switch';
import { withFieldControl } from './with-field-control';

// export interface BooleanFieldProps<T extends FieldValues>
//   extends Omit<FieldControlProps<T>, 'render'>,
//     Omit<SwitchProps, 'onChange' | 'value' | 'name'> {}

// export function BooleanField<T extends FieldValues>({
//   control,
//   name,
//   description,
//   label,
//   ...props
// }: BooleanFieldProps<T>) {
//   return (
//     <FieldControl
//       name={name}
//       control={control}
//       description={description}
//       label={label}
//       render={({ field }) => <Switch {...field} {...props} />}
//     />
//   );
// }

export const BooleanField = withFieldControl(Switch);
