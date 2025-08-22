import { useState, useEffect } from 'react';
import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import LoginFormSection from '@/components/pages/LRF/Login/LoginFormSection';
import AuthSuccessSection from '@/components/pages/LRF/ResetPassword/AuthSuccessSection';
import { loginSchema } from '@/schemas/loginSchema';
import { signupSchema } from '@/schemas/signupSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import {
  login as loginApi,
  signup as signupApi,
  resendEmailVerification,
} from '@/services/apiService';
import { showToast } from '@/lib/toast';
import { setCookie } from '@/utils/helper';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isFromLogin, setIsFromLogin] = useState(false);

  const { trigger: loginTrigger } = useSWRMutation(
    '/users/login',
    async (key, { arg }) => {
      return await loginApi(JSON.stringify(arg));
    }
  );

  const { trigger: signupTrigger } = useSWRMutation(
    '/users/register',
    async (key, { arg }) => {
      return await signupApi(JSON.stringify(arg));
    }
  );

  const { trigger: resendTrigger } = useSWRMutation(
    '/users/resend-verification',
    async (key, { arg }) => {
      return await resendEmailVerification(arg);
    }
  );

  // Auto-trigger email resend only when from login verification
  useEffect(() => {
    if (isSignupSuccess && userEmail && isFromLogin) {
      handleAutoResendEmail();
    }
  }, [isSignupSuccess, userEmail, isFromLogin]);

  const handleAutoResendEmail = async () => {
    try {
      await resendTrigger(userEmail);
      showToast('success', 'Verification email has been sent to your inbox');
    } catch (error) {
      console.error('Auto resend email failed:', error);
      // Don't show error toast for auto-resend, let user manually resend if needed
    }
  };

  async function onSubmit(data) {
    const trigger = activeForm === 'login' ? loginTrigger : signupTrigger;

    try {
      const { meta, data: responseData } = await trigger(data);
      if (meta?.code === 1) {
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
            showToast('success', meta?.message || 'Login successful');
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
              showToast('success', meta?.message || 'Signup successful');
            }
          } else {
            // Email not verified, show success message
            setUserEmail(data.email);
            setIsFromLogin(false); // Mark that this is from signup
            setIsSignupSuccess(true);
            showToast(
              'success',
              meta?.message ||
                'Account created successfully. Please check your email to verify your account.'
            );
          }
        }
      } else {
        showToast(
          'error',
          meta?.message ||
            (activeForm === 'login' ? 'Invalid credentials' : 'Signup failed')
        );
      }
    } catch (error) {
      // Handle the specific case where login fails due to unverified email (400 error with resend flag)
      if (
        activeForm === 'login' &&
        error?.status === 400 &&
        error?.response?.data?.meta?.error?.reSend === true
      ) {
        setUserEmail(data.email);
        setIsFromLogin(true); // Mark that this is from login verification
        setIsSignupSuccess(true);
        return;
      }

      // Handle other errors
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        (activeForm === 'login' ? 'Login failed' : 'Signup failed');
      showToast('error', errorMessage);
    }
  }

  // Handle Google authentication success
  async function handleGoogleSuccess(result) {
    const { meta, data: responseData } = result;

    if (meta?.code === 1) {
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
        showToast(
          'success',
          meta?.message || 'Google authentication successful'
        );
      } else {
        showToast('error', 'Google authentication failed');
      }
    } else {
      showToast('error', meta?.message || 'Google authentication failed');
    }
  }

  // Handle Google authentication error
  function handleGoogleError(error) {
    console.error('Google authentication error:', error);
    showToast('error', 'Google authentication failed. Please try again.');
  }

  const handleFormChange = formType => {
    setActiveForm(formType);
  };

  const handleBackToLogin = () => {
    setIsSignupSuccess(false);
    setUserEmail('');
    setIsFromLogin(false);
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
          showResendEmail: true,
          userEmail: userEmail,
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
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
      />
    </ZodFormProvider>
  );
}
