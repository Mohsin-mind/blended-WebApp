import PropTypes from 'prop-types';
import Button from '@/components/common/FormFields/Button';
import LRFHeaderSection from '../Login/LRFHeaderSection';

function ResetPasswordSuccessSection({ onLoginClick }) {
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
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
                Password Reset Successful
              </h1>
              <p className='text-blended-gray_8 text-sm font-normal text-center w-full lg:w-[80%]'>
                You&apos;ve successfully created a New Password, Click below to
                Login
              </p>
            </div>

            {/* Login Button */}
            <div className='w-full'>
              <Button type='button' title='Login' onClick={handleLoginClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ResetPasswordSuccessSection.propTypes = {
  onLoginClick: PropTypes.func,
};

export default ResetPasswordSuccessSection;
