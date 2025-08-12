import InputField from '@/components/common/FormFields/InputField';
import CardLink from '../CardLink';
import Button from '@/components/common/FormFields/Button';
import { Fragment } from 'react';

function ForgotPasswordForm() {
  return (
    <Fragment>
      <InputField
        name='email'
        label='Email'
        placeholder='Enter email address'
        className='mb-4'
      />

      <CardLink to='/login' title='Back to Login' />

      <Button type='submit' title='Send' />
    </Fragment>
  );
}

export default ForgotPasswordForm;
