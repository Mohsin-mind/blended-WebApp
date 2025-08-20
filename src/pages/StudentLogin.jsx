import { useState } from 'react';
import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import LoginFormSection from '@/components/pages/LRF/Login/LoginFormSection';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import { loginSchema } from '@/schemas/loginSchema';
import { signupSchema } from '@/schemas/signupSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { login as loginApi, signup as signupApi } from '@/services/authService';
import { showToast } from '@/lib/toast';
import { setCookie } from '@/utils/helper';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const { trigger: loginTrigger } = useSWRMutation(
    '/users/login',
    async (key, { arg }) => {
      return await loginApi(JSON.stringify(arg), false);
    }
  );

  const { trigger: signupTrigger } = useSWRMutation(
    '/users/register',
    async (key, { arg }) => {
      return await signupApi(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    const trigger = activeForm === 'login' ? loginTrigger : signupTrigger;
    const { meta, data: responseData } = await trigger(data);

    if (meta?.code) {
      if (activeForm === 'login') {
        // Handle login
        if (responseData?.token) {
          // Validate that the user is actually a student
          if (responseData.user?.role !== 'STUDENT') {
            showToast(
              'error',
              'This login page is for students only. Please use the teacher login page.'
            );
            return;
          }

          setCookie('student_token', responseData?.token);
          setCookie('student_detail', JSON.stringify(responseData));
          navigate('/student/dashboard', { replace: true });
          showToast(meta?.code ? 'success' : 'error', meta?.message);
        } else {
          showToast('error', 'Invalid credentials');
        }
      } else {
        // Handle signup
        if (responseData?.user?.emailVerified) {
          // Email is verified, proceed to dashboard
          if (responseData?.token) {
            setCookie('student_token', responseData?.token);
            setCookie('student_detail', JSON.stringify(responseData));
            navigate('/student/dashboard', { replace: true });
          }
        } else {
          // Email not verified, show success message
          setIsSignupSuccess(true);
        }
      }
    } else {
      showToast(
        'error',
        activeForm === 'login' ? 'Invalid credentials' : 'Signup failed'
      );
    }
  }

  const handleFormChange = formType => {
    setActiveForm(formType);
  };

  const handleBackToLogin = () => {
    setIsSignupSuccess(false);
    setActiveForm('login');
  };

  const currentSchema = activeForm === 'login' ? loginSchema : signupSchema;

  if (isSignupSuccess) {
    return (
      <WebAppLoginLayout
        formComponent={AuthSuccessSection}
        formProps={{
          title: 'Check Your Email',
          message:
            "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account before logging in.",
          buttonText: 'Back to Login',
          onButtonClick: handleBackToLogin,
        }}
      />
    );
  }

  return (
    <ZodFormProvider
      key={activeForm}
      schema={currentSchema}
      onSubmit={onSubmit}
    >
      <WebAppLoginLayout
        formComponent={LoginFormSection}
        onFormChange={handleFormChange}
        activeForm={activeForm}
      />
    </ZodFormProvider>
  );
}
