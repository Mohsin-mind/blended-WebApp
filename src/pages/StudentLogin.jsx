import { useState } from 'react';
import WebAppLoginLayout from '@/components/pages/LRF/Login/WebAppLoginLayout';
import LoginFormSection from '@/components/pages/LRF/Login/LoginFormSection';
import { loginSchema } from '@/schemas/loginSchema';
import { signupSchema } from '@/schemas/signupSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { login as loginApi, signup as signupApi } from '@/services/authService';
import { showToast } from '@/lib/toast';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');

  const { trigger: loginTrigger } = useSWRMutation(
    '/login',
    async (key, { arg }) => {
      return await loginApi(JSON.stringify(arg));
    }
  );

  const { trigger: signupTrigger } = useSWRMutation(
    '/signup',
    async (key, { arg }) => {
      return await signupApi(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    try {
      const trigger = activeForm === 'login' ? loginTrigger : signupTrigger;
      const { meta } = await trigger(data);
      if (meta?.code) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      if (error) {
        showToast('error', 'Failed to login. Please try again.');
      }
    }
  }

  const handleFormChange = formType => {
    setActiveForm(formType);
  };

  const currentSchema = activeForm === 'login' ? loginSchema : signupSchema;

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
