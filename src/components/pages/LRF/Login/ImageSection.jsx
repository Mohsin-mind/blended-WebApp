import PropTypes from 'prop-types';


function ChatBubble({ text }) {
  return (
    <div className='bg-blended-blue_8/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30 shadow-lg relative'>
      <p className='text-blended-gray_7 text-sm lg:text-base font-medium'>
        {text}
      </p>
      <div className='absolute bottom-0 left-4 w-0 h-0 border-r-[14px] border-t-[14px] border-l-0 border-l-transparent border-r-transparent border-t-blended-blue_8/20  transform translate-y-full'></div>
    </div>
  );
}
function ImageSection({ 
  imageSrc, 
  altText = 'Login',
  title = '',
  subtitle = '',
  titleClass = 'text-left',
  subtitleClass = 'text-left',
}) {
  return (
    <div className='w-full h-full relative'>
      <img
        src={imageSrc}
        alt={altText}
        className='w-full h-full object-cover lg:object-fill'
      />
      
      {/* Text Overlay */}
      <div className='absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40 p-8 lg:p-12'>
        <div className={`max-w-[29rem] mx-auto flex flex-col`}>
          <h1 className={`text-blended-blue_3 text-2xl lg:text-3xl font-semibold mb-4 ${titleClass}`}>
            {title}
          </h1>
          <p className={`text-white/90 text-sm lg:text-[13px] font-light ${subtitleClass}`}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Chat Bubbles */}
      <div className="absolute top-[45%] right-8 max-w-[215px] flex flex-col items-center justify-center space-y-6">
        {/* Hello Bubble */}
        <ChatBubble text="HELLO 👋🏻" />

        {/* Welcome to Blended Bubble */}
        <ChatBubble text="WELCOME TO BLENDED" />
      </div>
    </div>
  );
}

ImageSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  alignment: PropTypes.string,
};

export default ImageSection;
