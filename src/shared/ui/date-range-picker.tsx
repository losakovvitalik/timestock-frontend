'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange, Matcher } from 'react-day-picker';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  min?: Date;
  max?: Date;
}

function DateRangePicker({ value, onChange, min, max }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = React.useMemo(() => {
    if (value?.from && value.to) {
      return `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`;
    }

    if (value?.from) {
      return value.from.toLocaleDateString();
    }

    return 'Выберите период';
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-range"
            className="w-full justify-between py-1 text-base font-normal"
          >
            {displayValue}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[var(--radix-popover-trigger-width)] justify-center overflow-hidden border-none bg-transparent p-0"
          align="start"
        >
          <div className="bg-popover">
            <Calendar
              mode="range"
              numberOfMonths={2}
              className="bg-background rounded-lg border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              selected={value}
              captionLayout="dropdown"
              disabled={
                [...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])] as Matcher[]
              }
              max={30}
              onSelect={(range) => {
                if (range?.from && range.to) {
                  onChange(range as DateRange);
                  setOpen(false);
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DateRangePicker };
