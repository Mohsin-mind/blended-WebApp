import { useState } from 'react';
import PropTypes from 'prop-types';
import cn from '@/lib/clsx';

export default function ToggleSwitch({
  label,
  defaultChecked = false,
  onToggle,
  disabled = false,
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    if (typeof onToggle === 'function') {
      onToggle(newValue);
    }
  };

  return (
    <div className='flex items-center gap-3'>
      {label && <span className='text-sm text-gray-700'>{label}</span>}
      <button
        type='button'
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
          enabled ? 'bg-gold-gradient' : 'bg-gray',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}

ToggleSwitch.propTypes = {
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
};
