import { ComboboxOptions } from '@headlessui/react';
import PropTypes from 'prop-types';
import Loader from '../../Loader';

export default function SelectOptions({
  children,
  isLoading,
  showEmpty,
  noOptionsMessage,
}) {
  return (
    <ComboboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
      {isLoading ? (
        <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
          <Loader color='black' size='20' />
        </div>
      ) : showEmpty ? (
        <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
          {noOptionsMessage}
        </div>
      ) : (
        children
      )}
    </ComboboxOptions>
  );
}

SelectOptions.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  showEmpty: PropTypes.bool,
  noOptionsMessage: PropTypes.string,
};
