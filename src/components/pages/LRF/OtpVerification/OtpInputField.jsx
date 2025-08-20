import { useFormContext } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import InputError from '@/components/common/FormFields/InputError';
import cn from '@/lib/clsx';

const OtpInputField = () => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const inputRefs = useRef([]);
  const valueCode = getValues('code') || '';
  const digits = valueCode
    .split('')
    .concat(Array(6 - valueCode.length).fill('')); // Changed to 6 digits

  useEffect(() => {
    register('code');
  }, [register]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;

    const updated =
      valueCode.slice(0, index) + val + valueCode.slice(index + 1, 6); // Changed to 6 digits
    setValue('code', updated);
    trigger('code');

    if (index < 5) inputRefs.current[index + 1]?.focus(); // Changed to 5 (6 digits total)
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updated =
        valueCode.slice(0, index) + '' + valueCode.slice(index + 1, 6); // Changed to 6 digits
      setValue('code', updated);
      trigger('code');

      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const error = errors.code?.message;

  return (
    <div className='mb-6'>
      <label className='block text-blended-gray_5 text-sm font-medium mb-3 text-center lg:text-left'>
        CODE
      </label>
      <div className='flex justify-center gap-1 sm:gap-2 lg:gap-3 max-w-full'>
        {digits.map((digit, i) => (
          <input
            key={`otp-digit-${digit}-${i}`}
            type='text'
            maxLength={1}
            value={digit}
            ref={el => (inputRefs.current[i] = el)}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className={cn(
              'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 border bg-white text-center text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blended-blue_3 focus:border-blended-blue_3 flex-shrink-0',
              {
                'border-red outline-red': error && !digit,
                'border-white outline-white': !(error && !digit),
              }
            )}
          />
        ))}
      </div>
      <InputError message={error} show={false} />
    </div>
  );
};

export default OtpInputField;
