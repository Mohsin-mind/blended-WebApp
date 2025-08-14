import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className='flex h-screen w-screen overflow-hidden bg-grayLight dark:bg-dark-grayLight font-sans text-black dark:text-dark-black'>
      {/* <Header /> */}
      {/* <div className='flex flex-1'> */}
      <aside
        className={`flex-shrink-0 bg-black text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-80'}`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </aside>
      <div className='flex flex-col flex-1 min-w-0'>
        {/* Header - fixed height */}
        <header className='h-16 flex-shrink-0 bg-gray-100 dark:bg-dark-gray z-50'>
          <Header />
        </header>

        {/* Content Area - scrollable */}
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>
      {/* </div> */}
    </div>
  );
}
