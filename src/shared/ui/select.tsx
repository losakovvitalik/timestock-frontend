'use client';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { Typography } from './typography';

export interface SelectProps<
  T = Record<string, any>,
  K extends keyof T = keyof T,
  L extends keyof T = keyof T,
> {
  options?: readonly T[];
  labelKey: L;
  valueKey: K;
  emptyText?: string;
  placeholder?: string;
  value?: T[K] | null;
  onChange?: (value: T[K] | null) => void;
  searchable?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  className?: string;
}

export function Select<
  T = Record<string, any>,
  K extends keyof T = keyof T,
  L extends keyof T = keyof T,
>({
  options = [],
  emptyText = 'Ничего не найдено',
  placeholder = 'Выберите значение',
  value: selectedValue,
  onChange,
  searchable,
  labelKey,
  valueKey,
  renderItem,
  className,
}: SelectProps<T, K, L>) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (currentOption: T) => {
    onChange?.(currentOption[valueKey]);
    setOpen(false);
  };

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      String(option[labelKey]).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, labelKey, searchTerm]);

  const currentOption = useMemo(
    () => options.find((op) => op[valueKey] === selectedValue),
    [options, valueKey, selectedValue],
  );

  const displayItem = (item: T) =>
    renderItem ? (
      renderItem(item)
    ) : (
      <Typography className="flex flex-wrap gap-1" title={String(item[labelKey])}>
        {String(item[labelKey])}
      </Typography>
    );

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'bg-input border-border grid h-10 cursor-pointer grid-cols-[1fr_auto] justify-items-start p-2 md:text-sm',
            className,
          )}
          variant="outline"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={currentOption ? String(currentOption[labelKey]) : placeholder}
        >
          {currentOption ? (
            displayItem(currentOption)
          ) : (
            <Typography className="w-full truncate text-left md:text-sm" variant="muted">
              {placeholder}
            </Typography>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          {searchable && (
            <CommandInput
              role="searchbox"
              placeholder="Поиск..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          )}
          <CommandList>
            <CommandEmpty>{emptyText || 'Ничего не найдено'}</CommandEmpty>
            <CommandGroup className="overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  className={cn('cursor-pointer')}
                  key={String(option[valueKey])}
                  value={String(option[valueKey])}
                  onSelect={() => handleChange(option)}
                  role="option"
                  aria-selected={option[valueKey] === selectedValue}
                >
                  {displayItem(option)}
                  <Check
                    className={cn(
                      'ml-auto',
                      option[valueKey] === selectedValue ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Select;
