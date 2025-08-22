import ChangePasswordForm from '@/components/pages/LRF/ChangePassword/ChangePasswordForm';
import { ZodFormProvider } from '@/contexts/ZodFormContext';
import { changePasswordSchema } from '@/schemas/changePasswordSchema';
import { changePassword, logout } from '@/services/apiService';
import useSWRMutation from 'swr/mutation';
import { showToast } from '@/lib/toast';

export default function ChangePassword() {
  const { trigger } = useSWRMutation(
    '/change-password',
    async (key, { arg }) => {
      return await changePassword(JSON.stringify(arg));
    }
  );

  async function onSubmit(data) {
    try {
      const { meta } = await trigger({
        old_password: data.old_password,
        new_password: data.new_password,
      });

      if (meta?.code === 1) {
        showToast('success', meta?.message || 'Password changed successfully');
        logout();
      } else {
        showToast('error', meta?.message || 'Failed to change password');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        'Failed to change password';
      showToast('error', errorMessage);
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
