import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import cn from '@/lib/clsx';

export default function CustomSelectDropdown({ options, value, onChange }) {
  const selectedOption = options?.find(
    opt => opt.value.toString() === value?.toString()
  );

  return (
    <Listbox
      value={value}
      onChange={val => {
        // simulate native select event
        onChange?.({
          target: {
            value: val,
          },
        });
      }}
    >
      <div className='relative w-1/3'>
        <ListboxButton
          className={cn(
            'relative w-full cursor-pointer rounded-md border border-black15 bg-white py-1.5 pl-3 pr-8 text-left text-sm font-medium text-black',
            'focus:outline focus:outline-2 focus:outline-blue-400'
          )}
        >
          {selectedOption?.label || 'Select'}
          <i
            className='icon-arrow-down absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400'
            aria-hidden='true'
          />
        </ListboxButton>

        <ListboxOptions className='absolute z-10 mt-1 max-h-48 w-full overflow-y-auto overflow-x-hidden rounded-md bg-white shadow-md ring-1 ring-black/10 focus:outline-none text-sm'>
          {options.map(option => (
            <ListboxOption
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
              className={({ active, selected, disabled }) =>
                cn(
                  'cursor-pointer select-none px-4 py-2',
                  active && 'bg-blue-100 text-blue-900',
                  selected && 'font-semibold',
                  disabled && 'opacity-50 cursor-not-allowed'
                )
              }
            >
              <div className='flex items-center justify-between gap-x-2'>
                {option.label}
                {option.value === value && <span className='text-gold'>✓</span>}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
