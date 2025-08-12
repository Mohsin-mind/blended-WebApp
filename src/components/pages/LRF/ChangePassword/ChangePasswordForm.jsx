import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';

function ChangePasswordForm() {
  return (
    <div className='space-y-6'>
      <InputField
        name='old_password'
        label='Old Password'
        type='password'
        placeholder='Enter password'
        className='mb-2.5 relative'
      />
      <InputField
        name='new_password'
        label='New Password'
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
      <Button type='submit' title='Change Password' />
    </div>
  );
}

export default ChangePasswordForm;
