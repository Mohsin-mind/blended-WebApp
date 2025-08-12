import { ComboboxOption } from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function SelectOption({ option, children }) {
  return (
    <ComboboxOption key={option.value} value={option} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={`${
            active ? 'bg-grayLight text-black ' : 'text-gray-900'
          } relative cursor-pointer select-none py-2 pl-3 pr-9 font-open-sans`}
        >
          {children({ active, selected })}
          {selected && (
            <span
              className={`${
                active ? 'text-white' : 'text-gold'
              } absolute inset-y-0 right-0 flex items-center pr-4`}
            >
              ✓
            </span>
          )}
        </li>
      )}
    </ComboboxOption>
  );
}

SelectOption.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string,
  }).isRequired,
  children: PropTypes.func.isRequired,
};
