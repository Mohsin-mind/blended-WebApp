import PropTypes from 'prop-types';
const SIZE = 20;
const COLOR = 'white';

const Loader = ({ size = SIZE, color = COLOR }) => {
  return (
    <svg
      className='mr-3 -ml-1 animate-spin motion-reduce:hidden'
      style={{
        height: `${size}px`,
        width: `${size}px`,
        color: color,
      }}
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Loader;
