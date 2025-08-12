import { Fragment } from 'react';
import AdminLoginLayout from '@/components/pages/AdminLogin/AdminLoginLayout';
import { loginSchema } from '@/schemas/loginSchema';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { login as loginApi } from '@/services/authService';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation('/login', async (key, { arg }) => {
    return await loginApi(JSON.stringify(arg));
  });

  async function onSubmit(data) {
    const { meta } = await trigger(data);
    if (meta.code) {
      navigate('/dashboard', { replace: true });
    }
  }

  return (
    <ZodFormProvider schema={loginSchema} onSubmit={onSubmit}>
      <AdminLoginLayout />
    </ZodFormProvider>
  );
}
