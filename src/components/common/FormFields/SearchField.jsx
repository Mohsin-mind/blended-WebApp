import PropTypes from 'prop-types';
import { classNames } from '@/utils/helper';

function SearchField({
  placeholder = 'Search...',
  className = '',
  inputClassName = '',
  value,
  onChange,
  onSearch,
  disabled = false,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={className}>
      <div className='relative'>
        {/* Search Icon - Left Side */}
        <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base pointer-events-none'>
          <i className='icon-search' />
        </div>

        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={classNames(
            'w-full border border-blended-gray_7 bg-white px-4 py-2 text-base focus:outline-none rounded-md',
            'placeholder:text-gray-400 font-medium',
            'pl-10', // Left padding for icon
            'focus:ring-1 focus:ring-blended-blue_3 focus:border-blended-blue_3',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            inputClassName
          )}
          {...props}
        />
      </div>
    </div>
  );
}

SearchField.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func, // Called when Enter is pressed
  disabled: PropTypes.bool,
};

export default SearchField;
