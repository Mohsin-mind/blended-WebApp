import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';
import LRFHeaderSection from '../Login/LRFHeaderSection';
import { useFormContext } from 'react-hook-form';
import smallArrowLeft from '@/assets/images/svg/small-arrow-left.svg';
import checkCircle from '@/assets/images/svg/check-circle.svg';

function ResetPasswordForm({ role = 'student' }) {
  const { watch } = useFormContext();

  const password = watch('password') || '';

  // Password validation checks (matching Zod schema requirements)
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[@$!%*?&#]/.test(password);

  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection />

      {/* Bottom Section - Form */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-8 lg:pt-20 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col justify-center'>
          {/* Form Fields */}
          <div className='flex-1'>
            {/* Header */}
            <div className='text-center mb-6 lg:mb-8'>
              <h1 className='text-2xl lg:text-[40px] font-semibold tracking-tight text-blended-blue_7 mb-2'>
                Set a New Password
              </h1>
              <p className='text-blended-gray_8 text-sm lg:text-base font-thin'>
                Your New Password must be different from your previously used
                passwords
              </p>
            </div>

            {/* Password Input Fields */}
            <div className='mb-6'>
              <InputField
                name='password'
                label='PASSWORD'
                type='password'
                placeholder='Enter your new password'
                isRequired
                className='mb-4'
              />

              <InputField
                name='confirm_password'
                label='CONFIRM PASSWORD'
                type='password'
                placeholder='Confirm your new password'
                isRequired
                className='mb-6'
              />
            </div>

            {/* Password Requirements */}
            <div className='mb-6'>
              <div className='space-y-2'>
                <div className='flex items-center text-blended-gray_5'>
                  {hasMinLength && (
                    <img
                      src={checkCircle}
                      className='w-4 h-4 mr-3'
                      alt='check'
                    />
                  )}
                  <span className='text-sm font-medium'>
                    Must be at least 8 Characters
                  </span>
                </div>

                <div className='flex items-center text-blended-gray_5'>
                  {hasSpecialChar && (
                    <img
                      src={checkCircle}
                      className='w-4 h-4 mr-3'
                      alt='check'
                    />
                  )}
                  <span className='text-sm font-medium'>
                    Must contain one special character
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Password Button */}
            <div className='mb-6'>
              <Button type='submit' title='Reset Password' />
            </div>
          </div>

          {/* Footer Links */}
          <div className='text-center mt-6 lg:mt-auto pt-6 lg:pt-8 mb-6 lg:mb-10 flex justify-center items-center'>
            <img src={smallArrowLeft} className='h-3 w-3 mr-2' alt='go back' />
            <span className='text-blended-gray_5 text-sm lg:text-base font-normal mr-1'>
              Back to
            </span>
            <NavLink
              to={role === 'teacher' ? '/teacher/login' : '/student/login'}
              className='text-blended-blue_7 text-sm lg:text-base font-normal hover:text-blended-blue_3 transition-colors underline flex items-center justify-center'
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

ResetPasswordForm.propTypes = {
  role: PropTypes.oneOf(['student', 'teacher']),
};

export default ResetPasswordForm;
