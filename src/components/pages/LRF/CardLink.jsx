import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardLink({ to, title }) {
  return (
    <div className='text-right mb-5'>
      <Link
        to={to}
        type='button'
        className='text-sm text-white underline font-poppins italic font-medium'
      >
        {title}
      </Link>
    </div>
  );
}

CardLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardLink;
