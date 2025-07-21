import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerProps {
  value?: Date;
  onChange: (v: Date | undefined) => void;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between py-1 text-base font-normal"
          >
            {value ? value.toLocaleDateString() : 'Выберите дату'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[var(--radix-popover-trigger-width)] justify-center overflow-hidden border-none bg-transparent p-0"
          align="start"
        >
          <div className="bg-popover w-max">
            <Calendar
              mode="single"
              className="bg-background rounded-lg border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
