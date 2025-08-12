import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { format, parseISO } from 'date-fns';

export function useDatePicker({ name, dateFormat = 'MM/dd/yyyy' }) {
  const { setValue, getValues, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const dateValue = watch(name);

  // Handle both Date objects and ISO strings
  const selectedDate = dateValue
    ? typeof dateValue === 'string'
      ? parseISO(dateValue)
      : dateValue
    : null;

  const handleDateChange = date => {
    setValue(name, date, { shouldValidate: true });
    setIsOpen(false);
  };

  const clearDate = () => {
    setValue(name, null, { shouldValidate: true });
  };

  return {
    isOpen,
    setIsOpen,
    selectedDate,
    handleDateChange,
    clearDate,
    formattedDate: selectedDate ? format(selectedDate, dateFormat) : '',
    currentValue: getValues(name),
  };
}
