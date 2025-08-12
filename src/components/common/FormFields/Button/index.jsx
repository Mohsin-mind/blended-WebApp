import { useFormLoading } from '@/contexts/FormLoadingContext';
import PropTypes from 'prop-types';
import cn from '@/lib/clsx';
import { ButtonVariants } from './ButtonVariants';
import Loader from '../../Loader';

// eslint-disable-next-line complexity
function Button({
  type = 'button',
  title,
  icon,
  iconPosition = 'before',
  variant,
  size,
  className,
  isShowLoader = true,
  children,
  ...props
}) {
  const loading = useFormLoading();

  return (
    <button
      type={type}
      className={cn(ButtonVariants({ variant, size, className }), {
        'cursor-progress bg-opacity-80': loading,
        'cursor-pointer': !loading,
      })}
      disabled={loading}
      {...props}
    >
      <span className='relative w-fit flex items-center gap-1.5'>
        {loading && isShowLoader && (
          <span className='absolute -left-6 top-1/2 -translate-y-1/2'>
            <Loader />
          </span>
        )}

        {/* Icon before text */}
        {icon && iconPosition === 'before' && (
          <span className='flex justify-center items-center'>{icon}</span>
        )}

        {title || children}

        {/* Icon after text */}
        {icon && iconPosition === 'after' && <span>{icon}</span>}
      </span>
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  isShowLoader: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
