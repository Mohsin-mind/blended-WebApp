import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const DebounceDelay = 0;

export function useSelect(props) {
  const {
    name,
    loadOptions,
    variant,
    debounceDelay = DebounceDelay,
    options: externalOptions = [],
    isLoading: externalLoading = false,
  } = props;

  const { setValue, getValues, watch } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const watchedValue = watch(name);

  // Debounced input for search-type selects
  useEffect(() => {
    const handler = setTimeout(() => {
      if (variant === 'search' && loadOptions) {
        loadOptions(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay, loadOptions, variant]);

  // Renamed parameters to avoid shadowing
  const getAllOptions = (v, extOpts, propOpts) => {
    return v === 'search' ? extOpts : propOpts || [];
  };

  const shouldInjectCityObject = (fieldName, val, opts) => {
    return (
      fieldName === 'city_id' &&
      typeof val === 'object' &&
      val.value &&
      val.label &&
      !opts.find(opt => opt.value === val.value)
    );
  };

  const findMatchedOption = (val, opts) => {
    if (typeof val === 'object') {
      return opts.find(opt => opt.value === val.value);
    }
    return opts.find(opt => opt.value === val);
  };

  useEffect(() => {
    const currentVal = getValues(name);
    if (!currentVal) {
      setSelectedOption(null);
      return;
    }

    let allOptions = getAllOptions(variant, externalOptions, props.options);

    if (shouldInjectCityObject(name, currentVal, allOptions)) {
      allOptions = [currentVal, ...allOptions];
    }

    const matched = findMatchedOption(currentVal, allOptions);
    if (matched) {
      setSelectedOption(matched);
    }
  }, [externalOptions, props.options, getValues, name, variant, watchedValue]);

  const handleSelect = option => {
    setSelectedOption(option);
    setValue(name, option?.value || '', { shouldValidate: true });
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setValue(name, '', { shouldValidate: true });
  };

  return {
    inputValue,
    setInputValue,
    options:
      name === 'city_id'
        ? selectedOption
          ? [
              selectedOption,
              ...externalOptions.filter(
                opt => opt.value !== selectedOption.value
              ),
            ]
          : externalOptions
        : props.options || [],
    selectedOption,
    isLoading: externalLoading,
    handleSelect,
    clearSelection,
    currentValue: getValues(name),
  };
}
