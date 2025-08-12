import PropTypes from 'prop-types';

function ImageSection({ imageSrc, altText = 'Login' }) {
  return (
    <img src={imageSrc} alt={altText} className='w-full h-full object-cover' />
  );
}

ImageSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default ImageSection;
