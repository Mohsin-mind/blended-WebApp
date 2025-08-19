import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import Loader from '@/components/common/Loader';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const { isVerifying, verificationStatus, errorMessage, verifyEmailToken } =
    useEmailVerification();

  useEffect(() => {
    const token = searchParams.get('token');
    verifyEmailToken(token);
  }, [searchParams, verifyEmailToken]);

  const renderContent = () => {
    if (isVerifying || verificationStatus === null) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
          <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
            <Loader className='w-12 h-12 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Verifying Email
            </h2>
            <p className='text-gray-600'>
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
          <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
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
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Email Verified!
            </h2>
            <p className='text-gray-600 mb-6'>
              Your email has been successfully verified. You will be redirected
              to the login page shortly.
            </p>
            <div className='animate-pulse'>
              <div className='h-2 bg-gray-200 rounded w-3/4 mx-auto' />
            </div>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'error') {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
          <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
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
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Verification Failed
            </h2>
            <p className='text-gray-600 mb-6'>{errorMessage}</p>
            <div className='space-y-2'>
              <button
                onClick={() => (window.location.href = '/student/login')}
                className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mr-2'
              >
                Go to Login
              </button>
              <button
                onClick={() => window.location.reload()}
                className='bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors'
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

  return renderContent();
}
