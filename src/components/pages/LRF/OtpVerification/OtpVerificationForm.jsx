import Button from '@/components/common/FormFields/Button';
import OtpInputField from './OtpInputField';
import { Fragment } from 'react';

function OtpVerificationForm() {
  return (
    <Fragment>
      <OtpInputField />
      <Button type='submit' title='Verify' />
    </Fragment>
  );
}

export default OtpVerificationForm;
