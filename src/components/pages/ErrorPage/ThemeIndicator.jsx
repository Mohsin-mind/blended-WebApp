import PropTypes from 'prop-types';

function ThemeIndicator({ theme }) {
  return (
    <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
      Current theme: {theme}
    </p>
  );
}

ThemeIndicator.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ThemeIndicator;
