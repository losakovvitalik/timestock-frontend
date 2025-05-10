'use client';

import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import { Paintbrush } from 'lucide-react';
import { $api } from '../lib/api';
import { cn } from '../lib/utils';
import { ApiEntityBase } from '../types/api';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ColorPickerProps {
  value: string;
  onChange: (background: string) => void;
  className?: string;
}

export interface Color extends ApiEntityBase {
  hex: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const { data: solids } = useQuery({
    queryFn: () => $api.get<{ data: Color[] }>('/colors'),
    queryKey: ['colors', 'list'],
    select: (res) => res.data.data,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {value ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: value }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            {/* <div className="flex-1 truncate">{value ? value : 'Выберите цвет'}</div> */}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
        <div className="mt-0 flex flex-wrap gap-1">
          {solids?.map((s) => (
            <div
              key={s.hex}
              style={{ background: s.hex }}
              className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              onClick={() => onChange(s.hex)}
            />
          ))}
        </div>

        <PopoverClose asChild>
          <Button className="mt-4 w-full" variant={'secondary'} size={'sm'}>
            Закрыть
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
