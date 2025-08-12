import PropTypes from 'prop-types';

function Card({ children }) {
  return (
    <div className='min-h-screen flex items-center justify-center relative z-10 px-4 bg-black/50'>
      <div className='w-full max-w-lg p-10 bg-black/40 backdrop-blur-md rounded-2xl border'>
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
