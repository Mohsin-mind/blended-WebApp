import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';
import logo from '@/assets/images/svg/BlendedED_Logo_blue.svg';
import ToggleTab from '@/components/common/Navigation/ToggleTab';
import GoogleButton from '@/components/common/FormFields/GoogleButton';

function LoginFormSection() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className='flex-1 w-full flex flex-col h-screen relative'>
      {/* Top Section - Logo (20% height) */}
      <div className='h-[20%] flex items-center justify-center bg-blended-white_2/30'>
        <div className='text-center'>
          <img src={logo} alt='BlendED' className='h-12 mx-auto' />
        </div>
      </div>

      {/* Tab Switcher - Absolutely positioned between sections */}
      <div className='absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg rounded-full'>
        <ToggleTab
          options={[
            { label: 'LOGIN', value: 'login' },
            { label: 'SIGNUP', value: 'signup' },
          ]}
          activeOption={activeTab}
          onOptionChange={setActiveTab}
          behavior='switch'
        />
      </div>

      {/* Bottom Section - Form (80% height) */}
      <div className='h-[80%] bg-blended-gray_6 flex justify-center px-6 pt-24'>
        <div className='w-full max-w-md flex flex-col h-full'>
          {/* Form Fields */}
          <div className='flex-1'>
            <InputField
              name='email'
              label='EMAIL'
              placeholder='Enter your email'
              isRequired
              className='mb-4'
            />

            <InputField
              name='password'
              label='PASSWORD'
              type='password'
              placeholder='Enter your password'
              isRequired
              className='mb-4'
            />

            {/* Forgot Password Link */}
            <div className='text-right'>
              <NavLink
                to='/forgot-password'
                className='text-blended-gray_5 text-base font-normal hover:text-blended-blue_3 transition-colors'
              >
                Forgot Password?
              </NavLink>
            </div>

            {/* Login Button */}
            <div className='pt-4'>
              <Button type='submit' title='Login' />
            </div>
            {/* Sign Up link */}
            <div className='flex justify-center mt-3'>
              <span className='text-blended-gray_5 text-base font-normal mr-1'>
                Don't have an Account?
              </span>
              <span
                className='text-blended-blue_7 text-base font-normal hover:text-blended-blue_3 transition-colors underline'
              >
                Sign Up
              </span>
            </div>

            {/* Or Continue With Divider */}
            <div className='flex items-center mt-6 mb-4'>
              <div className='flex-1 h-px bg-[#BDC2CC]'></div>
              <span className='px-4 text-blended-gray_5 text-sm font-normal'>Or Continue With</span>
              <div className='flex-1 h-px bg-[#BDC2CC]'></div>
            </div>

            {/* Google Login Button */}
            <GoogleButton />
          </div>

          {/* Footer Links - Now at the bottom */}
          <div className='text-center mt-auto pt-8 mb-6'>
            <div className='flex items-center justify-center space-x-4 text-blended-gray_1 text-sm'>
              <NavLink
                to='/terms'
                className='hover:text-blended-blue_3 transition-colors'
              >
                Terms & Conditions
              </NavLink>
              <span>|</span>
              <NavLink
                to='/privacy'
                className='hover:text-blended-blue_3 transition-colors'
              >
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormSection;
