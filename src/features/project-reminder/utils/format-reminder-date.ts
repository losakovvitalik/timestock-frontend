import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatReminderDate(date: string) {
  return format(new Date(date), "d MMMM 'в' HH:mm", { locale: ru });
}
