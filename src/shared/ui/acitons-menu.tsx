import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

export interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  separator?: boolean;
}

interface ActionsMenuProps {
  actions: Action[];
  triggerIcon?: React.ReactNode;
  triggerVariant?: 'ghost' | 'outline' | 'secondary';
  align?: 'start' | 'end' | 'center';
}

export function ActionsMenu({
  actions,
  triggerIcon = <MoreHorizontal className="h-4 w-4" />,
  triggerVariant = 'ghost',
  align = 'end',
}: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8" variant={triggerVariant} size="icon">
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={action.onClick}
              className={cn('gap-0 text-xs', {
                'text-destructive [&_svg]:stroke-destructive hover:[&_svg]:stroke-white':
                  action.variant === 'destructive',
              })}
            >
              {action.icon && (
                <div className="mr-2 [&>svg]:size-3 [&>svg]:duration-100">{action.icon}</div>
              )}
              {action.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
