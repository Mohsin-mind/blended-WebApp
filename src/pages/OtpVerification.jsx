import { useState } from 'react';
import OtpVerificationLayout from '@/components/pages/LRF/OtpVerification/OtpVerificationLayout';
import OtpVerificationSection from '@/components/pages/LRF/OtpVerification/OtpVerificationSection';
import { verifyOtpSchema } from '@/schemas/verifyOtpSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { otpVerification, forgotPassword } from '@/services/authService';
import ROLE from '@/utils/constant/role';
import { showToast } from '@/lib/toast';

export default function OtpVerification() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  
  const email = state?.email || '';
  const role = state?.role || ROLE[0].value; // Default to student
  
  // Convert role value to string for easier handling
  const roleString = role === ROLE[1].value ? 'teacher' : 'student';

  const { trigger } = useSWRMutation('/verify-otp', async (key, { arg }) => {
    return await otpVerification(JSON.stringify(arg));
  });

  async function onSubmit({ code }) {
    try {
      const { meta } = await trigger({
        email: email,
        otp: code,
      });

      if (meta.code) {
        navigate('/reset-password', {
          replace: true,
          state: {
            otp: code,
            email: email,
            role: role,
          },
        });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      showToast('error', 'Invalid OTP. Please check and try again.');
    }
  }

  const handleResendOtp = async () => {
    if (isResending) return;
    
    setIsResending(true);
    try {
      await forgotPassword(JSON.stringify({ email }));
      showToast('success', 'OTP has been resent to your email');
    } catch (error) {
      console.error('Resend OTP error:', error);
      showToast('error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ZodFormProvider schema={verifyOtpSchema} onSubmit={onSubmit}>
      <OtpVerificationLayout
        formComponent={OtpVerificationSection}
        formProps={{
          email,
          role: roleString,
          onResendOtp: handleResendOtp,
          isResending,
        }}
      />
    </ZodFormProvider>
  );
}
