import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';
import LRFHeaderSection from '../Login/LRFHeaderSection';
import LRFFooterSection from '../Login/LRFFooterSection';

function ForgotPasswordForm() {
  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection />

      {/* Bottom Section - Form */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-8 lg:pt-12 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col justify-center'>
          {/* Form Fields */}
          <div className='flex-1'>
            <h2 className='text-2xl lg:text-3xl font-semibold text-blended-blue_7 mb-2 text-center'>
              Forgot your Password?
            </h2>
            <p className='text-blended-gray_8 text-sm text-center mb-6 lg:mb-10'>
              A code will be sent to your email to help reset your password
            </p>

            <InputField
              name='email'
              label='EMAIL'
              placeholder='Enter your email'
              isRequired
              className='mb-6'
            />

            {/* Send Code Button */}
            <div className='mb-6'>
              <Button type='submit' title='Send Code' />
            </div>
          </div>

          {/* Footer Links */}
          <LRFFooterSection />
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
