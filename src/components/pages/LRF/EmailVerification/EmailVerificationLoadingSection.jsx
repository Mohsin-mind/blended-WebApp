import PropTypes from 'prop-types';
import Loader from '@/components/common/Loader';
import LRFHeaderSection from '../Login/LRFHeaderSection';

function EmailVerificationLoadingSection({ title, message }) {
  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection />

      {/* Bottom Section - Loading Message */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-4 lg:pt-12 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col'>
          {/* Loading Content */}
          <div className='flex flex-col items-center'>
            {/* Loading Message */}
            <div className='flex flex-col justify-center items-center mb-4 lg:mb-6'>
              <Loader className='w-12 h-12 mx-auto mb-4' />
              <h1 className='text-xl lg:text-3xl font-bold text-blended-blue_7 mb-2 text-center'>
                {title}
              </h1>
              <p className='text-blended-gray_8 text-sm font-normal text-center w-full lg:w-[80%]'>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EmailVerificationLoadingSection.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmailVerificationLoadingSection;
