import { useState } from 'react';
import bellIcon from '@/assets/images/svg/Bell.svg';
import SearchField from '@/components/common/FormFields/SearchField';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = value => {
    // eslint-disable-next-line no-console
    console.log('Searching for:', value);
    // Add search functionality here
  };

  return (
    <header className='h-16 bg-white px-6 flex justify-between items-center shadow-sm border-b border-blended-gray_7'>
      {/* Search Field */}
      <div className='flex-1 max-w-md'>
        <SearchField
          placeholder='Search...'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      {/* Right Side - Notification Bell */}
      <div className='flex items-center'>
        {/* Notification Bell */}
        <div className='relative'>
          <button className='w-10 h-10 bg-white border border-blended-gray_7 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors'>
            <img src={bellIcon} alt='Notifications' width={20} height={20} />
            {/* Static notification dot */}
            <div className='absolute top-1 -right-0 w-2 h-2 bg-blended-blue_3 rounded-full' />
          </button>
        </div>
      </div>
    </header>
  );
}
