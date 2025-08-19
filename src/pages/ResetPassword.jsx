import ResetPasswordLayout from '@/components/pages/LRF/ResetPassword/ResetPasswordLayout';
import ResetPasswordForm from '@/components/pages/LRF/ResetPassword/ResetPasswordForm';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import { resetPasswordSchema } from '@/schemas/resetPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { resetPassword } from '@/services/authService';
import ROLE from '@/utils/constant/role';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import { showToast } from '@/lib/toast';
import { useState } from 'react';

export default function ResetPassword() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // Get token from URL params or state
  const token = searchParams.get('token') || state?.token || '';
  const email = state?.email || '';
  const otp = state?.otp || '';
  
  // Get role from URL path or state, default to student
  const pathRole = location.pathname.startsWith('/teacher/') ? 'teacher' : 'student';
  const stateRole = state?.role;
  const role = stateRole || (pathRole === 'teacher' ? ROLE[1].value : ROLE[0].value);

  // Convert role value to string for easier handling
  const roleString = role === ROLE[1].value ? 'teacher' : 'student';

  // Select image based on role
  const imageSrc =
    role === ROLE[1].value ? teacherLoginFrame : studentLoginFrame;
  const altText =
    role === ROLE[1].value
      ? 'Teacher Reset Password'
      : 'Student Reset Password';

  const { trigger } = useSWRMutation(
    '/users/reset-password',
    async (key, { arg }) => {
      return await resetPassword(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    try {
      const { meta } = await trigger({
        token: token, // Token from URL
        password: data.password, // New password
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
      roleString === 'teacher' ? '/teacher/login' : '/student/login';
    navigate(targetRoute, { replace: true });
  };

  if (isSuccess) {
    return (
      <ResetPasswordLayout
        formComponent={AuthSuccessSection}
        formProps={{
          title: 'Password Reset Successful',
          message: "You've successfully created a New Password. Click below to Login.",
          buttonText: 'Login',
          onButtonClick: handleLoginClick,
        }}
        imageSrc={imageSrc}
        altText={altText}
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
        imageSrc={imageSrc}
        altText={altText}
      />
    </ZodFormProvider>
  );
}
