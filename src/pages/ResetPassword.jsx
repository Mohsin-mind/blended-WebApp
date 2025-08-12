import Background from '@/components/pages/LRF/Background';
import Card from '@/components/pages/LRF/Card';
import CardContainer from '@/components/pages/LRF/CardContainer';
import CardTitle from '@/components/pages/LRF/CardTitle';
import ResetPasswordForm from '@/components/pages/LRF/ResetPassword/ResetPasswordForm';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { resetPasswordSchema } from '@/schemas/resetPasswordSchema';
import { resetPassword } from '@/services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trigger } = useSWRMutation(
    '/reset-password',
    async (key, { arg }) => {
      return await resetPassword(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    const { meta } = await trigger({ password: data.password, ...state });
    if (meta.code) {
      navigate('/login', { replace: true });
    }
  }
  return (
    <CardContainer>
      <Background />

      <Card>
        <CardTitle title='Reset password?' subTitle='Enter a new password' />
        <ZodFormProvider schema={resetPasswordSchema} onSubmit={onSubmit}>
          <ResetPasswordForm />
        </ZodFormProvider>
      </Card>
    </CardContainer>
  );
};

export default ResetPassword;
