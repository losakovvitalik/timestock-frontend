'use client';

import { PopoverClose } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import { Paintbrush } from 'lucide-react';
import { useState } from 'react';
import { $api } from '../lib/api';
import { ApiEntityBase } from '../types/api';
import { Button, buttonVariants } from './button';
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

  const [background, setBackground] = useState<string>();

  const handleChange = (color: Color) => {
    onChange(color.documentId);
    setBackground(color.hex);
  };

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <div className="flex h-9 w-9 items-center justify-center">
          <button type="button">
            {value ? (
              <div
                className="h-7 w-7 rounded-full border transition-all"
                style={{ background }}
              ></div>
            ) : (
              <div
                className={buttonVariants({
                  variant: 'outline',
                  size: 'icon',
                })}
              >
                <Paintbrush className="h-4 w-4" />
              </div>
            )}
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="mt-0 flex flex-wrap gap-1">
          {solids?.map((s) => (
            <PopoverClose key={s.documentId} value={s.hex} onClick={() => handleChange(s)}>
              <div
                style={{ background: s.hex }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              />
            </PopoverClose>
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
