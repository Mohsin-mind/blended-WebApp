import cn from '@/lib/clsx';
import PropTypes from 'prop-types';

function CalendarChevron({ className, orientation, ...props }) {
  const rotationClasses = {
    left: 'rotate-90',
    right: '-rotate-90',
    down: '',
  };

  return (
    <span
      className={cn(
        'icon-arrow-down size-4',
        rotationClasses[orientation],
        className
      )}
      {...props}
    />
  );
}

CalendarChevron.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['left', 'right', 'down']),
};

export default CalendarChevron;
