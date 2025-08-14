import { NavLink } from 'react-router-dom';

function LRFFooterSection() {
  return (
    <div className='text-center mt-auto pt-8 mb-6'>
      <div className='flex items-center justify-center space-x-4 text-blended-gray_1 text-sm'>
        <NavLink
          to='/terms'
          className='hover:text-blended-blue_3 transition-colors'
        >
          Terms & Conditions
        </NavLink>
        <span>|</span>
        <NavLink
          to='/privacy'
          className='hover:text-blended-blue_3 transition-colors'
        >
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
}

export default LRFFooterSection;
