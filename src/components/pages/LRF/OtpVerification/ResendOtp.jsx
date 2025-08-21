import useSWRMutation from 'swr/mutation';
import { forgotPassword } from '@/services/apiService';
import { useEffect, useState } from 'react';
import CONST from '@/utils/constant';

function ResendOtp({ email }) {
  const [timer, setTimer] = useState(0);

  const { trigger } = useSWRMutation('/resend-otp', async (key, { arg }) => {
    return await forgotPassword(JSON.stringify(arg));
  });

  async function resend() {
    await trigger({ email });
    setTimer(CONST.MAGIC_NUMBERS.RESEND_INTERVAL_SECONDS);
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
