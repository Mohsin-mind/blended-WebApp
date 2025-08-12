import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';

function ResetPasswordForm() {
  return (
    <div className='space-y-6'>
      <InputField
        name='password'
        label='Password'
        type='password'
        placeholder='Enter password'
        className='mb-2.5 relative'
      />
      <InputField
        name='confirm_password'
        label='Confirm Password'
        type='password'
        placeholder='Enter password'
        className='mb-2.5 relative'
      />
      <Button type='submit' title='Reset Password' />
    </div>
  );
}

export default ResetPasswordForm;
