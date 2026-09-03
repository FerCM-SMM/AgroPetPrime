import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

export function Label({ className, ...props }: ComponentPropsWithoutRef<typeof import('react').LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}
