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
    .concat(Array(5 - valueCode.length).fill('')); // Changed to 5 digits

  useEffect(() => {
    register('code');
  }, [register]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;

    const updated =
      valueCode.slice(0, index) + val + valueCode.slice(index + 1, 5); // Changed to 5 digits
    setValue('code', updated);
    trigger('code');

    if (index < 4) inputRefs.current[index + 1]?.focus(); // Changed to 4 (5 digits total)
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updated =
        valueCode.slice(0, index) + '' + valueCode.slice(index + 1, 5); // Changed to 5 digits
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
      <div className='flex justify-between gap-2 lg:gap-3 max-w-full overflow-hidden'>
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
              'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 border bg-white text-center text-lg lg:text-xl xl:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blended-blue_3 focus:border-blended-blue_3 flex-shrink-0',
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
