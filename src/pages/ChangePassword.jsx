import ChangePasswordForm from '@/components/pages/LRF/ChangePassword/ChangePasswordForm';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { changePasswordSchema } from '@/schemas/changePasswordSchema';
import { changePassword, logout } from '@/services/authService';
import useSWRMutation from 'swr/mutation';

export default function ChangePassword() {
  const { trigger } = useSWRMutation(
    '/change-password',
    async (key, { arg }) => {
      return await changePassword(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    const { meta } = await trigger({
      old_password: data.old_password,
      new_password: data.new_password,
    });

    if (meta?.code) {
      logout();
    }
  }

  return (
    <div className='p-10 w-full lg:w-1/2'>
      <ZodFormProvider schema={changePasswordSchema} onSubmit={onSubmit}>
        <ChangePasswordForm />
      </ZodFormProvider>
    </div>
  );
}
