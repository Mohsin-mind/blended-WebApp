import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/FormFields/Button';
import LRFHeaderSection from '../Login/LRFHeaderSection';
import useSWRMutation from 'swr/mutation';
import { resendEmailVerification } from '@/services/apiService';
import { showToast } from '@/lib/toast';

function AuthSuccessSection({
  title,
  message,
  buttonText = 'Back to Login',
  onButtonClick,
  showResendEmail = false,
  userEmail = '',
}) {
  const [isResending, setIsResending] = useState(false);

  const { trigger: resendTrigger } = useSWRMutation(
    '/users/resend-verification',
    async (key, { arg }) => {
      return await resendEmailVerification(arg);
    }
  );

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const handleResendEmail = async () => {
    if (!userEmail) {
      showToast('error', 'Email address not found');
      return;
    }

    try {
      setIsResending(true);
      await resendTrigger(userEmail);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection />

      {/* Bottom Section - Success Message */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-4 lg:pt-12 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col'>
          {/* Success Content */}
          <div className='flex flex-col items-center'>
            {/* Success Message */}
            <div className='flex flex-col justify-center items-center mb-4 lg:mb-6'>
              <h1 className='text-xl lg:text-3xl font-bold text-blended-blue_7 mb-2 text-center'>
                {title}
              </h1>
              <p className='text-blended-gray_8 text-sm font-normal text-center w-full lg:w-[80%]'>
                {message}
              </p>
            </div>

            {/* Action Button */}
            <div className='w-full'>
              <Button
                type='button'
                title={buttonText}
                onClick={handleButtonClick}
              />
            </div>

            {/* Resend Email Section - Only shown when showResendEmail is true */}
            {showResendEmail && (
              <>
                <div className='text-center mt-3'>
                  <span className='text-blended-gray_5 text-sm lg:text-base font-normal mr-1'>
                    Didn&apos;t get any email?
                  </span>
                  <button
                    type='button'
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className='text-blended-blue_7 text-sm lg:text-base font-normal hover:text-blended-blue_3 transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isResending ? 'Sending...' : 'Click to Resend'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

AuthSuccessSection.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  showResendEmail: PropTypes.bool,
  userEmail: PropTypes.string,
};

export default AuthSuccessSection;
