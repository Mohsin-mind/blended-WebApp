import { Fragment } from 'react';
import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';
import CardLink from '../CardLink';

function LoginForm() {
  return (
    <Fragment>
      <InputField
        name='email'
        label='Email'
        placeholder='Enter email address'
        className='mb-4'
      />

      <InputField
        name='password'
        label='Password'
        type='password'
        placeholder='Enter password'
        className='mb-2.5 relative'
      />

      <CardLink to='/forgot-password' title='Forgot Password?' />

      <Button type='submit' title='Login' />
    </Fragment>
  );
}

export default LoginForm;
