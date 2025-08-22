import useSWRMutation from 'swr/mutation';
import { forgotPassword } from '@/services/apiService';
import { useEffect, useState } from 'react';
import CONST from '@/utils/constant';
import { showToast } from '@/lib/toast';

function ResendOtp({ email }) {
  const [timer, setTimer] = useState(0);

  const { trigger } = useSWRMutation('/resend-otp', async (key, { arg }) => {
    return await forgotPassword(JSON.stringify(arg));
  });

  async function resend() {
    try {
      const { meta } = await trigger({ email });
      if (meta?.code === 1) {
        showToast(
          'success',
          meta?.message || 'OTP has been resent to your email'
        );
        setTimer(CONST.MAGIC_NUMBERS.RESEND_INTERVAL_SECONDS);
      } else {
        showToast('error', meta?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        'Failed to resend OTP';
      showToast('error', errorMessage);
    }
  }

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, CONST.MAGIC_NUMBERS.MILLISECONDS_PER_SECOND);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  return (
    <p className='text-base text-white text-center font-poppins mt-4'>
      Didn’t receive a code?{' '}
      {timer > 0 ? (
        <span className='text-gold font-semibold'>Resend in {timer}s</span>
      ) : (
        <span
          onClick={resend}
          className='font-bold text-gold hover:underline cursor-pointer'
        >
          Resend Code
        </span>
      )}
    </p>
  );
}

export default ResendOtp;
