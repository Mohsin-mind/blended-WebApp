import PropTypes from 'prop-types';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import CalendarChevron from './CalendarChevron';
import CalendarWeekNumber from './CalendarWeekNumber';
import cn from '@/lib/clsx';
import { ButtonVariants } from '../Button/ButtonVariants';
import { CalendarRoot } from './CalendarRoot';
import { CalendarDayButton } from './CalendarDayButton';
import CustomSelectDropdown from './CustomSelectDropdown';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      toDate={new Date()}
      disabled={{ after: new Date() }}
      className={cn(
        'font-open-sans bg-background group/calendar p-1',
        '[--cell-size:2.3rem]',
        '[[data-slot=card-content]_&]:bg-transparent',
        '[[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-1 md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-1', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          ButtonVariants({ variant: buttonVariant }),
          'h-8 w-8 select-none p-0 aria-disabled:opacity-50 hover:bg-gold hover:text-white',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          ButtonVariants({ variant: buttonVariant }),
          'h-8 w-8 select-none p-0 aria-disabled:opacity-50 hover:bg-gold hover:text-white',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border border-black15',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'bg-popover absolute inset-0 opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground flex-1 select-none rounded-md text-sm !font-bold',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full gap-1', defaultClassNames.week),
        week_number_header: cn(
          'w-[--cell-size] select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-muted-foreground select-none text-[0.8rem]',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day text-sm relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md hover:bg-gold hover:text-white rounded-full data-[selected=true]:rounded-full data-[selected=true]:bg-gold data-[selected=true]:text-white',
          defaultClassNames.day
        ),
        range_start: cn(
          'bg-accent rounded-l-md',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
        today: cn(
          'bg-gray text-accent-foreground rounded-full data-[selected=true]:rounded-full data-[selected=true]:bg-gold data-[selected=true]:text-white',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Dropdown: CustomSelectDropdown,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      {...props}
    />
  );
}

Calendar.propTypes = {
  className: PropTypes.string,
  classNames: PropTypes.object,
  showOutsideDays: PropTypes.bool,
  captionLayout: PropTypes.oneOf(['label', 'dropdown']),
  buttonVariant: PropTypes.string,
  formatters: PropTypes.object,
  components: PropTypes.object,
};

export default Calendar;
