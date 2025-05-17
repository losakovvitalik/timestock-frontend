'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../lib/utils';
import { Form, FormControl, FormField, FormItem } from './form';
import { Input, InputProps } from './input';

export interface SearchInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  containerClassName?: string;
  className?: string;
  onSearch: (value: string) => void;
}

interface SearchForm {
  search: string;
}

export function SearchInput({
  containerClassName,
  className,
  onSearch,
  ...inputProps
}: SearchInputProps) {
  const form = useForm<SearchForm>();
  const search = form.watch('search');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 800);

  useEffect(() => {
    if (search === '') {
      debouncedSearch.cancel();
      onSearch('');
      return;
    }

    debouncedSearch(search);
  }, [search, debouncedSearch, onSearch]);

  const handleClear = () => {
    form.setValue('search', '');
    form.setFocus('search');
  };

  const handleSubmit = ({ search }: SearchForm) => {
    debouncedSearch.cancel();
    onSearch(search);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} role="search">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn('relative my-1', containerClassName)}>
                  <Input
                    className={cn('h-10 appearance-none pr-[68px]', className)}
                    role="searchbox"
                    type="search"
                    {...inputProps}
                    {...field}
                  />
                  <div className="absolute top-0 right-2 flex h-full items-center gap-1">
                    {field.value && (
                      <button
                        className="cursor-pointer p-1"
                        onClick={handleClear}
                        aria-label="Очистить поиск"
                        type="button"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
