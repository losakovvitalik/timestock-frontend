import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '../lib/utils';
import { Form, FormControl, FormField, FormItem } from './form';
import { Input, InputProps } from './input';

export interface SearchInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  containerClassName?: string;
  className?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
}

interface SearchForm {
  search: string;
}

export function SearchInput({
  containerClassName,
  className,
  onSearch,
  defaultValue,
  ...inputProps
}: SearchInputProps) {
  const form = useForm<SearchForm>({
    defaultValues: {
      search: defaultValue || '',
    },
  });

  const search = form.watch('search');
  const isFirstRender = useRef(true);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearchRef.current(value);
  }, 800);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (search === '') {
      debouncedSearch.cancel();
      onSearchRef.current('');
      return;
    }

    debouncedSearch(search);
  }, [search, debouncedSearch, onSearchRef]);

  const handleClear = () => {
    form.setValue('search', '');
    form.setFocus('search');
  };

  const handleSubmit = ({ search }: SearchForm) => {
    debouncedSearch.cancel();
    onSearchRef.current(search);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} role="search" className={containerClassName}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn('relative')}>
                  <Input
                    className={cn('h-9 appearance-none pr-[68px]', className)}
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
