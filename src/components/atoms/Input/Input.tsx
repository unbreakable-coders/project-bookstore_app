import * as React from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../Icon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  withSearchIcon?: boolean;
  withDefaultClassname?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      withSearchIcon = false,
      withDefaultClassname = true,
      className,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const baseClasses = withDefaultClassname
      ? [
          'flex h-10 w-full rounded-md border bg-card px-4 text-sm text-[#232323]',
          'border-input',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' ')
      : '';

    const paddingForIcon = withSearchIcon ? 'pl-10 pr-4' : '';

    return (
      <div className="relative">
        {withSearchIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="search" className="h-4 w-4 opacity-70" />
          </span>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(baseClasses, paddingForIcon, className)}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
