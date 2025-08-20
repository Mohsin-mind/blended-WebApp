import cn from '@/lib/clsx';
import { ComboboxInput } from '@headlessui/react';
import { forwardRef } from 'react';

const SelectInput = forwardRef(
  (
    {
      placeholder,
      displayValue,
      onChange,
      isSearchIcon = '',
      isSearchIconPosition = 'left',
      hideSearchIcon = false,
      className = '',
    },
    ref
  ) => {
    const isLeft = isSearchIcon && isSearchIconPosition === 'left';
    const isRight = isSearchIcon && isSearchIconPosition === 'right';

    return (
      <div className='relative'>
        <ComboboxInput
          ref={ref}
          className={cn(
            className,
            'w-full rounded-xl py-3 text-black placeholder:text-grayDark font-medium font-open-sans bg-whiteSoft border border-black15 focus:outline-black/20',
            {
              'pl-12': isLeft && !hideSearchIcon,
              'pr-12': isRight && !hideSearchIcon,
              'pl-4': !isLeft || hideSearchIcon,
              'pr-4': !isRight || hideSearchIcon,
            }
          )}
          displayValue={displayValue}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete='off'
        />

        {isSearchIcon && !hideSearchIcon && (
          <span
            className={cn(
              isSearchIcon,
              'text-20 absolute top-1/2 -translate-y-1/2',
              {
                'left-4': isLeft,
                'right-4 mr-1': isRight,
              }
            )}
          />
        )}
      </div>
    );
  }
);

export default SelectInput;
