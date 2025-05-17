import { PopoverClose } from '@radix-ui/react-popover';
import { Paintbrush } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button, buttonVariants } from './button';
import { Loader } from './loader';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ColorPickerItem {
  hex: string;
  value: string;
}

export interface ColorPickerProps {
  value: string;
  onChange: (background: string) => void;
  className?: string;
  colors?: ColorPickerItem[];
}

export function ColorPicker({ value, onChange, className, colors }: ColorPickerProps) {
  const [background, setBackground] = useState<string>();

  const handleChange = useCallback(
    (color: ColorPickerItem) => {
      onChange(color.value);
      setBackground(color.hex);
    },
    [onChange],
  );

  useEffect(() => {
    const curr = colors?.find((color) => color.value === value);
    if (curr) handleChange(curr);
  }, [colors, handleChange, value]);

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
          {!colors && <Loader />}
          {colors?.map((s) => (
            <PopoverClose key={s.value} value={s.hex} onClick={() => handleChange(s)}>
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
