import { FieldValues } from 'react-hook-form';
import { TextareaAutosize, TextareaAutosizeProps } from '../textarea-autosize';
import FieldControl, { FieldControlProps } from './field-control';

export interface TextFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<TextareaAutosizeProps, 'name'> {}

export function TextareaField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...props
}: TextFieldProps<T>) {
  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={props.required}
      render={({ field }) => <TextareaAutosize {...props} {...field} />}
    />
  );
}
