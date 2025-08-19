import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import Loader from '@/components/common/Loader';
import ImageSection from '@/components/pages/LRF/Login/ImageSection';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import ROLE from '@/utils/constant/role';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const { isVerifying, verificationStatus, errorMessage, verifyEmailToken } =
    useEmailVerification();

  useEffect(() => {
    const token = searchParams.get('token');
    verifyEmailToken(token);
  }, [searchParams, verifyEmailToken]);

  // Default to student theme
  const imageSrc = studentLoginFrame;
  const altText = 'Email Verification';

  const renderContent = () => {
    if (isVerifying || verificationStatus === null) {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-center max-w-md w-full'>
            <Loader className='w-12 h-12 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-blended-gray_1 mb-2'>
              Verifying Email
            </h2>
            <p className='text-blended-gray_2'>
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-center max-w-md w-full'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-blended-gray_1 mb-2'>
              Email Verified!
            </h2>
            <p className='text-blended-gray_2 mb-6'>
              Your email has been successfully verified. You will be redirected
              to the login page shortly.
            </p>
            <div className='animate-pulse'>
              <div className='h-2 bg-blended-gray_3 rounded w-3/4 mx-auto' />
            </div>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'error') {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-center max-w-md w-full'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-blended-gray_1 mb-2'>
              Verification Failed
            </h2>
            <p className='text-blended-gray_2 mb-6'>{errorMessage}</p>
            <div className='space-y-3'>
              <button
                onClick={() => (window.location.href = '/student/login')}
                className='w-full bg-blended-blue_3 text-white px-6 py-3 rounded-lg hover:bg-blended-blue_4 transition-colors font-medium'
              >
                Go to Login
              </button>
              <button
                onClick={() => window.location.reload()}
                className='w-full bg-blended-gray_3 text-blended-gray_1 px-6 py-3 rounded-lg hover:bg-blended-gray_4 transition-colors font-medium'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Column - Email Verification Content */}
      <div className='flex-1 w-full flex flex-col h-screen lg:h-screen relative bg-white'>
        <div className='flex-1 flex items-center justify-center px-6'>
          {renderContent()}
        </div>
      </div>

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4 h-64 lg:h-screen lg:w-auto'>
        <ImageSection
          imageSrc={imageSrc}
          altText={altText}
          title='Welcome Back, Dhruvin Dave'
          subtitle="Explore live courses led by MIT faculty. We'll guide you in selecting your ideal starting point—whether it's building foundations or diving into hands-on projects."
          titleClass='text-left'
          subtitleClass='text-left'
        />
      </div>
    </div>
  );
}
