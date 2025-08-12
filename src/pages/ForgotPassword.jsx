import Background from '@/components/pages/LRF/Background';
import Card from '@/components/pages/LRF/Card';
import CardContainer from '@/components/pages/LRF/CardContainer';
import CardTitle from '@/components/pages/LRF/CardTitle';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import useSWRMutation from 'swr/mutation';
import { forgotPassword as forgotPasswordApi } from '@/services/authService';
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema';
import ForgotPasswordForm from '@/components/pages/LRF/ForgotPassword/ForgotPasswordForm';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation(
    '/forgot-password',
    async (key, { arg }) => {
      return await forgotPasswordApi(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    const { meta } = await trigger(data);
    if (meta.code) {
      navigate('/otp-verification', {
        replace: true,
        state: {
          email: data.email,
        },
      });
    }
  }

  return (
    <CardContainer>
      <Background />
      <Card>
        <CardTitle
          title='Forgot Password?'
          subTitle='No worries, we’ll send you reset instructions.'
        />
        <ZodFormProvider schema={forgotPasswordSchema} onSubmit={onSubmit}>
          <ForgotPasswordForm />
        </ZodFormProvider>
      </Card>
    </CardContainer>
  );
};

export default ForgotPassword;
