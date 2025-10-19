'use client';
import { useState } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { cn } from '../lib/utils';

export interface TimeInputProps {
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  format?: 'HH:mm' | 'HH:mm:ss';
  unmask?: boolean;
}

const DurationInput = ({
  onChange,
  onBlur,
  value,
  className,
  disabled,
  unmask = false,
  format = 'HH:mm:ss',
  placeholder = format === 'HH:mm' ? '00:00' : '00:00:00',
  ...props
}: TimeInputProps) => {
  const [isEmpty, setIsEmpty] = useState(!value);

  return (
    <IMaskInput
      mask={format}
      unmask={unmask}
      lazy={false}
      overwrite
      placeholderChar="0"
      blocks={{
        HH: { mask: IMask.MaskedRange, from: 0, to: 99, maxLength: 2 },
        mm: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
        ...(format === 'HH:mm:ss' && {
          ss: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
        }),
      }}
      onAccept={(val) => {
        setIsEmpty(!val);
        if (val) {
          onChange?.(val);
        }
      }}
      type="tel"
      aria-label="Время в формате часы:минуты:секунды"
      placeholder={isEmpty ? placeholder : ''}
      value={value as string}
      onBlur={onBlur}
      disabled={disabled}
      className={cn(
        'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        isEmpty ? 'text-muted-foreground' : 'text-foreground',
        className,
      )}
      {...props}
    />
  );
};

export default DurationInput;
