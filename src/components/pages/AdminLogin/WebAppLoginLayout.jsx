import PropTypes from 'prop-types';
import LoginFormSection from './LoginFormSection.jsx';
import ImageSection from './ImageSection.jsx';
import webappLoginFrame from '@/assets/images/svg/user_login_image.svg';

function WebAppLoginLayout({
  imageSrc = webappLoginFrame,
  altText = 'Login',
  formComponent: FormComponent = LoginFormSection,
}) {
  return (
    <div className='min-h-screen flex'>
      {/* Left Column - Login Form */}
      <FormComponent />

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4'>
        <ImageSection imageSrc={imageSrc} altText={altText} />
      </div>
    </div>
  );
}

WebAppLoginLayout.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  formComponent: PropTypes.elementType,
};

export default WebAppLoginLayout;
