import { FieldValues } from 'react-hook-form';
import { Rating, RatingButton, RatingProps } from '../rating';
import { FieldControl, FieldControlProps } from './field-control';

export interface RatingFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<RatingProps, 'onValueChange' | 'value'> {}

export function RatingField<T extends FieldValues>({
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
        <Rating {...props} onValueChange={field.onChange} value={field.value}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} />
          ))}
        </Rating>
      )}
    />
  );
}
