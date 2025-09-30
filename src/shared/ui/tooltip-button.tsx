import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface TooltipButtonProps {
  children?: React.ReactElement<typeof Button>;
  title?: string;
}

export function TooltipButton({ title, children }: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={2000}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
