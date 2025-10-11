import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface TooltipWrapperProps {
  children?: React.ReactElement;
  /** Текст, который будет отображаться при наведении на children */
  title?: string;
}

export function TooltipWrapper({ title, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={2000}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent variant="secondary">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
