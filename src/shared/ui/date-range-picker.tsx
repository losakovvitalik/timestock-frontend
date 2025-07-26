'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange, Matcher } from 'react-day-picker';

import { useEffect } from 'react';
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
  const [temp, setTemp] = React.useState<DateRange | undefined>();

  useEffect(() => {
    if (!open) {
      setTemp(undefined);
    }
  }, [open]);

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
          className="flex max-h-[90vh] w-auto justify-center overflow-y-auto border-none bg-transparent p-0"
          align="start"
        >
          <div className="bg-popover">
            <Calendar
              mode="range"
              numberOfMonths={2}
              className="bg-background rounded-lg border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              selected={temp ?? value}
              captionLayout="dropdown"
              disabled={
                [...(min ? [{ before: min }] : []), ...(max ? [{ after: max }] : [])] as Matcher[]
              }
              max={30}
              onSelect={(range) => {
                if (!temp) {
                  setTemp(range ?? undefined);
                } else if (range?.from && range.to) {
                  onChange(range as DateRange);
                  setTemp(undefined);
                  setOpen(false);
                } else if (!range) {
                  onChange({ from: temp.from!, to: temp.from! });
                  setTemp(undefined);
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
