import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDisplayDate = (input: Date | string): string => {
  const now = new Date();
  const date = new Date(input);
  const formatStr = date.getFullYear() === now.getFullYear() ? 'd MMM' : 'd MMM yyyy';

  return format(date, formatStr, { locale: ru });
};
