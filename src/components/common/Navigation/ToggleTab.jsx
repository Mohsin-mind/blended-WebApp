import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from '@/lib/clsx';

const ToggleTab = ({
  options = [],
  activeOption,
  onOptionChange,
  className = '',
  behavior = 'switch', // "switch" or "redirect"
  navLinkProps = {},
}) => {
  const [activeTab, setActiveTab] = useState(activeOption || options[0]?.value);

  const handleTabClick = optionValue => {
    setActiveTab(optionValue);
    if (onOptionChange) {
      onOptionChange(optionValue);
    }
  };

  const renderTabContent = option => {
    const isActive = activeTab === option.value;
    const isSingleTab = options.length === 1;

    if (isSingleTab) {
      return (
        <span className='px-8 py-3 text-[#050B17] text-xs font-normal'>
          {option.label}
        </span>
      );
    }

    if (behavior === 'redirect' && option.to) {
      return (
        <NavLink
          to={option.to}
          className={({ isActive: navIsActive }) =>
            clsx(
              'px-16 py-3 font-medium rounded-full transition-all duration-300',
              'text-blended-blue_6 text-sm font-normal',
              (isActive || navIsActive) && 'bg-blended-blue_5 shadow-sm',
              !(isActive || navIsActive) && 'hover:text-blended-blue_3'
            )
          }
          {...navLinkProps}
        >
          {option.label}
        </NavLink>
      );
    }

    return (
      <button
        type='button'
        onClick={() => handleTabClick(option.value)}
        className={clsx(
          'px-16 py-3 font-medium rounded-full transition-all duration-300',
          'text-blended-blue_6 text-sm font-normal',
          isActive && 'bg-blended-blue_5 shadow-sm',
          !isActive && 'hover:text-blended-blue_3'
        )}
      >
        {option.label}
      </button>
    );
  };

  return (
    <div
      className={clsx(
        'inline-flex bg-white rounded-full shadow-sm',
        options.length === 1 ? 'px-8 py-2' : 'p-2',
        className
      )}
    >
      {options.map((option, index) => (
        <div key={option.value || index}>{renderTabContent(option)}</div>
      ))}
    </div>
  );
};

export default ToggleTab;
