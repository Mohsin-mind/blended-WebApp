import ResetPasswordLayout from '@/components/pages/LRF/ResetPassword/ResetPasswordLayout';
import ResetPasswordForm from '@/components/pages/LRF/ResetPassword/ResetPasswordForm';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import { resetPasswordSchema } from '@/schemas/resetPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { resetPassword, teacherResetPassword } from '@/services/apiService';
import ROLE from '@/utils/constant/role';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import { useState } from 'react';
import { showToast } from '@/lib/toast';

export default function ResetPassword() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // Get token from URL params, state, or localStorage
  const token =
    searchParams.get('token') ||
    state?.token ||
    localStorage.getItem('teacher_reset_token') ||
    '';

  // Get role from URL path or state, default to student
  const pathRole = location.pathname.startsWith('/teacher/')
    ? 'teacher'
    : 'student';

  const stateRole = state?.role;
  const role =
    stateRole || (pathRole === 'teacher' ? ROLE[1].value : ROLE[0].value);

  // Convert role value to string for easier handling
  const roleString = role === ROLE[1].value ? 'teacher' : 'student';

  const isTeacherEmailOTPVerificationFlow =
    state?.from === 'teacher_otp_verification';

  // Select image based on role
  const imageSrc =
    role === ROLE[1].value ? teacherLoginFrame : studentLoginFrame;
  const altText =
    role === ROLE[1].value
      ? 'Teacher Reset Password'
      : 'Student Reset Password';

  // Choose the appropriate API based on flow type
  const apiEndpoint = isTeacherEmailOTPVerificationFlow
    ? '/users/setup-teacher-password'
    : '/users/reset-password';

  const { trigger } = useSWRMutation(apiEndpoint, async (key, { arg }) => {
    const apiFunction = isTeacherEmailOTPVerificationFlow
      ? teacherResetPassword
      : resetPassword;
    return await apiFunction(JSON.stringify(arg));
  });

  async function onSubmit(data) {
    try {
      // Prepare payload based on flow type
      const payload = isTeacherEmailOTPVerificationFlow
        ? {
            setupToken: token,
            password: data.password,
          }
        : {
          resetToken: token,
            password: data.password,
          };

      const { meta } = await trigger(payload);

      if (meta?.code === 1) {
        showToast('success', meta?.message || 'Password reset successfully');
        // Clear localStorage after successful password reset (only for teacher email verification flow)
        if (isTeacherEmailOTPVerificationFlow) {
          localStorage.removeItem('teacher_reset_token');
          localStorage.removeItem('teacher_reset_email');
        }
        setIsSuccess(true);
      } else {
        showToast('error', meta?.message || 'Failed to reset password');
      }
    } catch (error) {
      
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        'Failed to reset password';
      showToast('error', errorMessage);
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
          message:
            "You've successfully created a New Password. Click below to Login.",
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
