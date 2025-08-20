import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import PropTypes from 'prop-types';
import CONST from '@/utils/constant';
import Calendar from './Calendar';
import { useDatePicker } from '@/hooks/useDatePicker';
import InputLabel from './InputLabel';
import InputError from './InputError';
import { useFormContext } from 'react-hook-form';
import cn from '@/lib/clsx';
import { useEffect, useState } from 'react';

function DatePickerField({
  name,
  label,
  isRequired = false,
  isLabelHidden = false,
  isErrorHidden = false,
  placeholder = 'Select date',
  dateFormat = 'MM/dd/yyyy',
  fromYear = CONST.MAGIC_NUMBERS.NINETEENTH_CENTURY,
  toYear = new Date().getFullYear(),
  className = '',
  showClear = true,
  Pill,
  ...props
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const { selectedDate, handleDateChange, clearDate, formattedDate } =
    useDatePicker({
      name,
      dateFormat,
    });

  const [displayMonth, setDisplayMonth] = useState(selectedDate ?? new Date());
  useEffect(() => {
    if (selectedDate) {
      setDisplayMonth(selectedDate);
    }
  }, [selectedDate]);

  const fieldError = errors?.[name]?.message;

  return (
    <Popover className={`relative ${className}`}>
      <InputLabel
        htmlFor={name}
        label={label}
        show={isLabelHidden}
        isRequired={isRequired}
      />
      <PopoverButton
        className={cn(
          'relative w-full rounded-xl pl-4 pr-9 py-3 placeholder:text-grayDark font-open-sans font-medium bg-gray/10 focus:outline-black/10',
          {
            'border border-black15 focus:outline-black/10': !fieldError,
            'border-2 border-red focus:outline-red': fieldError,
            'text-black': formattedDate,
            'text-grayDark': !formattedDate,
          }
        )}
        as='button'
      >
        <div className='flex justify-between items-start'>
          <span>{formattedDate || placeholder}</span>
          {Pill && <Pill date={formattedDate} />}
        </div>

        {showClear && selectedDate ? (
          <button
            type='button'
            onClick={e => {
              e.stopPropagation();
              clearDate();
            }}
            className='icon-reject text-20 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            aria-label='Clear date'
          />
        ) : (
          <span className='icon-calendar text-20 text-black absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600' />
        )}
      </PopoverButton>

      <PopoverPanel
        anchor='bottom start'
        className='absolute z-30 mt-2 w-auto bg-white rounded-md shadow-lg'
      >
        {({ close }) => (
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={date => {
              handleDateChange(date);
              setDisplayMonth(date);
              close();
            }}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            initialFocus
            fromYear={fromYear}
            toYear={toYear}
            captionLayout='dropdown'
            {...props}
          />
        )}
      </PopoverPanel>
      <InputError message={fieldError} show={isErrorHidden} />
    </Popover>
  );
}

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  isErrorHidden: PropTypes.bool,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  fromYear: PropTypes.number,
  toYear: PropTypes.number,
  className: PropTypes.string,
  showClear: PropTypes.bool,
  Pill: PropTypes.elementType,
};

DatePickerField.defaultProps = {
  Pill: () => null,
};

export default DatePickerField;
