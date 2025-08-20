import PRIVATE_ROUTE_CONFIG from '@/routes/PrivateRouteConfig';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/svg/BlendedED_Logo.svg';
import toggleIcon from '@/assets/images/svg/toggle_sidebar.svg';
import logoutIcon from '@/assets/images/svg/login.svg';
import { getCookie } from '@/utils/helper';
import { logout } from '@/services/authService';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  // Get user data from cookies
  const studentDetail = getCookie('student_detail');
  const teacherDetail = getCookie('teacher_detail');

  let userData = null;
  let userInitials = 'U';
  let userName = 'User';
  let userEmail = 'user@example.com';
  let userRole = null;

  if (studentDetail) {
    try {
      userData = JSON.parse(studentDetail);
      if (userData.user) {
        const { firstName, lastName, email, role } = userData.user;
        userInitials =
          `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() ||
          'S';
        userName = `${firstName || ''} ${lastName || ''}`.trim() || 'Student';
        userEmail = email || 'student@example.com';
        userRole = role;
      }
    } catch (error) {
      console.error('Error parsing student detail:', error);
    }
  } else if (teacherDetail) {
    try {
      userData = JSON.parse(teacherDetail);
      if (userData.user) {
        const { firstName, lastName, email, role } = userData.user;
        userInitials =
          `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() ||
          'T';
        userName = `${firstName || ''} ${lastName || ''}`.trim() || 'Teacher';
        userEmail = email || 'teacher@example.com';
        userRole = role;
      }
    } catch (error) {
      console.error('Error parsing teacher detail:', error);
    }
  }

  // Extract routes that should appear in sidebar based on user role
  const SIDE_BAR_ROUTE = PRIVATE_ROUTE_CONFIG[0].children[0].children
    .filter(f => f.isMainLayout)
    .filter(route => {
      if (userRole === 'STUDENT') {
        return (
          route.path.startsWith('/student/') || route.path === '/dashboard'
        );
      } else if (userRole === 'TEACHER') {
        return (
          route.path.startsWith('/teacher/') || route.path === '/dashboard'
        );
      }
      return true; // Show all routes if role is not determined
    });

  // Group routes by section based on user role
  const getMenuItems = () => {
    if (userRole === 'STUDENT') {
      return [
        {
          section: 'Learning Hub',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'Learning Hub'
          ),
        },
        {
          section: 'My Progress',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'My Progress'
          ),
        },
        {
          section: 'Collaboration & Support',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'Collaboration & Support'
          ),
        },
        {
          section: 'System Preferences',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'System Preferences'
          ),
        },
      ];
    } else if (userRole === 'TEACHER') {
      return [
        {
          section: 'Main Menu',
          items: SIDE_BAR_ROUTE.filter(route => route.section === 'Main Menu'),
        },
        {
          section: 'Communication',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'Communication'
          ),
        },
        {
          section: 'Settings & Support',
          items: SIDE_BAR_ROUTE.filter(
            route => route.section === 'Settings & Support'
          ),
        },
      ];
    }

    // Fallback for unknown role
    return [
      {
        section: 'Main Menu',
        items: SIDE_BAR_ROUTE.filter(route => route.section === 'Main Menu'),
      },
      {
        section: 'Communication',
        items: SIDE_BAR_ROUTE.filter(
          route => route.section === 'Communication'
        ),
      },
      {
        section: 'Settings & Support',
        items: SIDE_BAR_ROUTE.filter(
          route => route.section === 'Settings & Support'
        ),
      },
    ];
  };

  const menuItems = getMenuItems();

  const linkClassName = ({ isActive }) =>
    `block p-3 rounded transition-colors flex justify-start items-center gap-3 text-base ${
      isActive
        ? 'text-blended-blue_3 font-medium'
        : 'text-blended-gray_1 font-normal hover:bg-white/10'
    }`;

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className='bg-gradient-to-r from-blended-blue_1 to-blended-blue_2 h-screen transition-all duration-300 flex flex-col w-full'>
      <div
        className={`h-16 flex items-center border-b border-white/20 flex-shrink-0 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-6'}`}
      >
        <img
          src={logo}
          alt='Blended-logo'
          width={100}
          height={10}
          className={isCollapsed ? 'hidden' : 'block'}
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0'
        >
          <img src={toggleIcon} alt='Toggle sidebar' width={35} height={35} />
        </button>
      </div>
      <nav className='overflow-y-auto flex-1'>
        {menuItems.map((section, sectionIndex) => (
          <div key={`section-${section.section}`} className='mb-6'>
            {sectionIndex > 0 && (
              <div
                className={`border-t border-white/20 mb-6 ${isCollapsed ? 'hidden' : 'block'}`}
              />
            )}
            {sectionIndex === 0 && (
              <div className={`mb-6 ${isCollapsed ? 'hidden' : 'block'}`} />
            )}
            <div>
              <h3
                className={`text-blended-blue_4 text-xs font-normal mb-3 px-4 ${isCollapsed ? 'hidden' : 'block'}`}
              >
                {section.section}
              </h3>
              <ul className='space-y-1'>
                {section.items.map(item => (
                  <li key={`${section?.section}-${item?.path}`}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative ${linkClassName({ isActive })} ${isCollapsed ? 'justify-center' : 'px-4'} ${
                          isActive
                            ? 'after:content-[""] after:absolute after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:w-2 after:h-10 after:bg-blended-blue_3 after:rounded-l-full'
                            : ''
                        }`
                      }
                    >
                      {/* Active indicator - currently disabled */}
                      {/* <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-blended-blue_3 rounded-l-full' /> */}
                      <div className='w-8 h-8 rounded flex items-center justify-center flex-shrink-0'>
                        <img
                          src={item.icon}
                          alt={item.title}
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className={isCollapsed ? 'hidden' : 'block'}>
                        {item.title}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile and Logout Section - Fixed at bottom */}
      <div
        className={`p-4 border-t border-white/20 flex-shrink-0 ${isCollapsed ? 'hidden' : 'block'}`}
      >
        <div className='flex items-center gap-3 p-3'>
          <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>
              {userInitials}
            </span>
          </div>
          <div className='flex-1'>
            <p className='text-blended-white_1 text-sm font-normal'>
              {userName}
            </p>
            <p className='text-blended-gray_1 text-sm font-normal'>
              {userEmail}
            </p>
          </div>
        </div>
        <button
          className='w-full p-3 rounded transition-colors flex justify-start items-center gap-3 text-blended-gray_1 font-normal hover:bg-white/10'
          onClick={handleLogout}
        >
          <img
            src={logoutIcon}
            alt='Logout'
            width={20}
            height={20}
            className='flex-shrink-0'
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
