import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { FormControl } from './form';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerProps {
  value: Date;
  onChange: (v: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) onChange(date);
          }}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
