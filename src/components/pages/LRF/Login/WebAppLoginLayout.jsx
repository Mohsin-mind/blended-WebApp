import PropTypes from 'prop-types';
import ImageSection from './ImageSection.jsx';
import webappLoginFrame from '@/assets/images/svg/user_login_image.png';

function WebAppLoginLayout({
  imageSrc = webappLoginFrame,
  altText = 'Login',
  formComponent: FormComponent,
  formProps = {},
  onFormChange,
  activeForm,
}) {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Column - Login Form */}
      <div className='flex-1 w-full flex flex-col h-screen lg:h-screen relative'>
        <FormComponent
          {...formProps}
          onFormChange={onFormChange}
          activeForm={activeForm}
        />
      </div>

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4 h-64 lg:h-screen lg:w-auto'>
        <ImageSection imageSrc={imageSrc} altText={altText} />
      </div>
    </div>
  );
}

WebAppLoginLayout.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  formComponent: PropTypes.elementType.isRequired,
  formProps: PropTypes.object,
  onFormChange: PropTypes.func,
  activeForm: PropTypes.string,
};

export default WebAppLoginLayout;
