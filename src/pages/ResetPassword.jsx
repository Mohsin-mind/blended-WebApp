import ResetPasswordLayout from '@/components/pages/LRF/ResetPassword/ResetPasswordLayout';
import ResetPasswordForm from '@/components/pages/LRF/ResetPassword/ResetPasswordForm';
import ResetPasswordSuccessSection from '@/components/pages/LRF/ResetPassword/ResetPasswordSuccessSection';
import { resetPasswordSchema } from '@/schemas/resetPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { resetPassword } from '@/services/authService';
import ROLE from '@/utils/constant/role';
import { showToast } from '@/lib/toast';
import { useState } from 'react';

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const email = state?.email || '';
  const otp = state?.otp || '';
  const role = state?.role || ROLE[0].value;

  // Convert role value to string for easier handling
  const roleString = role === ROLE[1].value ? 'teacher' : 'student';

  const { trigger } = useSWRMutation(
    '/reset-password',
    async (key, { arg }) => {
      return await resetPassword(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    try {
      const { meta } = await trigger({
        password: data.password,
        email,
        otp,
      });

      if (meta?.code) {
        showToast('success', 'Password reset successful!');
        setIsSuccess(true);
      }
    } catch (error) {
      if (error) {
        showToast('error', 'Failed to reset password. Please try again.');
      }
    }
  }

  const handleLoginClick = () => {
    const targetRoute =
      roleString === 'teacher' ? '/teacher-login' : '/student-login';
    navigate(targetRoute, { replace: true });
  };

  if (isSuccess) {
    return (
      <ResetPasswordLayout
        formComponent={ResetPasswordSuccessSection}
        formProps={{
          role: roleString,
          onLoginClick: handleLoginClick,
        }}
      />
    );
  }

  return (
    <ZodFormProvider schema={resetPasswordSchema} onSubmit={onSubmit}>
      <ResetPasswordLayout
        formComponent={ResetPasswordForm}
        formProps={{
          role: roleString,
        }}
      />
    </ZodFormProvider>
  );
}
