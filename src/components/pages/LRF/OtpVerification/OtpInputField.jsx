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
    .concat(Array(4 - valueCode.length).fill(''));

  useEffect(() => {
    register('code');
  }, [register]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;

    const updated =
      valueCode.slice(0, index) + val + valueCode.slice(index + 1, 4);
    setValue('code', updated);
    trigger('code');

    if (index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updated =
        valueCode.slice(0, index) + '' + valueCode.slice(index + 1, 4);
      setValue('code', updated);
      trigger('code');

      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const error = errors.code?.message;

  return (
    <div className='my-5 text-center'>
      <div className='grid grid-cols-4 mb-2'>
        {digits.map((digit, i) => (
          <input
            type='text'
            maxLength={1}
            value={digit}
            ref={el => (inputRefs.current[i] = el)}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className={cn(
              'border w-16 py-4 text-2xl text-center rounded-md bg-grayLight/70 text-black mx-auto',
              {
                'border-red outline-red': error && !digit,
                'border-goldLight outline-gold': !(error && !digit),
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
