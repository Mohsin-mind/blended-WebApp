import React from 'react';
import { getDefaultClassNames } from 'react-day-picker';
import cn from '@/lib/clsx';
import PropTypes from 'prop-types';
import { ButtonVariants } from '../Button/ButtonVariants';

export const CalendarDayButton = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ className, day, modifiers, ...props }, ref) => {
    const defaultClassNames = getDefaultClassNames();

    // Add null check for ref
    const buttonRef = React.useRef(null);
    React.useEffect(() => {
      if (modifiers.focused && buttonRef.current) {
        buttonRef.current.focus();
      }
    }, [modifiers.focused]);

    const variant = 'ghost';
    const size = 'icon';

    return (
      <button
        ref={buttonRef}
        data-day={day?.date?.toLocaleDateString()}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        className={cn(
          ButtonVariants({ variant, size, className }),
          'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70',
          defaultClassNames.day,
          className
        )}
        {...props}
      />
    );
  }
);

CalendarDayButton.displayName = 'CalendarDayButton';

CalendarDayButton.propTypes = {
  className: PropTypes.string,
  day: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
  }),
  modifiers: PropTypes.shape({
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    range_start: PropTypes.bool,
    range_end: PropTypes.bool,
    range_middle: PropTypes.bool,
  }),
};
