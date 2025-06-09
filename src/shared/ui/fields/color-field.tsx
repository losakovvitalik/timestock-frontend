import { $api } from '@/shared/lib/api';
import { ApiEntityBase } from '@/shared/types/api';
import { useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { ColorPicker, ColorPickerItem } from '../color-picker';
import { InputProps } from '../input';
import { FieldControl, FieldControlProps } from './field-control';

export interface ColorFieldProps<T extends FieldValues>
  extends Omit<FieldControlProps<T>, 'render'>,
    Omit<InputProps, 'name'> {}

interface Color extends ApiEntityBase {
  hex: string;
}

export function ColorField<T extends FieldValues>({
  name,
  control,
  description,
  label,
  ...inputProps
}: ColorFieldProps<T>) {
  const { data: colorsData } = useQuery({
    queryFn: () => $api.get<{ data: Color[] }>('/colors'),
    queryKey: ['colors', 'list'],
    select: (res) => res.data.data,
  });

  const colors: ColorPickerItem[] | undefined = colorsData?.map((color) => ({
    hex: color.hex,
    value: color.documentId,
  }));

  return (
    <FieldControl
      name={name}
      control={control}
      description={description}
      label={label}
      required={inputProps.required}
      render={({ field }) => <ColorPicker colors={colors} {...inputProps} {...field} />}
    />
  );
}
