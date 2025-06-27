
import { UserRole } from '@/types/roles';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  role: UserRole;
}

export const Header = ({ role }: HeaderProps) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="text-sm text-gray-600">
              Welcome, {user.user_metadata?.first_name || user.email}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
