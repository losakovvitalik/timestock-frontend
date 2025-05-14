import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDisplayDate = (date: Date): string => {
  const now = new Date();
  const formatStr = date.getFullYear() === now.getFullYear() ? 'd MMM' : 'd MMM yyyy';

  return format(date, formatStr, { locale: ru });
};
