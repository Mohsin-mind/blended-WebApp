import { useFormLoading } from '@/contexts/FormLoadingContext';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { classNames } from '@/utils/helper';

function Button({ type = 'button', title, className = '', ...props }) {
  const loading = useFormLoading();

  return (
    <button
      type={type}
      className={classNames(
        'w-full bg-blended-blue_7 text-white font-medium py-3 hover:bg-blended-blue_1 transition-colors',
        loading ? 'cursor-progress bg-opacity-80' : 'cursor-pointer',
        className
      )}
      disabled={loading}
      {...props}
    >
      <span className='relative w-fit text-white text-lg font-semibold'>
        {loading && (
          <span className='absolute -left-6 top-1/2 -translate-y-1/2'>
            <Loader />
          </span>
        )}
        {title}
      </span>
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
