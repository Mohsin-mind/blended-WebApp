import Background from '@/components/pages/LRF/Background';
import Card from '@/components/pages/LRF/Card';
import CardContainer from '@/components/pages/LRF/CardContainer';
import CardTitle from '@/components/pages/LRF/CardTitle';
import OtpVerificationForm from '@/components/pages/LRF/OtpVerification/OtpVerificationForm';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { verifyOtpSchema } from '@/schemas/verifyOtpSchema';
import useSWRMutation from 'swr/mutation';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpVerification } from '@/services/authService';
import ResendOtp from '@/components/pages/LRF/OtpVerification/ResendOtp';

const OtpVerification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trigger } = useSWRMutation('/verify-otp', async (key, { arg }) => {
    return await otpVerification(JSON.stringify(arg));
  });

  async function onSubmit({ code }) {
    const { meta } = await trigger({
      email: state?.email,
      otp: code,
    });

    if (meta.code) {
      navigate('/reset-password', {
        replace: true,
        state: {
          otp: code,
          email: state?.email,
        },
      });
    }
  }

  return (
    <CardContainer>
      <Background />

      <Card>
        <CardTitle
          title='Reset Password'
          subTitle={
            <>
              We sent a code to{' '}
              <span className='font-bold text-gold'>{state?.email}</span>
            </>
          }
        />
        <ZodFormProvider schema={verifyOtpSchema} onSubmit={onSubmit}>
          <OtpVerificationForm />
        </ZodFormProvider>
        <ResendOtp email={state?.email} />
      </Card>
    </CardContainer>
  );
};

export default OtpVerification;
