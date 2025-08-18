import PropTypes from 'prop-types';
import ImageSection from './ImageSection.jsx';
import webappLoginFrame from '@/assets/images/svg/student_login_frame.png';

function WebAppLoginLayout({
  imageSrc = webappLoginFrame,
  altText = 'Login',
  formComponent: FormComponent,
  formProps = {},
  onFormChange,
  activeForm,
}) {
  // Define text content based on form type (only if activeForm is provided and no explicit title/subtitle)
  const getTextContent = () => {
    if (activeForm === 'signup') {
      return {
        title: 'Ready to Start?',
        subtitle: 'We offer the best Blended Learning experience to apply what you have learned.',
        titleClass: 'text-right',
        subtitleClass: 'text-right max-w-[19rem] self-end',
      };
    }
    // Default login text
    return {
      title: 'Welcome Back, Dhruvin Dave',
      subtitle: 'Explore live courses led by MIT faculty. We\'ll guide you in selecting your ideal starting point—whether it\'s building foundations or diving into hands-on projects.',
      titleClass: 'text-left',
      subtitleClass: 'text-left'
    };
  };

  // Use dynamic text only if activeForm is provided and no explicit title/subtitle props
  const textContent = activeForm ? getTextContent() : {
    title: '',
    subtitle: '',
    titleClass: '',
    subtitleClass: ''
  };

  const { title: finalTitle, subtitle: finalSubtitle, titleClass, subtitleClass } = textContent;

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
        <ImageSection 
          imageSrc={imageSrc} 
          altText={altText}
          title={finalTitle}
          subtitle={finalSubtitle}
          titleClass={titleClass}
          subtitleClass={subtitleClass}
        />
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
