import cn from '@/lib/clsx';
import React from 'react';

export const CalendarRoot = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div data-slot='calendar' ref={ref} className={cn(className)} {...props} />
  );
});
