import PropTypes from 'prop-types';

function CardContainer({ children }) {
  return <div className='w-full h-screen relative'>{children}</div>;
}

CardContainer.propTypes = {
  children: PropTypes.node,
};

export default CardContainer;
