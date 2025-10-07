import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../form';

export interface FieldControlProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
  render: ({ field }: { field: ControllerRenderProps<T, Path<T>> }) => React.ReactNode;
  fieldClassName?: string;
}

export type FieldProps<T extends FieldValues, P> = Omit<FieldControlProps<T>, 'render'> & {
  inputProps?: P;
};

export interface FieldControlBaseProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'> {
  fieldClassName?: string;
}

export function FieldControl<T extends FieldValues>({
  name,
  control,
  label,
  required,
  description,
  render,
  fieldClassName,
}: FieldControlProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={fieldClassName}>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
