import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import EmailVerificationLayout from '@/components/pages/LRF/EmailVerification/EmailVerificationLayout';
import EmailVerificationLoadingSection from '@/components/pages/LRF/EmailVerification/EmailVerificationLoadingSection';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';

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

  const handleGoToLogin = () => {
    window.location.href = '/student/login';
  };

  if (isVerifying || verificationStatus === null) {
    return (
      <EmailVerificationLayout
        formComponent={EmailVerificationLoadingSection}
        formProps={{
          title: 'Verifying Email',
          message: 'Please wait while we verify your email address...',
        }}
        imageSrc={imageSrc}
        altText={altText}
      />
    );
  }

  if (verificationStatus === 'success') {
    return (
      <EmailVerificationLayout
        formComponent={AuthSuccessSection}
        formProps={{
          title: 'Email Verified!',
          message:
            'Your email has been successfully verified. You can now log in to your account.',
          buttonText: 'Go to Login',
          onButtonClick: handleGoToLogin,
        }}
        imageSrc={imageSrc}
        altText={altText}
      />
    );
  }

  if (verificationStatus === 'error') {
    return (
      <EmailVerificationLayout
        formComponent={AuthSuccessSection}
        formProps={{
          title: 'Verification Failed',
          message: errorMessage,
          buttonText: 'Go to Login',
          onButtonClick: handleGoToLogin,
        }}
        imageSrc={imageSrc}
        altText={altText}
      />
    );
  }

  return null;
}
