import { useLocation } from 'react-router-dom';
import ForgotPasswordLayout from '@/components/pages/LRF/ForgotPassword/ForgotPasswordLayout';
import ForgotPasswordForm from '@/components/pages/LRF/ForgotPassword/ForgotPasswordForm';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { forgotPassword as forgotPasswordApi } from '@/services/apiService';
import ROLE from '@/utils/constant/role';
import studentLoginFrame from '@/assets/images/svg/student_login_frame.png';
import teacherLoginFrame from '@/assets/images/svg/teacher_login_frame.png';
import { useState } from 'react';

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // Get role from URL path or location state, default to student
  const pathRole = location.pathname.startsWith('/teacher/')
    ? 'teacher'
    : 'student';
  const stateRole = location.state?.role;
  const role =
    stateRole || (pathRole === 'teacher' ? ROLE[1].value : ROLE[0].value);

  // Select image based on role
  const imageSrc =
    role === ROLE[1].value ? teacherLoginFrame : studentLoginFrame;
  const altText =
    role === ROLE[1].value
      ? 'Teacher Forgot Password'
      : 'Student Forgot Password';

  const { trigger } = useSWRMutation(
    '/users/forgot-password',
    async (key, { arg }) => {
      return await forgotPasswordApi(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    const { meta } = await trigger(data);
    if (meta?.code === 1) {
      setIsSuccess(true);
    }
  }

  const handleBackToLogin = () => {
    const loginRoute =
      role === ROLE[1].value ? '/teacher/login' : '/student/login';
    navigate(loginRoute, { replace: true });
  };

  if (isSuccess) {
    return (
      <ForgotPasswordLayout
        formComponent={AuthSuccessSection}
        formProps={{
          title: 'Check Your Email',
          message:
            "We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.",
          buttonText: 'Back to Login',
          onButtonClick: handleBackToLogin,
        }}
        imageSrc={imageSrc}
        altText={altText}
      />
    );
  }

  return (
    <ZodFormProvider schema={forgotPasswordSchema} onSubmit={onSubmit}>
      <ForgotPasswordLayout
        formComponent={ForgotPasswordForm}
        formProps={{ role }}
        imageSrc={imageSrc}
        altText={altText}
      />
    </ZodFormProvider>
  );
}
