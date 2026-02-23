import { forwardRef } from 'react';
import { Switch, SwitchProps } from '../switch';
import { withFieldControl } from './with-field-control';

const SwitchAdapter = forwardRef<
  HTMLButtonElement,
  Omit<SwitchProps, 'checked' | 'onCheckedChange'> & {
    value?: boolean;
    onChange?: (value: boolean) => void;
  }
>(({ value, onChange, ...props }, ref) => (
  <Switch ref={ref} checked={value} onCheckedChange={onChange} {...props} />
));
SwitchAdapter.displayName = 'SwitchAdapter';

export const BooleanField = withFieldControl(SwitchAdapter);
