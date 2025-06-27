import { UserRole } from '@/types/roles';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, BarChart3, Settings, User, Briefcase } from 'lucide-react';

const navigation = {
  admin: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
  investor: [
    { name: 'Dashboard', href: '/investor/dashboard', icon: Home },
    { name: 'Portfolio', href: '/investor/portfolio', icon: Briefcase },
    { name: 'Analytics', href: '/investor/analytics', icon: BarChart3 },
  ],
  player: [
    { name: 'Dashboard', href: '/player/dashboard', icon: Home },
    { name: 'Profile', href: '/player/profile', icon: User },
    { name: 'Performance', href: '/player/performance', icon: BarChart3 },
  ],
  partner: [
    { name: 'Dashboard', href: '/partner/dashboard', icon: Home },
    { name: 'Opportunities', href: '/partner/opportunities', icon: Briefcase },
    { name: 'Analytics', href: '/partner/analytics', icon: BarChart3 },
  ],
};

interface SidebarProps {
  role: UserRole;
}

export const Sidebar = ({ role }: SidebarProps) => {
  const navItems = navigation[role] || [];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">
              {role.charAt(0).toUpperCase() + role.slice(1)} Panel
            </h1>
          </div>
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )
                  }
                >
                  <item.icon
                    className={cn(
                      'mr-3 flex-shrink-0 h-6 w-6',
                      'text-gray-400 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
