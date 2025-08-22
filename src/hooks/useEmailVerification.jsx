import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/services/apiService';

export function useEmailVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const verifyEmailToken = useCallback(
    async token => {
      if (!token) {
        setVerificationStatus('error');
        setErrorMessage('Invalid verification link. Token is missing.');
        return { success: false, message: 'Token is missing' };
      }

      setIsVerifying(true);
      setVerificationStatus(null);
      setErrorMessage('');

      try {
        const { meta } = await verifyEmail(token);

        if (meta?.code === 1) {
          setVerificationStatus('success');
          return { success: true, message: meta.message };
        }
        setVerificationStatus('error');
        const message = meta?.message || 'Email verification failed.';
        setErrorMessage(message);
        return { success: false, message };
      } catch (error) {
        const message =
          error?.response?.data?.meta?.message ||
          'An error occurred during email verification.';
        setVerificationStatus('error');
        setErrorMessage(message);
        return { success: false, message };
      } finally {
        setIsVerifying(false);
      }
    },
    [navigate]
  );

  const resetVerification = useCallback(() => {
    setVerificationStatus(null);
    setErrorMessage('');
    setIsVerifying(false);
  }, []);

  return {
    isVerifying,
    verificationStatus,
    errorMessage,
    verifyEmailToken,
    resetVerification,
  };
}
