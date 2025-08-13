import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@/components/common/FormFields/Button';
import InputError from '@/components/common/FormFields/InputError';
import LRFHeaderSection from '../Login/LRFHeaderSection';
import { useFormContext } from 'react-hook-form';
import { classNames } from '@/utils/helper';
import smallArrowLeft from '@/assets/images/svg/small-arrow-left.svg';

function OtpVerificationSection({ 
  email,
  role = 'student',
  onResendOtp,
  isResending = false,
}) {
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
      valueCode.slice(0, index) + val + valueCode.slice(index + 1, 5);
    setValue('code', updated);
    trigger('code');

    if (index < 4) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updated =
        valueCode.slice(0, index) + '' + valueCode.slice(index + 1, 5);
      setValue('code', updated);
      trigger('code');

      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const error = errors.code?.message;

  // Mask email for display
  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    return `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`;
  };

  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection/>

      {/* Bottom Section - Form */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-8 lg:pt-20 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col justify-center'>
          {/* Form Fields */}
          <div className='flex-1'>
            {/* Header */}
            <div className='text-center mb-6 lg:mb-8'>
              <h1 className='text-2xl lg:text-3xl font-bold text-blended-blue_7 mb-2'>
                Check your email
              </h1>
              <p className='text-blended-gray_5 text-sm lg:text-base'>
                Input code has been sent to your {maskEmail(email)}
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className='mb-6'>
              <label className='block text-blended-gray_5 text-sm font-medium mb-3 text-center lg:text-left'>
                CODE
              </label>
              <div className='flex justify-between gap-2 lg:gap-3 max-w-full overflow-hidden'>
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    type='text'
                    maxLength={1}
                    value={digit}
                    ref={el => (inputRefs.current[i] = el)}
                    onChange={e => handleChange(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    className={classNames(
                      'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 border border-blended-gray_2 bg-white text-center text-lg lg:text-xl xl:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blended-blue_3 focus:border-blended-blue_3 flex-shrink-0',
                      error && !digit ? 'border-red-500 ring-red-500' : 'border-blended-gray_2',
                      !(error && !digit) ? 'border-blended-gray_2' : ''
                    )}
                  />
                ))}
              </div>
              <InputError message={error} show={false} />
            </div>

            {/* Next Button */}
            <div className='mb-6'>
              <Button type='submit' title='Next' />
            </div>

            {/* Resend Code Link */}
            <div className='text-center'>
              <span className='text-blended-gray_5 text-sm lg:text-base font-normal mr-1'>
                Didn't get any code?
              </span>
              <button
                type='button'
                onClick={onResendOtp}
                disabled={isResending}
                className='text-blended-blue_7 text-sm lg:text-base font-normal hover:text-blended-blue_3 transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isResending ? 'Sending...' : 'Click to Resend'}
              </button>
            </div>
            {/* Footer Links */}
            <div className='text-center pt-6 lg:pt-8 mb-6 lg:mb-10 flex justify-center items-center'>
              <img src={smallArrowLeft} className="h-3 w-3 mr-2" alt='go back'/>
              <span className='text-blended-gray_5 text-sm lg:text-base font-normal mr-1'>Back to</span>
              <NavLink
                to={role === 'teacher' ? '/teacher-login' : '/student-login'}
                className='text-blended-blue_7 text-sm lg:text-base font-normal hover:text-blended-blue_3 transition-colors underline flex items-center justify-center'
              >
                Login
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

OtpVerificationSection.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['student', 'teacher']),
  onResendOtp: PropTypes.func,
  isResending: PropTypes.bool,
};

export default OtpVerificationSection;
