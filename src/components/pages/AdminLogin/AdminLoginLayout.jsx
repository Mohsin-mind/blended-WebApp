import PropTypes from 'prop-types';
import LoginFormSection from './LoginFormSection.jsx';
import ImageSection from './ImageSection';
import adminLoginFrame from '@/assets/images/svg/admin_login_frame.svg';

function AdminLoginLayout({
  children,
  imageSrc = adminLoginFrame,
  altText = 'Admin Login',
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

AdminLoginLayout.propTypes = {
  children: PropTypes.node,
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  formComponent: PropTypes.elementType,
};

export default AdminLoginLayout;
