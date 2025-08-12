// components/Select/index.jsx
import { Combobox } from '@headlessui/react';
import SelectOptions from './SelectOptions';
import SelectOption from './SelectOption';
import SelectInput from './SelectInput';
import { useSelect } from '@/hooks/useSelect';
import InputLabel from '../InputLabel';
import PropTypes from 'prop-types';

// eslint-disable-next-line complexity
export default function Select(props) {
  const {
    name,
    label,
    placeholder,
    variant = 'static',
    isClearable = true,
    isRequired = false,
    isLabelHidden = false,
    className = '',
    isSearchIcon = false,
    isSearchIconPosition = 'left',
    options = [],
  } = props;

  const {
    inputValue,
    setInputValue,
    selectedOption,
    handleSelect,
    clearSelection,
    isLoading,
  } = useSelect(props);

  const filteredOptions = options?.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const noOptionsMessage =
    variant === 'search' && inputValue.length < 3
      ? 'Type at least 3 characters to search'
      : !isLoading && filteredOptions.length === 0 && 'No options available';

  return (
    <div className={`space-y-1 ${className}`}>
      <InputLabel
        htmlFor={name}
        label={label}
        show={isLabelHidden}
        isRequired={isRequired}
      />
      <Combobox
        value={selectedOption}
        immediate={variant === 'static'}
        onChange={handleSelect}
        nullable
      >
        <div className='relative'>
          <SelectInput
            placeholder={placeholder}
            displayValue={option => option?.label || ''}
            onChange={e => setInputValue(e.target.value)}
            isSearchIcon={isSearchIcon}
            isSearchIconPosition={isSearchIconPosition}
            hideSearchIcon={
              isSearchIcon &&
              isSearchIconPosition === 'right' &&
              isClearable &&
              !!selectedOption
            }
          />

          {isClearable && selectedOption && (
            <button
              type='button'
              onClick={clearSelection}
              className='icon-reject text-20 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            />
          )}
          <SelectOptions
            isLoading={isLoading}
            noOptionsMessage={noOptionsMessage}
            showEmpty={!isLoading && filteredOptions.length === 0}
          >
            {!isLoading &&
              filteredOptions.length > 0 &&
              filteredOptions.map(option => (
                <SelectOption key={option.value} option={option}>
                  {() => option.label}
                </SelectOption>
              ))}
          </SelectOptions>
        </div>
      </Combobox>
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['static', 'search']),
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  isErrorHidden: PropTypes.bool,
  className: PropTypes.string,
  isSearchIcon: PropTypes.bool,
  isSearchIconPosition: PropTypes.oneOf(['left', 'right']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
};
