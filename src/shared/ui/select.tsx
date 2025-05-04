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
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Typography } from './typography';

type ValueType = number | string;

export interface SelectOption<T = ValueType> {
  value: T;
  label: string;
}

export interface SelectProps<T = ValueType> {
  options?: SelectOption<T>[];
  emptyText?: string;
  placeholder?: string;
  value?: T | null;
  onChange?: (value: T | null) => void;
  searchable?: boolean;
}

export function Select<T extends ValueType>({
  options = [],
  emptyText = 'Ничего не найдено',
  placeholder = 'Выберите значение',
  value: selectedValue,
  onChange,
  searchable,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (currentOptions: SelectOption<T>) => {
    onChange?.(currentOptions.value);
    setOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    String(option.label).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentOption = options.find((op) => op.value === selectedValue);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="bg-input border-border grid h-10 w-full cursor-pointer grid-cols-[1fr_auto] justify-items-start p-2"
          variant="outline"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={currentOption ? String(currentOption.label) : placeholder}
        >
          {currentOption ? (
            <Typography className="flex flex-wrap gap-1" title={currentOption?.label}>
              {currentOption?.label}
            </Typography>
          ) : (
            <Typography className="w-full truncate text-left" variant={'muted'}>
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
                  className="cursor-pointer"
                  key={option.value}
                  onSelect={() => handleChange(option)}
                  role="option"
                  aria-selected={option.value === selectedValue}
                >
                  <Typography>{option.label}</Typography>
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
