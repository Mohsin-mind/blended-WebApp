import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import InputField from '@/components/common/FormFields/InputField';
import Button from '@/components/common/FormFields/Button';
import ToggleTab from '@/components/common/Navigation/ToggleTab';
import GoogleButton from '@/components/common/FormFields/GoogleButton';
import ROLE from '@/utils/constant/role';
import LRFHeaderSection from './LRFHeaderSection';

function LoginFormSection({ 
  toggleOptions = [
    { label: 'LOGIN', value: 'login' },
    { label: 'SIGNUP', value: 'signup' },
  ],
  signupText = 'Sign Up',
  role = ROLE[0].value, // Default to student (value: '1')
  onFormChange,
  activeForm,
}) {
  const [activeTab, setActiveTab] = useState(activeForm || 'login');

  // Sync with parent state
  useEffect(() => {
    console.log('Parent form changed:', activeForm, 'Current tab:', activeTab);
    if (activeForm && activeForm !== activeTab) {
      setActiveTab(activeForm);
    }
  }, [activeForm]);

  const handleTabChange = (newTab) => {
    console.log('Tab change requested:', newTab, 'Current tab:', activeTab);
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      if (onFormChange) {
        onFormChange(newTab);
      }
    }
  };

  const renderLoginForm = () => (
    <>
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
        autoComplete='on'
      />

      {/* Forgot Password Link */}
      <div className='text-right'>
        <NavLink
          to='/forgot-password'
          state={{ role }}
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
        <button
          type='button'
          onClick={() => handleTabChange('signup')}
          className='text-blended-blue_7 text-base font-normal hover:text-blended-blue_3 transition-colors underline'
        >
          {signupText}
        </button>
      </div>
    </>
  );

  const renderSignupForm = () => (
    <>
      <InputField
        name='firstName'
        label='FIRST NAME'
        placeholder='Enter your first name'
        isRequired
        className='mb-4'
      />

      <InputField
        name='lastName'
        label='LAST NAME'
        placeholder='Enter your last name'
        isRequired
        className='mb-4'
      />

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

      {/* Sign Up Button */}
      <div className='pt-4'>
        <Button type='submit' title='Sign Up' />
      </div>
      
      {/* Login link */}
      <div className='flex justify-center mt-3'>
        <span className='text-blended-gray_5 text-base font-normal mr-1'>
          Already have an Account?
        </span>
        <button
          type='button'
          onClick={() => handleTabChange('login')}
          className='text-blended-blue_7 text-base font-normal hover:text-blended-blue_3 transition-colors underline'
        >
          Login
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Top Section - Logo */}
      <LRFHeaderSection/>

      {/* Tab Switcher - Absolutely positioned between sections */}
      <div className='absolute top-[20%] lg:top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg rounded-full'>
        <ToggleTab
          options={toggleOptions}
          activeOption={activeTab}
          onOptionChange={handleTabChange}
          behavior='switch'
        />
      </div>

      {/* Bottom Section - Form */}
      <div className='flex-1 bg-blended-gray_6 flex justify-center px-6 pt-16 lg:pt-20 pb-6 lg:pb-12'>
        <div className='w-full max-w-md flex flex-col justify-center'>
          {/* Form Fields */}
          <div className='flex-1'>
            {activeTab === 'login' ? renderLoginForm() : renderSignupForm()}
          </div>

          {/* Footer Links - Now at the bottom */}
          <div className='text-center mt-6 lg:mt-8'>
            {/* Or Continue With Divider - Only for students */}
            {role === ROLE[0].value && (
              <>
                <div className='flex items-center mt-6 mb-4'>
                  <div className='flex-1 h-px bg-[#BDC2CC]'></div>
                  <span className='px-4 text-blended-gray_5 text-sm font-normal'>
                    {activeTab === 'login' ? 'Or Continue With' : 'Or Continue With'}
                  </span>
                  <div className='flex-1 h-px bg-[#BDC2CC]'></div>
                </div>

                {/* Google Button */}
                <GoogleButton mode={activeTab} />
              </>
            )}
            <div className='flex items-center justify-center space-x-4 text-blended-gray_1 text-sm mt-4'>
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
    </>
  );
}

LoginFormSection.propTypes = {
  toggleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  signupText: PropTypes.string,
  signupLink: PropTypes.string,
  role: PropTypes.oneOf([ROLE[0].value, ROLE[1].value]),
  onFormChange: PropTypes.func,
  activeForm: PropTypes.string,
};

export default LoginFormSection;
