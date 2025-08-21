import { useState } from 'react';
import OtpVerificationLayout from '@/components/pages/LRF/OtpVerification/OtpVerificationLayout';
import OtpVerificationForm from '@/components/pages/LRF/OtpVerification/OtpVerificationForm';
import { verifyOtpSchema } from '@/schemas/verifyOtpSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { otpVerification } from '@/services/apiService';
import { showToast } from '@/lib/toast';

export default function OtpVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const email = searchParams.get('email') || '';

  const { trigger } = useSWRMutation(
    '/users/teachers/verify-code',
    async (key, { arg }) => {
      return await otpVerification(JSON.stringify(arg));
    }
  );

  async function onSubmit({ code }) {
    try {
      const { meta, data } = await trigger({
        email: email,
        code: code,
      });

      if (meta?.code && data?.setupToken) {
        // Store token in localStorage for persistence
        localStorage.setItem('teacher_reset_token', data.setupToken);
        localStorage.setItem('teacher_reset_email', email);

        showToast('success', 'OTP verified successfully!');
        // Redirect to reset password page with token
        navigate('/teacher/reset-password', {
          replace: true,
          state: {
            token: data.setupToken,
            email: email,
            from: 'teacher_otp_verification',
          },
        });
      }
    } catch (error) {
      if (error) {
        showToast('error', 'Invalid OTP. Please check and try again.');
      }
    }
  }

  const handleResendOtp = async () => {
    if (isResending) return;

    setIsResending(true);
    try {
      showToast('success', 'OTP has been resent to your email');
    } catch (error) {
      if (error) {
        showToast('error', 'Failed to resend OTP. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ZodFormProvider schema={verifyOtpSchema} onSubmit={onSubmit}>
      <OtpVerificationLayout
        formComponent={OtpVerificationForm}
        formProps={{
          email,
          role: 'teacher',
          onResendOtp: handleResendOtp,
          isResending,
        }}
      />
    </ZodFormProvider>
  );
}
