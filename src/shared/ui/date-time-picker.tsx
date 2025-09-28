import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Calendar, CalendarProps } from './calendar';
import DurationInput from './duration-input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DateTimePickerProps {
  date: undefined | Date;
  onChange: (date: undefined | Date) => void;
  calenderProps?: CalendarProps;
}

export function DateTimePicker({ date, onChange, calenderProps }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4">
      <div className="flex flex-col gap-3">
        <DurationInput
          value={format(date || new Date(), 'HH:mm')}
          onChange={(value) => {
            const [hours, minutes] = value.split(':');

            const newDate = date ? new Date(date) : new Date();
            newDate.setHours(parseInt(hours));
            newDate.setMinutes(parseInt(minutes));
            onChange(newDate);
          }}
          format="HH:mm"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between text-base font-normal"
            >
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              {...calenderProps}
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(newDate) => {
                console.log(newDate);
                newDate?.setHours(date?.getHours() || 0);
                newDate?.setMinutes(date?.getMinutes() || 0);
                console.log(newDate);
                onChange(newDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
