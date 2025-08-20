import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@/components/common/FormFields/Button';
import OtpInputField from './OtpInputField';
import LRFHeaderSection from '../Login/LRFHeaderSection';
import smallArrowLeft from '@/assets/images/svg/small-arrow-left.svg';

function OtpVerificationForm({
  email,
  role = 'student',
  onResendOtp,
  isResending = false,
}) {
  // Mask email for display
  const maskEmail = emailAddress => {
    if (!emailAddress) return '';
    const [localPart, domain] = emailAddress.split('@');
    if (localPart.length <= 2) return emailAddress;
    return `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`;
  };

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
              <h1 className='text-2xl lg:text-3xl font-bold text-blended-blue_7 mb-2'>
                Check your email
              </h1>
              <p className='text-blended-gray_5 text-sm lg:text-base'>
                Input code has been sent to your {maskEmail(email)}
              </p>
            </div>

            {/* OTP Input Fields */}
            <OtpInputField />

            {/* Next Button */}
            <div className='mb-6'>
              <Button type='submit' title='Next' />
            </div>

            {/* Resend Code Link */}
            {/* <div className='text-center'>
              <span className='text-blended-gray_5 text-sm lg:text-base font-normal mr-1'>
                Didn&apos;t get any code?
              </span>
              <button
                type='button'
                onClick={onResendOtp}
                disabled={isResending}
                className='text-blended-blue_7 text-sm lg:text-base font-normal hover:text-blended-blue_3 transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isResending ? 'Sending...' : 'Click to Resend'}
              </button>
            </div> */}

            {/* Footer Links */}
            <div className='text-center pt-6 lg:pt-8 mb-6 lg:mb-10 flex justify-center items-center'>
              <img
                src={smallArrowLeft}
                className='h-3 w-3 mr-2'
                alt='go back'
              />
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
      </div>
    </>
  );
}

OtpVerificationForm.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['student', 'teacher']),
  onResendOtp: PropTypes.func,
  isResending: PropTypes.bool,
};

export default OtpVerificationForm;
