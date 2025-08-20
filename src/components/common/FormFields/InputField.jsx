import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputLabel from './InputLabel';
import InputError from './InputError';
import PasswordEyeButton from './PasswordEyeButton';
import { useState } from 'react';
import { useFormLoading } from '@/contexts/FormLoadingContext';
import { classNames } from '@/utils/helper';

function InputField({
  name,
  label,
  type = 'text',
  placeholder,
  className = '',
  isLabelHidden = false,
  isErrorHidden = false,
  isRequired = true,
  icon = null,
  inputClassName = '',
  labelClassName = '',
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const loading = useFormLoading();
  const [isShow, setIsShow] = useState(false);

  const fieldError = errors?.[name]?.message;

  return (
    <div className={className}>
      <InputLabel
        htmlFor={name}
        label={label}
        show={isLabelHidden}
        required={isRequired}
        className={labelClassName}
      />

      {/* Icon Wrapper */}
      <div className='relative'>
        {icon && (
          <div className='absolute left-3 top-3.5 text-gray-500 text-base pointer-events-none'>
            <i className={icon} />
          </div>
        )}

        <input
          id={name}
          type={isShow ? 'text' : type}
          placeholder={placeholder}
          {...register(name)}
          {...props}
          autoFocus={type === 'text'}
          className={classNames(
            'w-full border border-blended-gray_2 bg-white px-4 py-3 text-base focus:outline-none',
            'placeholder:text-blended-gray_3 placeholder:text-sm placeholder:font-normal',
            {
              'pl-10': icon,
              'pr-10': isShow,
              'pr-4': !isShow,
            },
            {
              'ring-1 ring-red-500': fieldError,
              'focus:ring-1 focus:ring-blended-blue_3 focus:border-blended-blue_3':
                !fieldError,
            },
            inputClassName
          )}
          disabled={loading}
        />

        <PasswordEyeButton type={type} isShow={isShow} setIsShow={setIsShow} />
      </div>

      <InputError message={fieldError} show={isErrorHidden} />
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  isLabelHidden: PropTypes.bool,
  isErrorHidden: PropTypes.bool,
  isRequired: PropTypes.bool,
  icon: PropTypes.string, // optional icon class name
};

export default InputField;
