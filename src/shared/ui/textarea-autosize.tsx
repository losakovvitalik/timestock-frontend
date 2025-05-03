import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { Textarea, TextareaProps } from './textarea';

export interface TextareaAutosizeProps extends TextareaProps {}

export function TextareaAutosize({ className, ...props }: TextareaAutosizeProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      className={cn('resize-none overflow-hidden', className)}
      ref={textareaRef}
      value={value || ''}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
