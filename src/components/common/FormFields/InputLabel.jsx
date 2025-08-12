import { classNames } from '@/utils/helper';
import PropTypes from 'prop-types';

function InputLabel({
  htmlFor,
  label,
  show,
  required = false,
  className = '',
}) {
  if (show || !label) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        'block text-xs font-normal mb-2 text-blended-gray_5',
        className
      )}
    >
      {label}
      {required && <span className='ml-1'>*</span>}
    </label>
  );
}

InputLabel.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  show: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default InputLabel;
