import PropTypes from 'prop-types';
import LRFHeaderSection from '../Login/LRFHeaderSection';

function AuthSuccessSection({
  title,
  message,
  buttonText = 'Back to Login',
  onButtonClick,
  additionalInfo,
}) {
  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection />

      {/* Bottom Section - Success Message */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-8 lg:pt-20 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col justify-center'>
          <div className='text-center'>
            {/* Success Message */}
            <h1 className='text-2xl lg:text-3xl font-bold text-blended-blue_7 mb-4'>
              {title}
            </h1>
            <p className='text-blended-gray_5 text-sm lg:text-base mb-8'>
              {message}
            </p>

            {/* Action Button */}
            <button
              onClick={onButtonClick}
              className='w-full bg-blended-blue_3 text-white px-6 py-3 rounded-lg hover:bg-blended-blue_4 transition-colors font-medium mb-4'
            >
              {buttonText}
            </button>

            {/* Additional Info */}
            {additionalInfo && (
              <p className='text-blended-gray_5 text-xs'>{additionalInfo}</p>
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
  onButtonClick: PropTypes.func.isRequired,
  additionalInfo: PropTypes.string,
};

export default AuthSuccessSection;
