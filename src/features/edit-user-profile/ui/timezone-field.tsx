import { SelectField, SelectFieldProps } from '@/shared/ui/fields/select-field';
import { FieldValues } from 'react-hook-form';

export const russianTimezones: { value: string; label: string }[] = [
  { value: 'Europe/Moscow', label: 'Москва (UTC+3)' },
  { value: 'Europe/Samara', label: 'Самара (UTC+4)' },
  { value: 'Asia/Yekaterinburg', label: 'Екатеринбург (UTC+5)' },
  { value: 'Asia/Omsk', label: 'Омск (UTC+6)' },
  { value: 'Asia/Krasnoyarsk', label: 'Красноярск (UTC+7)' },
  { value: 'Asia/Irkutsk', label: 'Иркутск (UTC+8)' },
  { value: 'Asia/Yakutsk', label: 'Якутск (UTC+9)' },
  { value: 'Asia/Vladivostok', label: 'Владивосток (UTC+10)' },
  { value: 'Asia/Sakhalin', label: 'Сахалин (UTC+11)' },
  { value: 'Asia/Kamchatka', label: 'Камчатка (UTC+12)' },
];

export function TimezoneField<T extends FieldValues>(
  props: Omit<SelectFieldProps<T>, 'options' | 'labelKey' | 'valueKey'>,
) {
  return (
    <SelectField
      {...props}
      control={props.control}
      name={props.name}
      label="Часовой пояс"
      labelKey="label"
      valueKey="value"
      options={russianTimezones}
    />
  );
}
