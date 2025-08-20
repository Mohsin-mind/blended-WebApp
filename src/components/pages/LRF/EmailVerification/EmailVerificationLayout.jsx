import PropTypes from 'prop-types';
import ImageSection from '../Login/ImageSection';

function EmailVerificationLayout({
  formComponent: FormComponent,
  formProps = {},
  imageSrc,
  altText,
}) {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Column - Form Content */}
      <div className='flex-1 w-full flex flex-col h-screen lg:h-screen relative bg-white'>
        <FormComponent {...formProps} />
      </div>

      {/* Right Column - Image */}
      <div className='flex-1 bg-blended-gray_4 h-64 lg:h-screen lg:w-auto'>
        <ImageSection
          imageSrc={imageSrc}
          altText={altText}
          title='Welcome Back, Dhruvin Dave'
          subtitle="Explore live courses led by MIT faculty. We'll guide you in selecting your ideal starting point—whether it's building foundations or diving into hands-on projects."
          titleClass='text-left'
          subtitleClass='text-left'
        />
      </div>
    </div>
  );
}

EmailVerificationLayout.propTypes = {
  formComponent: PropTypes.elementType.isRequired,
  formProps: PropTypes.object,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default EmailVerificationLayout;
