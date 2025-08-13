import PropTypes from 'prop-types';

function ImageSection({ imageSrc, altText = 'Login' }) {
  return (
    <div className="w-full h-full">
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover lg:object-fill"
      />
    </div>
  );
}

ImageSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default ImageSection;
