import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EyeButton = ({ to }) => {
  const ButtonContent = (
    <div className='h-10 w-10 flex items-center justify-center rounded-full bg-grayLight text-black border border-black/10'>
      <i className='icon-eye text-20' />
    </div>
  );

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent;
};

EyeButton.propTypes = {
  to: PropTypes.string,
};

export default EyeButton;
